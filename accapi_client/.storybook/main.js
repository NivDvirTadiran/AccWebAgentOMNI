module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    '@storybook/addon-essentials'
  ],
  framework: '@storybook/angular',
  core: {
    builder: "@storybook/builder-webpack5"
  },
  features: {
    interactionsDebugger: true,
  },
}
