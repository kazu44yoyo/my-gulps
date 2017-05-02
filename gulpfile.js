const gulp = require('gulp');

// minify関係
const {phpMinify} = require('@cedx/gulp-php-minify');
const uglify = require('gulp-uglify');
const minifycss = require('gulp-minify-css');

// 引数を扱えるように
const minimist = require('minimist');

// zip,unzip関係
const zip = require('gulp-zip');
const unzip = require('gulp-unzip');


// 引数を配列に格納
const argv = minimist(process.argv.slice(2));


// 初期化
var inputDir = (argv['i'])?argv['i']:'input';
var outputDir = (argv['o'])?argv['o']:'output';

var zipFile = (argv['z'])?argv['z']:'';
var zipName = (argv['n'])?argv['n']:'archive.zip';


gulp.task('unzip', () => gulp.src(zipFile)
	.pipe(unzip())
	.pipe(gulp.dest(inputDir))
);

// 指定ディレクトリを圧縮する
gulp.task('zip', () => gulp.src(inputDir+"/**/*")
	.pipe(zip(zipName))
	.pipe(gulp.dest(outputDir))
);

gulp.task('minify:php', () => gulp.src(inputDir+'/**/*.php', {read: false})
	.pipe(phpMinify({mode:'safe'}))
	.pipe(gulp.dest(outputDir))
);

gulp.task('minify:js', () => gulp.src(inputDir+'/**/*.js')
	// .pipe(uglify({preserveComments: 'some'}))
	.pipe(uglify())
	.pipe(gulp.dest(outputDir))
);

gulp.task('minify:css', () => gulp.src(inputDir+'/**/*.css')
	.pipe(minifycss())
	.pipe(gulp.dest(outputDir))
);

gulp.task('default',['minify:php','minify:css','minify:js']);
