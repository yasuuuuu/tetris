var gulp  = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

gulp.task('babel', function () {
  gulp.src('./es6/*.es6.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(rename(function (path) {
      var cutLength = path.basename.length - 4;
      path.basename = path.basename.slice(0, cutLength);
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch('./es6/*.es6.js', ['babel'])
});

gulp.task('default', ['babel', 'watch']);
