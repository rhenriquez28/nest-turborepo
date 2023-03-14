const webpack = require("webpack");

module.exports = function (options) {
  return {
    ...options,
    mode: "production",
    plugins: [
      new webpack.IgnorePlugin({
        checkResource(resource) {
          const lazyImports = [
            "@nestjs/microservices",
            "cache-manager",
            "class-validator",
            "class-transformer",
          ];
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource, {
              paths: [process.cwd()],
            });
          } catch (err) {
            console.log("error!!");
            return true;
          }
          return false;
        },
      }),
    ],
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
