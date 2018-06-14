import github from 'conventional-github-releaser';
import dotenv from 'dotenv';
import log from 'fancy-log';
import fs from 'fs';
import gulp from 'gulp';
import bump from 'gulp-bump';
import changelog from 'gulp-conventional-changelog';
import git from 'gulp-git';
import ts from 'gulp-typescript';
import minimist from 'minimist';
import runSequence from 'run-sequence';

const project = ts.createProject('tsconfig.json');

dotenv.config();

const version = () => JSON.parse(fs.readFileSync('./package.json', 'utf-8')).version;

const opts = minimist(process.argv.slice(2), {
  semver: process.env.SEMVER || 'patch',
});

gulp.task('typescript', () => gulp
  .src('lib/**/*.ts')
  .pipe(project())
  .pipe(gulp.dest('lib')));

gulp.task('changelog', () => gulp
  .src('CHANGELOG.md', { buffer: false })
  .pipe(changelog({ preset: process.env.PRESET, releaseCount: 0 }))
  .pipe(gulp.dest('.')));

gulp.task('github-release', done => github({
  type: 'oauth',
  token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN,
}, { preset: process.env.PRESET || 'eslint' }, done));

gulp.task('bump-version', () => gulp
  .src('package.json')
  .pipe(bump({
    type: opts.semver,
  }).on('error', log.error))
  .pipe(gulp.dest('./')));

gulp.task('commit-changelog', () => gulp
  .src('.')
  .pipe(git.add())
  .pipe(git.commit(`docs(changelog): bumping version to ${version()}`, {
    args: '--no-verify',
  })));

gulp.task('push-changes', done => git.push('origin', 'master', done));

gulp.task('create-new-tag', done => git
  .tag(`${version()}`, `Created Tag for version: ${version()}`, (err) => {
    if (err) {
      return done(err);
    }
    return git.push('origin', 'master', {
      args: '--tags',
    }, done);
  }));

gulp.task('release', done => runSequence(
  'typescript', 'bump-version',
  'changelog', 'commit-changelog', 'push-changes',
  'create-new-tag', 'github-release', (err) => {
    if (err) {
      log.error(err.message);
    } else {
      log('RELEASE FINISHED SUCCESSFULLY');
    }
    done(err);
  },
));

gulp.task('default', ['release']);
