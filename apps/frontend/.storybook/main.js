const { join, dirname } = require("path");

/**
 * 이 함수는 패키지의 절대 경로를 반환하는 데 사용됩니다.
 * Yarn PnP를 사용하거나 모노레포로 구성된 프로젝트에서 필요할 수 있습니다.
 */
function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}

module.exports = {
    stories: ["../src/stories/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        getAbsolutePath("@storybook/addon-onboarding"),
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@chromatic-com/storybook"),
        getAbsolutePath("@storybook/addon-interactions"),
    ],
    framework: {
        name: getAbsolutePath("@storybook/nextjs"),
        options: {},
    },
};