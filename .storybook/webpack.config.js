module.exports = async ({ config }) => {
  config.module.rules.unshift({
    test: /\.js?$/,
    exclude: /node_modules/,
    loaders: [require.resolve("@storybook/addon-storysource/loader")],
    enforce: "pre",
  });
  // config.module.rules.unshift({
  //   test: /\.(stories|story)\.mdx$/,
  //   use: [
  //     {
  //       loader: "babel-loader",
  //       // may or may not need this line depending on your app's setup
  //       options: {
  //         plugins: ["@babel/plugin-transform-react-jsx"],
  //       },
  //     },
  //     {
  //       loader: "@mdx-js/loader",
  //       options: {
  //         compilers: [createCompiler({})],
  //       },
  //     },
  //   ],
  // });

  return config;
};
