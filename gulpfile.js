const gulp = require( 'gulp' );
const nodeSass = require( 'node-sass' );
const gulpSass = require( 'gulp-sass' );
const sassGlob = require( 'gulp-sass-glob' );
const plumber = require( 'gulp-plumber' );
const prefix = require( 'gulp-autoprefixer' );
const webpack = require( 'webpack-stream' );
const rename = require( 'gulp-rename' );
const named = require( 'vinyl-named' );

const sass = gulpSass( nodeSass );

/**
 * Create styles file from sources/
 */
gulp.task( 'styles', ( done ) => {
	gulp.src( 'src/styles/*.scss' )
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
		.pipe( prefix() )
		.pipe( gulp.dest( 'assets/styles/' ) );

	done();
} );

/**
 * Create scripts file from sources.
 */
gulp.task( 'scripts', ( done ) => {
	gulp.src( 'src/scripts/*.js' )
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
		)
		.pipe( gulp.dest( 'assets/scripts/' ) );

	done();
} );

/**
 * Build static files
 */
gulp.task( 'build', gulp.parallel( 'styles', 'scripts' ) );
