module.exports = function (config) {
  config.set({
    basePath: '',
    files: [
      {pattern: 'src/**/*', included: false},
      {pattern: 'test/**/*', included: false},
      'test/test-main.js'
    ],
    middleware: ['node-modules'],
    reporters: ['mocha', 'coverage'],
    port: 9876,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: ['PhantomJS'],
    preprocessors: {
      'src/**/*.js': ['coverage']
    },
    captureTimeout: 60000,
    singleRun: true,
    frameworks: ['jasmine', 'cajon']
  });
};

