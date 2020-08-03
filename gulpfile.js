const {series, src, dest} = require('gulp')
const rename = require('gulp-rename')
const sass = require('gulp-sass')

sass.compiler = require('node-sass')

/* SCSS & CSS */

function processScss ( outputStyle ) {
  const outName = outputStyle === 'compressed' ? 'main.min.css' : 'main.css'

  return src('main.scss')
    .pipe(sass({outputStyle}).on('error', sass.logError))
    .pipe(rename(outName))
    .pipe(dest('./demo/css'))
}

function processScssExpanded () {
  return processScss('expanded')
}

function processScssCompressed () {
  return processScss('compressed')
}

/* Compile Bulma.min.css for demo */

function processBulmaSass () {
  return src('node_modules/bulma/bulma.sass')
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(rename('bulma.min.css'))
    .pipe(dest('./demo/css'))
}

exports.default = series(processScssExpanded, processScssCompressed, processBulmaSass)
