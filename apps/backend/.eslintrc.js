module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:nestjs/recommended"
    ],
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
        "nestjs",
        'boundaries'
    ],
    rules: {
        'boundaries/element-types': [2, {
          default: 'disallow',
          rules: [
            {
              from: '**/*',  // 모든 모듈에 대해 적용
              allow: ['**/index.ts'],  // 각 모듈의 index.ts 파일만 허용
            },
          ],
        }],
      },
    parserOptions: {
        ecmaVersion: 2020,
        project: './tsconfig.json',
        sourceType: "module",
    },
    env: {
        node: true,
        es6: true,
        jest: true
    },
    ignorePatterns: [".eslintrc.js", "jest.config.js"]  // 이 파일을 ESLint 검사 대상에서 제외
};