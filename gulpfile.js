var gulp = require('gulp'),
    del = require('del'),
    nodemon = require('gulp-nodemon'),
    runSequence = require('run-sequence'),
    shell = require('gulp-shell'),
    mocha = require('gulp-mocha'),
    tslint = require('gulp-tslint');

var targetPath = './built';

// Default task
gulp.task('default', function() {
  runSequence('develop');
});

// Task for development.
gulp.task('develop', function () {
  runSequence('build','start','watch');
});

// Build all
gulp.task('build', ['typescript', 'tslint'
 ] , function() {
});

// Start server and nodemon
gulp.task('start', function(callback) {
  var called = false;

  return nodemon({
    script: './built/src/index.js',
    ext: 'js html css ejs ico txt pdf json',
    ignore: ['src', 'node_modules', 'gulpfile.js', 'package.json']
  })
  .on('start', function() {
    if (!called) {
      called = true;
      callback();
    }
    console.log('nodemon started.');
  })
  .on('restart', function() {
    console.log('nodemon restarted.');
  });
});

// Watch for rebuild
gulp.task('watch', function(){
  gulp.watch('./src/**', ()=> { return runSequence('build'); });
});

// Build typescript task
gulp.task('typescript', shell.task(
  ['node ./node_modules/typescript/bin/tsc']
));

// Rebuild task
gulp.task('rebuild', ['clean'], function() {
  runSequence('build');
});

// RUn tslint for lint typescript statements
gulp.task("tslint", () => {
    return gulp.src(['./src/**/*.ts'])
    .pipe( tslint({ configuration: "tslint.json", exclude: "src/public/vendors", formatter: "verbose" }))
    .pipe(tslint.report())
});

// Clean up builted files
gulp.task('clean', del.bind(null, ['built']));

// Run test
gulp.task('test', () => {
  gulp.src(targetPath + '/test/**/*.js', { read: false })
    .pipe(mocha({ reporter: "spec" }))
    .on("error", (err) => {
      console.log(err.toString());
      this.emit('end');
    });
});