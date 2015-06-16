var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    less = require('gulp-less');

gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: './app'
        },
        ghostMode: false
    });

    gulp.watch('app/less/**/*.less', ['less']);
    gulp.watch(['**/*.html', 'app/**/*.js', 'app/styles/**/*.css']).on('change', browserSync.reload);
});

gulp.task('less', function () {
    return gulp.src('./app/less/app.less')
        .pipe(less())
        .pipe(gulp.dest('./app/styles'));
});

gulp.task('copy', function () {

});

gulp.task('build-cordova', function () {

});

gulp.task('default', ['server']);
