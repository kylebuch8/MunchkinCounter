var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: './app'
        },
        ghostMode: false
    });

    gulp.watch('**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['server']);
