import { fileURLToPath } from 'url';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "module",
    chunkFormat: "module",
  },
  experiments: {
    outputModule: true,
  },
  target: "node18",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "esbuild-loader",
        options: {
          loader: "js",
          target: "es2020",
          minify: true, // Minificação com esbuild-loader
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            passes: 3,
          },
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    usedExports: true,
    sideEffects: false,
  },
};
