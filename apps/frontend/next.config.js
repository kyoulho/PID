/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true, // SWC를 사용한 빠른 빌드 및 압축
  basePath: process.env.NEXT_PUBLIC_BASE_PATH, // 기본 경로 설정
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH, // 자산 경로 설정
  images: {
    // 외부 이미지를 <Image> 컴포넌트에서 사용할 수 있다.
    domains: [
      "images.unsplash.com",
      "i.ibb.co",
      "scontent.fotp8-1.fna.fbcdn.net",
    ],
    // 이미지 최적화 설정
    unoptimized: true,
  },
  experimental: {},
};

module.exports = nextConfig;
