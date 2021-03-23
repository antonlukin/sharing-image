const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const sassGlob = require( 'gulp-sass-glob' );
const plumber = require( 'gulp-plumber' );
const prefix = require( 'gulp-autoprefixer' );
const webpack = require( 'webpack-stream' );
const rename = require( 'gulp-rename' );
const named = require( 'vinyl-named' );

/**
 * Create styles file from sources/
 */
gulp.task( 'styles', ( done ) => {
	const styles = gulp
		.src( 'src/styles/*.scss' )
		.pipe( plumber() )
		.pipe(
			sassGlob( {
				allowEmpty: true,
			} )
		)
		.pipe(
			sass( {
				errLogToConsole: true,
			} )
		)
		.pipe( prefix() );

	styles.pipe( gulp.dest( 'assets/styles/' ) );

	done();
} );

/**
 * Create scripts file from sources.
 */
gulp.task( 'scripts', ( done ) => {
	const scripts = gulp
		.src( 'src/scripts/*.js' )
		.pipe( plumber() )
		.pipe( named() )
		.pipe(
			webpack( {
				config: require( './webpack.config.js' ),
			} )
		)
		.pipe(
			rename( ( file ) => {
				file.basename = file.basename;
				file.extname = '.js';
			} )
		);

	scripts.pipe( gulp.dest( 'assets/scripts/' ) );

	done();
} );

/**
 * Watch soruces and update styles and scripts
 */
gulp.task( 'watch', () => {
	gulp.watch( './src/**/*', gulp.series( 'styles', 'scripts' ) );
} );

/**
 * Build static files
 */
gulp.task( 'build', gulp.series( 'styles', 'scripts' ) );

/**
 * Build static files and watch changes by default.
 */
gulp.task( 'default', gulp.series( 'styles', 'scripts', 'watch' ) );
