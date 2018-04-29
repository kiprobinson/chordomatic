'use strict';

/*
NOTE TO SELF:
To set this up again in the future, open command prompt in this dir and do:

npm install
npm install gulp -g

Run by executing command "gulp" from any directory.

*/

var gulp = require('gulp');
var sass = require('gulp-sass');

var onError = function (err) {
  console.log('\x1b[31m%s\x1b[0m: ', err);
  this.emit('end');
};


var srcCSS = ['chord-player.scss'];
var destCSS = '../app/';


gulp.task('default', ['build']);
gulp.task('build', ['css']);
gulp.task('watch', ['watchCSS']);

gulp.task('watchJS',function() {
  gulp.watch(srcJS,['js']);
});

gulp.task('watchCSS',function() {
  gulp.watch(srcCSS,['css']);
});

gulp.task('css', function() {
  gulp.src(srcCSS)
    .pipe(sass({outputStyle: 'compressed'}).on('error', onError))
    .pipe(gulp.dest(destCSS));
  console.log('\x1b[32m%s\x1b[0m: ', 'CSS processed.');
});
