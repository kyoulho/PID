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
                    from: 'Portfolio.entity/*',
                    allow: ['Portfolio.entity/index.ts'],
                },
            ],
        }],
    },
    parserOptions: {
        ecmaVersion: 2020,
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: "module"
    },
    env: {
        node: true,
        es6: true,
        jest: true
    },
    ignorePatterns: [".eslintrc.js"]  // 이 파일을 ESLint 검사 대상에서 제외
};