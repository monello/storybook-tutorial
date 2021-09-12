module.exports = {
  // MRL: Tell StoryBook where to got look for stories
  stories: ['../src/components/**/*.stories.js'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ]
}