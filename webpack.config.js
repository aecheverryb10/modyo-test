// https://github.com/lkiarest/html-webpack-plugin-assets-fix/blob/master/README.md
const HtmlWebPackPlugin = require("html-webpack-plugin");
//const HtmlWebpackPathAssetsFix = require("html-webpack-plugin-assets-fix");
//const { BaseHrefWebpackPlugin } = require("base-href-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = [
  (env, options) => {
    return {
      entry: {
        main: "./src/index.js"
      },
      output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: options.mode === "development" ? "/" : './',
        filename: "js/[name].js"
      },
      devtool: options.mode === "development" ? "eval-source-map" : false,
      devServer: {
        contentBase: path.resolve(__dirname, "dist"), //dist
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader",
                options: { interpolate: true } //, minimize: true
              }
            ]
          },
          {
            test: /\.(scss|css)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                },
              },


              {
                loader: "css-loader"
              },
              {
                loader: "postcss-loader",
                options: {
                  autoprefixer: {
                    browsers: ["last 2 versions"]
                  },
                  plugins: () => [autoprefixer],
                }
              },
              {
                loader: "sass-loader"
              }
            ]
          },
          {
            test: /\.(woff|woff2|eot|ttf|svg|jpg|png|gif|mp3|mp4|m4a|m4v|ico|tiff|docx|pdf)$/,
            use: {
              loader: "file-loader?limit=100000000",
              options: {
                name: "img/[name].[ext]", //[path]

              }
            }
          }
        ]
      },
      optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
      },
      plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: "css/stylesheet.css", //[name].css
          chunkFilename: "stylesheet.css",
          publicPath: '../' //[id].css
        }),
        new HtmlWebPackPlugin({
          filename: "index.html",
          template: "./src/index.html",
          chunks: ["main"],
          favicon: "./src/img/favicon.ico",
        }),
      ],
      watchOptions: {
        //ignored: ['/node_modules/']
      } /* 
      externals: function (context, request, callback) {
        if (/xlsx|canvg|pdfmake/.test(request)) {
          return callback(null, "commonjs " + request);
        }
        callback();
      } */
    };
  }
]
