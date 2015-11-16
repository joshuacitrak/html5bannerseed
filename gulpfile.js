var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var imageop = require('gulp-image-optimization');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

gulp.task('images', function(cb) {    
	gulp.src(['_/components/img/**/*.png','i_/components/img/**/*.jpg','_/components/img/**/*.gif','_/components/img/**/*.jpeg'])
	.pipe(imageop({        optimizationLevel: 5,        progressive: true,        interlaced: true    }))
	.pipe(gulp.dest('img'))
	.on('end', cb)
	.on('error', cb);
});

gulp.task('compressjs', function() {  
	gulp.src('_/components/js/*.js')    
	.pipe(uglify({ mangle: false }))    
	.pipe(gulp.dest('js'));
});

gulp.task('compass', function() {  
	gulp.src('_/components/sass/*.scss')    
	.pipe(compass({      
		config_file: './config.rb',      
		css: 'css',      
		sass: '_/components/sass'    }))    
		.pipe(gulp.dest('css'));});

gulp.task('html', function() {
	  gulp.src('./*.html');
});

gulp.task('watch', function() {
	  gulp.watch('_/components/js/*.js', ['compressjs']);
	  gulp.watch('_/components/sass/*.scss', ['compass']);
	  gulp.watch('./*.html',['html']);
});


gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['images', 'compressjs', 'compass', 'html','webserver', 'watch']);