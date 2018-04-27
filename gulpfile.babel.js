import gulp from 'gulp';
import changelog from 'gulp-conventional-changelog';
import github from 'conventional-github-releaser';
import git from 'gulp-git';
import minimist from 'minimist';
import bump from 'gulp-bump';
import log from 'fancy-log';
import runSequence from 'run-sequence';
import fs from 'fs';

require('dotenv').config();

const version = () => JSON.parse(fs.readFileSync('./package.json', 'utf-8')).version;
const opts = minimist(process.argv.slice(2), {
  semver: process.env.SEMVER || 'patch',
  preset: process.env.PRESET || 'eslint',
  token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN || '',
});

gulp.task('changelog', () => gulp
  .src('CHANGELOG.md', { buffer: false })
  .pipe(changelog({ preset: opts.preset, releaseCount: 0 }))
  .pipe(gulp.dest('.')));

gulp.task('github-release', done =>
  github({
    type: 'oauth',
    token: opts.token,
  }, { preset: opts.preset }, done));

gulp.task('bump-version', () =>
  gulp
    .src('package.json')
    .pipe(bump({
      type: opts.semver,
    }).on('error', log.error))
    .pipe(gulp.dest('./')));

gulp.task('commit-changelog', () => gulp
  .src('.')
  .pipe(git.add())
  .pipe(git.commit(`docs(changelog): bumping version to ${version()}`)));

gulp.task('push-changes', done => git.push('origin', 'master', done));

gulp.task('create-new-tag', done =>
  git.tag(`v${version()}`, `Created Tag for version: ${version()}`, (err) => {
    if (err) {
      return done(err);
    }
    return git.push('origin', 'master', {
      args: '--tags',
    }, done);
  }));

gulp.task('release', done =>
  runSequence('bump-version', 'changelog', 'commit-changelog', 'push-changes', 'create-new-tag', 'github-release', (err) => {
    if (err) {
      log.error(err.message);
    } else {
      log.log('RELEASE FINISHED SUCCESSFULLY');
    }
    done(err);
  }));

gulp.task('default', ['release']);
