var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    vars = require('gulp-vars'),
    cssnano = require('gulp-cssnano'),
    jade = require('gulp-jade'),
    concatJS = require('gulp-concat'),
    jsmin = require('gulp-jsmin'),
    ts = require('gulp-typescript'),
    babel = require('gulp-babel');




// JADE COMPILE TO HTML
gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  return gulp.src('sources/jade/**/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty : true
    }))
    .pipe(gulp.dest('./app/'))
});




// CSS PLUGINS
gulp.task('css', function() {
  
  return gulp.src('sources/css/**/*.css')
    .pipe(vars())
    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    .pipe(concatCss("style.min.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(cssnano())
    .pipe(gulp.dest('app/css/'));
  
});




//TS
gulp.task('typeScript', function() {
  return gulp.src('sources/js/**/*.ts')
    .pipe(ts({
              noImplicitAny: true,
              out: 'compiledTS.js'
          }))
    .pipe(gulp.dest('sources/js/ts'));
})



//JS
gulp.task('scripts', function() {
  return gulp.src('sources/js/**/*.js')
    .pipe(babel({
			presets: ['es2015']
		}))
    .pipe(jsmin())
    .pipe(concatJS('main.min.js'))
    .pipe(gulp.dest('./app/js'));
});




// WATCHING
gulp.task('watch', function() {
  
  gulp.watch('sources/css/**/*.css', ['css'])
  gulp.watch('sources/jade/**/*.jade', ['templates'])
  gulp.watch('sources/js/**/*.ts', ['typeScript'])
  gulp.watch('sources/js/**/*.js', ['scripts'])
  
});




// RUN TASKS
gulp.task('default', ['templates','css','typeScript','scripts','watch']);