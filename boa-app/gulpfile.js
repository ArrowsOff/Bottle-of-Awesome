var gulp  = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sh    = require('shelljs');
var $     = require('gulp-load-plugins')({ camelize: true });

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'scripts']);

/* Styles
========================================================*/
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe($.sass({ errLogToConsole: true }))
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});


/* Scripts
========================================================*/
gulp.task('scripts-lint', function() {
	return gulp.src('./js/**/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['scripts-lint'], function() {
  return gulp.src('./js/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./www/js'));
});


/* Watch
========================================================*/
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch('./js/**/*.js', ['scripts'])
});


/* Other
========================================================*/
gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
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
