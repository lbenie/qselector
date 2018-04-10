module.exports = {
  rootDir: './',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: [
    '**/?(*.)(spec|test).js?(x)',
  ],
  notify: process.env.BABEL_ENV === 'test',
};
