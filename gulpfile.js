const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = typescript.createProject('ts/tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');

// Gulp config options could clean this up

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
  return gulp
    .src('ts/**/*.ts') // could use the tsconfig options also
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))      // sourcemaps
    .pipe(gulp.dest('dist/app'));
});

// Watch for changes in TypeScript, HTML and CSS files.
gulp.task('watch', function () {
    gulp.watch(["ts/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    // If other "watching" needs to be done
    // gulp.watch(["src/**/*.html", "src/**/*.css"], ['resources']).on('change', function (e) {
    //     console.log('Resource file ' + e.path + ' has been changed. Updating.');
    // });
});

// If linting is needed
gulp.task('tslint', function() {
  return gulp.src('ts/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('build', ['compile']);
gulp.task('default', ['build']);