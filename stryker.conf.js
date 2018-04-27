module.exports = (config) => {
  config.set({
    testRunner: 'jest',
    mutator: 'javascript',
    transpilers: ['babel'],
    reporter: ['html', 'baseline', 'clear-text', 'progress', 'dashboard'],
    coverageAnalysis: 'off',
    mutate: ['lib/**/*.js'],
    babelrcFile: '.babelrc',
  });
};
