import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';

const srcPath = './javascript/es6/*.es6.js';

gulp.task('babel', () => {
  gulp.src(srcPath)
    .pipe(plumber())
    .pipe(babel())
    .pipe(rename((path) => {
      path.basename = path.basename.replace(/.es6$/g, '');
    }))
    .pipe(gulp.dest('./javascript/'));
});

gulp.task('watch', () => {
  gulp.watch(srcPath, ['babel']);
});

gulp.task('default', ['babel', 'watch']);
