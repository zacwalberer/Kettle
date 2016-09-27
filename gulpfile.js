// Include Gulp
var gulp = require('gulp');

// Include Plugins
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence');

// Task Clean
gulp.task('clean', function(){
  return gulp.src(build).pipe(clean());
});

// Task Lint


// Task Sass
gulp.task('sass', function () {
  return gulp.src('src/scss/base.scss')
    .pipe(sass({ outputStyle:'compressed' }).on('error', sass.logError))
    // .pipe(uncss({html: ['index.html']}))
    .pipe(autoprefixer({ browsers:['> 5% in US']}))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build'));
});


// Optimizing CSS and JavaScript


// Optimizing Images

/*var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');

gulp.task('images', function(){
    return gulp.src('./src/images/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
});*/

// Copying fonts


// Cleaning


// Build Sequences
