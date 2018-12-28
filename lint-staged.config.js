module.exports = {
  linters: {
    '*.js': [
      'eslint --fix',
      'git add',
    ],
  },
  "ignore": [ "dist/**" ]
};
