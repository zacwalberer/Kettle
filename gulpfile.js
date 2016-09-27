// Include Gulp
var gulp = require('gulp'),

// Include Plugins
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    gulpIf = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref');

//  Styles
gulp.task('styles', function () {
  return sass('src/styles/base.scss')
    .pipe(sass({ outputStyle:'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('build/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('build/styles'));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/images'));
});

// Copying fonts

// Clean
gulp.task('clean', function() {
  return del(['build/styles', 'build/scripts', 'build/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/styles/**/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch('src/scripts/**/*.js', ['scripts']).on('change', browserSync.reload);
  gulp.watch('src/images/**/*', ['images']).on('change', browserSync.reload);
  gulp.watch(['build/**']).on('change', browserSync.reload);
});
