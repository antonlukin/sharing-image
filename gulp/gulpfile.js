var gulp      = require('gulp');
var sass      = require('gulp-sass');
var concat    = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify    = require('gulp-uglify');
var plumber   = require('gulp-plumber');


var path = {
	source: '../src/',
	assets: '../assets/'
}

gulp.task('scss', function() {
    gulp.src([path.source + 'scss/app.scss'])
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(concat('social-image.css'))
        .pipe(minifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(path.assets))
})

gulp.task('js', function() {
    gulp.src([path.source + 'js/app.js'])
        .pipe(plumber())
		.pipe(uglify())
        .pipe(concat('social-image.js'))
        .pipe(gulp.dest(path.assets))
})

gulp.task('watch', function() {
    gulp.watch(path.source + '/**/*', ['scss', 'js']);
})

gulp.task('default', ['js', 'scss', 'watch']);
