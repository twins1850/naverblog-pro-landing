#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * 이미지 최적화 스크립트
 * - PNG/JPG 파일을 WebP로 변환
 * - 압축률 80% 적용
 * - LCP (Largest Contentful Paint) 개선 목표
 */

const CONFIG = {
  inputDir: './public',
  outputDir: './public/optimized',
  quality: 80,
  extensions: ['.jpg', '.jpeg', '.png'],
  skipPatterns: ['node_modules', 'optimized', 'favicon', 'icon-', 'apple-touch']
};

// 출력 디렉토리 생성
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

/**
 * 파일이 최적화 대상인지 확인
 */
function shouldOptimize(filePath) {
  const filename = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  
  // 확장자 체크
  if (!CONFIG.extensions.includes(ext)) {
    return false;
  }
  
  // 스킵 패턴 체크
  return !CONFIG.skipPatterns.some(pattern => 
    filePath.includes(pattern) || filename.includes(pattern)
  );
}

/**
 * 이미지 파일 재귀 검색
 */
function findImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findImageFiles(filePath, fileList);
    } else if (shouldOptimize(filePath)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * 이미지를 WebP로 변환 및 최적화
 */
async function optimizeImage(inputPath) {
  try {
    const filename = path.basename(inputPath, path.extname(inputPath));
    const outputPath = path.join(CONFIG.outputDir, `${filename}.webp`);
    
    // 원본 파일 크기
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;
    
    // WebP 변환
    await sharp(inputPath)
      .webp({ quality: CONFIG.quality })
      .toFile(outputPath);
    
    // 변환된 파일 크기
    const optimizedStats = fs.statSync(outputPath);
    const optimizedSize = optimizedStats.size;
    
    // 압축률 계산
    const compressionRatio = Math.round((1 - optimizedSize / originalSize) * 100);
    
    console.log(`✅ ${inputPath}`);
    console.log(`   📦 ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${compressionRatio}% 압축)`);
    
    return {
      originalPath: inputPath,
      optimizedPath: outputPath,
      originalSize,
      optimizedSize,
      compressionRatio
    };
  } catch (error) {
    console.error(`❌ 최적화 실패: ${inputPath}`);
    console.error(`   오류: ${error.message}`);
    return null;
  }
}

/**
 * 파일 크기를 읽기 쉬운 형태로 변환
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('🚀 이미지 최적화 시작\n');
  
  // 이미지 파일 검색
  const imageFiles = findImageFiles(CONFIG.inputDir);
  
  if (imageFiles.length === 0) {
    console.log('최적화할 이미지 파일이 없습니다.');
    return;
  }
  
  console.log(`📸 ${imageFiles.length}개 이미지 파일 발견\n`);
  
  // 이미지 최적화 실행
  const results = [];
  for (const filePath of imageFiles) {
    const result = await optimizeImage(filePath);
    if (result) {
      results.push(result);
    }
    console.log(''); // 빈 줄 추가
  }
  
  // 최적화 결과 요약
  if (results.length > 0) {
    const totalOriginalSize = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalOptimizedSize = results.reduce((sum, r) => sum + r.optimizedSize, 0);
    const totalCompressionRatio = Math.round((1 - totalOptimizedSize / totalOriginalSize) * 100);
    
    console.log('📊 최적화 완료 요약');
    console.log('═'.repeat(50));
    console.log(`✅ 성공: ${results.length}개 파일`);
    console.log(`📦 총 용량: ${formatBytes(totalOriginalSize)} → ${formatBytes(totalOptimizedSize)}`);
    console.log(`🗜️ 총 압축률: ${totalCompressionRatio}%`);
    console.log(`🎯 LCP 개선 예상: 200-500ms 단축`);
    console.log('\n📁 최적화된 파일 위치: ./public/optimized/');
  }
}

// 스크립트 실행
if (require.main === module) {
  main().catch(console.error);
}