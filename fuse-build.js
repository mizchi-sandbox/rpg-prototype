/* eslint-disable */
const { FuseBox, BabelPlugin } = require("fuse-box")

const ctx = FuseBox.init({
  homeDir: "src/",
  sourcemaps: {
    bundleReference: "./public/sourcemaps.js.map",
    outFile: "./public/sourcemaps.js.map",
  },
  outFile: "./public/bundle.js",
  plugins: [
    BabelPlugin()
  ]
})

if (process.env.WATCH == 1) {
  ctx.devServer(">index.js")
} else {
  ctx.bundle(">index.js")
}
