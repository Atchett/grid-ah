'use strict';

var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4'
  ];

  // Gulp task to minify CSS files
gulp.task('styles', function () {
    return gulp.src('./src/SASS/style.scss')
      // Compile SASS files
      .pipe(sass({
        outputStyle: 'nested',
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
      }))
      // Auto-prefix css styles for cross browser compatibility
      .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      // Minify the file
      .pipe(csso())
      // Output
      .pipe(gulp.dest('./dist/style'))
  });

  // Gulp task to minify JavaScript files
gulp.task('scripts', function() {
    return gulp.src('./src/script/**/*.js')
      // Minify the file
      .pipe(uglify())
      // Output
      .pipe(gulp.dest('./dist/script'))
  });

  // Gulp task to minify HTML files
gulp.task('pages', function() {
    return gulp.src('./src/**/*.html')
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
      .pipe(gulp.dest('./dist'));
  });

// Fonts
gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*.*')
      .pipe(gulp.dest('./dist/fonts/'));
});

// images
gulp.task('images', function(){
    return gulp.src('./src/images/**/*.*')
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/images/'));
})

// Clean output directory
gulp.task('clean', () => del(['dist']));

// Gulp task to minify all files
gulp.task('default', ['clean'], function () {
  runSequence(
    'styles',
    'scripts',
    'pages',
    'fonts',
    'images'
  );
});