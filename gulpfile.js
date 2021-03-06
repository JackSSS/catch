var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var sh = require('shelljs');
var webpack = require('webpack-stream');
var webpackEnv = require('webpack-env');

var paths = {
  sass: ['./scss/**/*.scss'],
  html: ['./www/**/*.html'],
  js: ['./www/js/**/*.js', './models/**/*.js'],
  testFrontend: ['./test/**/test_bundle.js'],
  testBackend: ['./test/test_routes.js', './test/contacts_routes_test.js']
};

gulp.task('build', function() {
  return gulp.src('www/js/app.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      plugins: [webpackEnv]
    }))
    .pipe(gulp.dest('./www/js/'));
});

gulp.task('build:test', function() {
  return gulp.src('test/test_entry.js').pipe(webpack({
    output: {
      filename: 'test_bundle.js'
    }
  })).pipe(gulp.dest('test/'));
});

gulp.task('test:mocha', function() {
  return gulp.src(paths.testBackend, {read: false})
    .pipe(mocha({reporter: 'nyan'}))
    // .once('error', function() {
    //   process.exit(1);
    // })
    .once('end', function() {
      process.exit();
    });
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

// TODO: Add html packing task
//
// gulp.task('watch:html', function() {
//   gulp.watch(paths.html, [''])
// });

gulp.task('watch:js', function() {
  gulp.watch(paths.js, ['build']);
});

gulp.task('watch:sass', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('test:jshint', function() {
  return gulp.src(paths.js)
    .pipe(jshint({
      node: true,
      globals: {
        describe: true,
        it: true,
        before: true,
        after: true
      }
    }))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('default', ['install', 'build', 'sass']);
gulp.task('test:all', ['build', 'build:test', 'test:jshint', 'test:mocha']);
gulp.task('test:back', ['build', 'test:jshint', 'test:mocha']);
gulp.task('test:front', ['build:test']);
gulp.task('watch:all', ['watch:sass', 'watch:js']);
gulp.task('watch', ['watch:all']);

// gulp.doneCallback = function(err) {
//   process.exit(err ? 1 : 0);
// };
