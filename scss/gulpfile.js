'use strict';

/*
NOTE TO SELF:
To set this up again in the future, open command prompt in this dir and do:

npm install

Run by executing command "npm run build".

Watch for changes with "npm run watch".

*/

let gulp = require('gulp');
let sass = require('gulp-sass')(require('sass'));

let onError = function (err) {
  console.log('\x1b[31m%s\x1b[0m: ', err);
  this.emit('end');
};


let srcCSS = ['chord-player.scss'];
let destCSS = '../app/';


gulp.task('css', function(done) {
  return gulp.src(srcCSS)
    .pipe(sass({outputStyle: 'compressed'}).on('error', onError))
    .pipe(gulp.dest(destCSS));
});

gulp.task('watchCSS',function() {
  return gulp.watch(srcCSS, gulp.series('css'));
});


gulp.task('watch', gulp.series('watchCSS'));
gulp.task('build', gulp.series('css'));
gulp.task('default', gulp.series('build'));
