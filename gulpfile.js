var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

gulp.task('serve', function() {
    livereload.listen();

    // configure nodemon
    nodemon({
        script: 'app.js',
        ext: 'js'
    }).on('restart', function() {
        // when the app has restarted, run livereload.
        gulp.src('app.js')
            .pipe(livereload())
            .pipe(notify('Reloading...'));
    })
});