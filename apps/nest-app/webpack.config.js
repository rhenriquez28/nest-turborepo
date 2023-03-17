const nodeExternals = require('webpack-node-externals');

module.exports = function (options) {
  return {
    ...options,
    mode: "production",
    externals: [nodeExternals({allowlist: ["nest-lib"]})],
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            // `.swcrc` can be used to configure swc
            loader: "swc-loader",
          },
        },
      ],
    },
  };
};
