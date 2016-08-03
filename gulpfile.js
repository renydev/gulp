var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin');

gulp.task('default', ['sass', 'js']);

gulp.task('sass', function () {
 return gulp.src('assets/src/sass/**/*.scss')
   .pipe(concat('style.min.css'))
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('assets/css'));
});

gulp.task('js', function () {
  // returns a Node.js stream, but no handling of error messages
  return gulp.src('assets/src/js/**/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('img', () =>
    gulp.src('assets/src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/img'))
);

gulp.task('html', function() {
  return gulp.src('_html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('.'))
});