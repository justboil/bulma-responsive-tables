const {series, src, dest} = require('gulp')
const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'))

/* Destination dir (demo or not)? */

function destDir ( isDemo ) {
  return isDemo ? './demo/css' : './css'
}


/* SCSS & CSS */

function processScssFn ( outputStyle, isDemo ) {
  const outName = outputStyle === 'compressed' ? 'main.min.css' : 'main.css'

  return src('bulma-responsive-tables.scss')
    .pipe(sass({outputStyle}).on('error', sass.logError))
    .pipe(rename(outName))
    .pipe(dest(destDir(isDemo)))
}

function processScssExpanded () {
  return processScssFn('expanded')
}

function processScssCompressed () {
  return processScssFn('compressed')
}

function processScssCompressedDemo () {
  return processScssFn('compressed', true)
}

/* Compile Bulma.min.css for demo */

function processBulmaSassFn ( isDemo ) {
  return src('node_modules/bulma/bulma.sass')
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(rename('bulma.min.css'))
    .pipe(dest(destDir(isDemo)))
}

function processBulmaSass () {
  return processBulmaSassFn()
}

function processBulmaSassDemo () {
  return processBulmaSassFn(true)
}

exports.default = series(
  processScssExpanded,
  processScssCompressed,
  processScssCompressedDemo,
  processBulmaSassDemo
)
