const gulp = require('gulp');
const {phpMinify} = require('@cedx/gulp-php-minify');
const uglify = require('gulp-uglify');
const minifycss = require('gulp-minify-css');

const inputDir = "input";
const outputDir = "output";

gulp.task('minify:php', () => gulp.src(inputDir+'/**/*.php', {read: false})
	.pipe(phpMinify({mode:'safe'}))
	.pipe(gulp.dest(outputDir))
);

gulp.task('minify:js', () => gulp.src(inputDir+'/**/*.js')
	.pipe(uglify({preserveComments: 'some'}))
	.pipe(gulp.dest(outputDir))
);

gulp.task('minify:css', () => gulp.src(inputDir+'/**/*.css')
	.pipe(minifycss())
	.pipe(gulp.dest(outputDir))
);

gulp.task('default',['minify:php','minify:css','minify:js']);
