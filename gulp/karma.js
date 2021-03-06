import gulp from "gulp";

const config = __dirname + '/../karma.conf.js';
const Server = require('karma').Server;

gulp.task('karma-tdd', ['ts'], function (done) {
    return new Server({
        configFile: config,
        coverageReporter: {
            type : 'html',
            dir : 'coverage'
        },
        browsers: ['Chrome']
    }, done).start();
});

gulp.task('karma-ci', function (done) {
    return new Server({
        configFile: config,
        coverageReporter: {
            type: 'lcov',
            subdir: 'lcov',
            dir: 'coverage'
        },
        singleRun: true,
        autoWatch: false
    }, done).start();
});

gulp.task('karma-ci-short', function (done) {
    return new Server({
        configFile: config,
        coverageReporter: {type : 'text'},
        singleRun: true,
        autoWatch: false
    }, done).start();
});

gulp.task('karma-coverage', function (done) {
    return new Server({
        configFile: config,
        coverageReporter: {
            type : 'html',
            dir : 'coverage'
        },
        singleRun: true,
        autoWatch: false
    }, done).start();
});
