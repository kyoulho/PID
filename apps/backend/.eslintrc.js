module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:nestjs/recommended"
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "nestjs"],
    parserOptions: {
        project: 'tsconfig.json',
        ecmaVersion: 2020,
        tsconfigRootDir: __dirname,
        sourceType: "module"
    },
    env: {
        node: true,
        es6: true,
        jest: true, // 테스트 환경만 로컬에서 추가
    }
};