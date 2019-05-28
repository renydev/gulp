const { gulp,
	watch, 
	src, 
	dest, 
	series, 
	parallel } = require('gulp')
const sass         = require('gulp-sass')
const uglifycss    = require('gulp-uglifycss')
const pug          = require('gulp-pug')
const clear        = require('clear')
const postcss      = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const del          = require('del')
const ts = require('gulp-typescript');
const browserSync  = require('browser-sync');
// folders
const origin = 'src/'
const output = 'dist/'
const server = browserSync.create();

function clean(cb) {
clear()
// del.sync([origin + 'dist'])
console.log('Clearing terminal.')
cb()
}


function html() {
// body omitted
console.log('Puggifying HTML')
return src(origin + 'html/*.pug')
	.pipe(pug())
	.pipe(dest(output))
}
function css(done) {
// body omitted
console.log('Sass Transpile')
return src(origin + 'styles/sass/**/*.sass')
.pipe(sass().on('error', sass.logError))
.pipe(postcss([
autoprefixer(
	{ 
		browsers: [
			'last 2 versions', 
			'> 2%',
			'firefox >= 4',
			'safari 7 ',
			'safari 8 ',
			'IE 8 ',
			'IE 9 ',
			'IE 10 ',
			'IE 11 ',
		] 
	}
)]))
.pipe(uglifycss({"maxLineLen": 80,"uglyComments": true}))
.pipe(dest(output + 'css'))

}
function typescript(done) {
// body omitted
console.log('jsTranspile')
return src(origin + 'scripts/typescript/**/*.ts')
	.pipe(ts({
		noImplicitAny: true
	}))
	.pipe(dest(output + 'scripts'));
done()
}

function publish(cb) {
// body omitted
console.log('publish')
cb()
}

function watch_files() {

// html changes
watch(origin + 'html/**/*', series(html, reload))

// css changes
watch(origin + 'styles/**/*', series(css, reload))

// js changes
watch(origin + 'scripts/**/*', series(typescript, reload))
}

function reload(done) {
server.reload();
done()
}

function browser_sync() {
server.init({
server: {
baseDir: output
}
})
}

exports.default = parallel(
clean,
parallel(watch_files, browser_sync), 	 
)

exports.clear = clean
exports.css = css
exports.html = html
exports.javascript = typescript
