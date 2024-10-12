/** @type {import('next').NextConfig} */

module.exports = {
  swcMinify: true, // SWC를 사용한 빠른 빌드 및 압축
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
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_SERVER_HOST}/api/:path*`,
      },
    ];
  },
  trailingSlash: false,
};
