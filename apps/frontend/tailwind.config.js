const lineClamp = require("@tailwindcss/line-clamp");
const daisyui = require("daisyui");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [lineClamp, daisyui],
  daisyui: {
    themes: ["light", "dark"], // 라이트 및 다크 모드 모두 지원
    darkTheme: "light", // 다크 모드를 설정할 수 있지만 기본은 라이트
  },
  darkMode: "class", // Tailwind 다크 모드를 class로 설정
};