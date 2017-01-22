import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';

gulp.task('babel', () => {
  gulp.src('./javascript/es6/*.es6.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(rename((path) => {
      path.basename = path.basename.replace(/.es6$/g, '');
    }))
    .pipe(gulp.dest('./javascript/'));
});

gulp.task('watch', () => {
  gulp.watch('./javascript/es6/*.es6.js', ['babel']);
});

gulp.task('default', ['babel', 'watch']);