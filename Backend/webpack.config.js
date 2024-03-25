const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/"),
      "url": require.resolve("url/"),
      "path": require.resolve("path-browserify"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "events": require.resolve("events/"),
      "fs": false,
      "crypto": require.resolve("crypto-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "querystring": require.resolve("querystring-es3"),
      "http": require.resolve("stream-http"),
      "net": require.resolve("node-libs-browser/mock/net"),
      "zlib": require.resolve("browserify-zlib"),
      "vm": require.resolve("vm-browserify")
    }
  }
};