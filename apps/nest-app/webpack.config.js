const webpack = require("webpack");

module.exports = function (options) {
  return {
    ...options,
    mode: "production",
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /(node_modules)/,
          use: {
            // `.swcrc` can be used to configure swc
            loader: "swc-loader",
          },
        },
      ],
    },
  };
};
