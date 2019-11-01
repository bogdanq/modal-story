module.exports = async ({ config }) => {
  config.module.rules.unshift({
    test: /\.js?$/,
    exclude: /node_modules/,
    loaders: [
      require.resolve("@storybook/addon-storysource/loader"),
      require.resolve("@storybook/source-loader"),
    ],
    enforce: "pre",
  });

  return config;
};
