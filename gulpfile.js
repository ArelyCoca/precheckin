"use strict";
var  gulp = require ('gulp'),
	 stylus = require ('gulp-stylus'),
	 autoprefixer = require ('gulp-autoprefixer'),
	 rename = require ('gulp-rename'),
	 replace = require('gulp-replace'),
     nib = require('nib'),
     rupture = require('rupture'),
	 minifycss = require('gulp-clean-css'),
	 mmq = require('gulp-merge-media-queries'),
	 ejs = require('gulp-ejs');;

gulp.task('styles', function () {
	return gulp
	.src('src/styles/estilos.styl')
		.pipe(stylus({
			paths:  ['node_modules'],
			use: [nib(), rupture()],
			'include css': true
		}))
		.pipe(autoprefixer({
              browsers: ['last 2 versions', 'ios 6'],
              cascade: false
          }))
      	.pipe(mmq({
        	log: false
      	}))
      	.pipe(replace("'fonts/Linearicons", "'../fonts/Linearicons/Linearicons"))
		.pipe(gulp.dest('public/css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss())
		.pipe(gulp.dest('public/css'));
});

// mover fuentes
gulp.task('movefonts', function () {
  return gulp
    .src([
    //   'node_modules/font-awesome-stylus/fonts/**/*.*',
      'node_modules/linearicons/dist/web-font/fonts/**/*.*',
      //'asset/css/ionicons/fonts/**/*.*',
    ])  
    .pipe(gulp.dest('public/fonts/Linearicons'));
});
//correr este para pasar el ejs a html
gulp.task('ejs', function(){
	return gulp.src('views/*.ejs')
	 .pipe(ejs({},{}, {ext:'.html'}))
	 .pipe(gulp.dest('public'))
});

gulp.task('watch', function () {
	gulp.watch('src/styles/**/*.styl*', ['styles']);
});

gulp.task('default', ['styles', 'movefonts', 'ejs', 'watch']);