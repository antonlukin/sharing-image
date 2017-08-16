var gulp      = require('gulp');
var sass      = require('gulp-sass');
var concat    = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify    = require('gulp-uglify');
var plumber   = require('gulp-plumber');
var prefix    = require('gulp-autoprefixer');


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
				.pipe(prefix({
					browsers: [
						'ie >= 10',
						'ie_mob >= 10',
						'ff >= 30',
						'chrome >= 34',
						'safari >= 7',
						'opera >= 23',
						'ios >= 7',
						'android >= 4.4',
						'bb >= 10'
					]
				}))
        .pipe(concat('social-image.css'))
        .pipe(minifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(path.assets))
})

gulp.task('js', function() {
    gulp.src([path.source + 'js/*.js'])
        .pipe(plumber())
		.pipe(uglify())
        .pipe(concat('social-image.js'))
        .pipe(gulp.dest(path.assets))
})

gulp.task('watch', function() {
    gulp.watch(path.source + '/**/*', ['scss', 'js']);
})

gulp.task('default', ['js', 'scss', 'watch']);
