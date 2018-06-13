module.exports = {
  hooks: {
    'commit-msg': 'commitlint -e $GIT_PARAMS',
    'pre-commit': 'lint-staged',
    'post-merge': 'sh post-merge.sh',
    'post-commit': 'git update-index --again',
  },
};
