const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const livereload = require('gulp-livereload');

gulp.task('serve', () => {
    livereload.listen();

    // configure nodemon
    nodemon({
        script: 'app.js',
        ext: 'js'
    }).on('restart', () => {
        // when the app has restarted, run livereload.
        gulp.src('app.js')
            .pipe(livereload())
            .pipe(notify('Reloading...'));
    })
});