const {
  src,
  dest,
  watch,
  series,
} = require('gulp')
const rename = require("gulp-rename")
const { createGulpEsbuild } = require('gulp-esbuild')
const gulpEsbuild = createGulpEsbuild({ incremental: false, piping: true })
const sassPlugin = require('esbuild-plugin-sass')
const isProd = process.env.NODE_ENV === 'prod'
const connect = require('gulp-connect');

console.log(isProd)

const conf = {
  'assets_host': process.env.ASSETS_HOST,
  'env': 'dev'
}

function build(cb) {
  src(['./js/app.js', './css/app.scss', './images/**/*.(svg|png|gif|jpg)', './fonts/**/*.otf', './videos/**/*.(mp4|webm)'])
    .pipe(gulpEsbuild({
      entryPoints: ['js/app.js', 'css/app.scss'],
      bundle: true,
      platform: "node",
      outdir: '../dist/',
      color: true,
      plugins: [sassPlugin()],
      minify: isProd,
      sourcemap: !isProd,
      loader: {
        '.otf': 'dataurl',
        '.png': 'dataurl',
        '.mp4': 'dataurl',
        '.webm': 'dataurl',
      }
    }))
    .pipe(dest('../dist/'))
  cb()
}

function images(cb) {
  src(["./images/**/*"]).pipe(dest('../dist/images/'))
  cb()
}

function videos() {
  return src(["./videos/**/*"]).pipe(dest('../dist/videos/'))
}

function fonts(cb) {
  src(["./fonts/**/*"]).pipe(dest('../dist/fonts/'))
  cb()
}

function watchTask(cb) {
  connect.server({
    root: '../dist/',
    livereload: true,
    port: 8888,
  })

  watch('./js/**/*.js', build)
  watch('./css/**/*.scss', build)
  watch('./images/**/*', images)
  watch('./fonts/**/*.otf', fonts)
  watch('./videos/**/*', videos)

  cb()
}

exports.build = series(build, images, videos, fonts)
exports.watch = watchTask
