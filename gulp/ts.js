'use strict';

import gulp from 'gulp';

import tslint from 'gulp-tslint';
var exec = require('child_process').exec;

gulp.task('ts-build', function (cb) {
  exec('node node_modules/typescript/lib/tsc.js', function (err, stdout, stderr) {
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
    cb(err);
  });
});

gulp.task('ts-lint', function () {
  return gulp.src(['src/**/*.ts', 'test/**/*.ts'])
    .pipe(tslint({configuration: 'tslint.json'}))
    .pipe(tslint.report({emitError: false}));
});

gulp.task('ts', ['ts-lint', 'ts-build']);

gulp.task('watch', ['ts'], function() {
  gulp.watch(['src/**/*.ts', 'test/**/*.ts'], ['ts']);
});
