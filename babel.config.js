/** @type {import('@babel/core').TransformOptions['plugins']} */
const plugins = [
  /** react-native-reanimated web support @see https://docs.swmansion.com/react-native-reanimated/docs/guides/web-support/ */
  "@babel/plugin-transform-export-namespace-from",
  [
    "module-resolver",
    {
      root: ["./app", "./web"],
      extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
    },
  ],
]

/** @type {import('@babel/core').TransformOptions} */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {},
    },
    plugins,
  }
}
