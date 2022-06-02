// Initialize modules
const { src, dest, watch, series } = require('gulp');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const browserify = require('gulp-browserify');

// const destination='dist';

// //clean the folder
// async function clean (cb){
//     await del(destination);
//     cb();
// }
// Sass Task
function scssTask() {
	return src('app/scss/style.scss', { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(dest('dist', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask(cb) {
	src('app/js/script.js', { sourcemaps: true })
	.pipe(babel({ presets: ['@babel/preset-env'] }))
	.pipe(browserify({debug: true}))
		.pipe(terser())
		.pipe(dest('dist', { sourcemaps: '.' }));

	cb();
}

// Browsersync
function browserSyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: '.',
		},
		notify: {
			styles: {
				top: 'auto',
				bottom: '0',
			},
		},
	});
	cb();
}
function browserSyncReload(cb) {
	browsersync.reload();
	cb();
}

// Watch Task
function watchTask() {
	watch('*.html', browserSyncReload);
	watch(
		['app/scss/**/*.scss', 'app/**/*.js'],
		series(scssTask, jsTask, browserSyncReload)
	);
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
