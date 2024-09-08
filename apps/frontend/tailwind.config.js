const lineClamp = require("@tailwindcss/line-clamp");
const daisyui = require("daisyui");

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
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
    darkTheme: "dark", // 다크 모드를 기본값으로 설정
  },
  darkMode: "class", // Tailwind 다크 모드 설정
};
