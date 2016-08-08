var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');
    //gls = require('gulp-live-server');
    

gulp.task('default', ['sass', 'js', 'img', 'html', 'lint', 'watch']);

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

gulp.task('watch', function() {
    gulp.watch('assets/src/sass/**/*.scss', ['sass']);
    gulp.watch('assets/src/js/**/*.js', ['js']);
    gulp.watch('assets/src/img/*', ['img']);
    gulp.watch('_html/*.html', ['html']);
});

gulp.task('lint', function() {
  return gulp.src('assets/src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

//o browser sync não funcionou direito no CLOUD9, mas acho que dá pra usar via preview
gulp.task('browser-sync', function() {
    browserSync({
        // You can use wildcards in here.
        files: 'index.html, assets/css/style.min.css',
        // We can pick port 8081 or 8082, if you are more of a 2's kind of guy, go for the 8082. Highly recommended.
        port: 8082
    });
});

//gulp.task('serve', function(){
//    var server  =   gls.static('./', 8081);
//    server.start();
//});
