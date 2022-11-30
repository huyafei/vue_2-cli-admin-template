"use strict";
const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const defaultSettings = require("./src/settings.js");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || "vue-admin-template"; // page title
const publicPath = process.env.VUE_APP_PROJECT_BASE;

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath,
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  outputDir: "dist",
  assetsDir: "static",
  // eslint-loader是否在保存的时候检查
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    // open: true, // 配置自动启动浏览器
    port: 9527, // 端口
    // 代理
    // proxy: "http://localhost:9527" // 配置跨域处理,只有一个代理

    // 配置或多个代理
    // proxy: {
    //   "/api": {
    //     target: "http://example-development.com",// 设置调用的接口域名和端口号
    //     changeOrigin: true,

    //     ws: true, // 代理websocket
    //     pathRewrite: { // 路径重写
    //       "^/api": ""
    //     }
    //   }
    // }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        'path': require.resolve("path-browserify"),
        "@": resolve("src"),
        "@api": resolve("src/api"),
        "@assets": resolve("src/assets"),
        "@components": resolve("src/components"),
        "@router": resolve("src/router"),
        "@plugins": resolve("src/plugins"),
        "@utils": resolve("src/utils"),
        "@views": resolve("src/views"),
      },
      // fallback: {
      //   path: require.resolve("path-browserify"),
      // },
    },
  },
  chainWebpack(config) {
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  },
  css: {
    // loaderOptions: {
    //   // 给 sass-loader 传递选项
    //   sass: {
    //     // @/ 是 src/ 的别名
    //     data: `@import "@/assets/styles/colors.scss";`
    //   }
    // }
  },
});
