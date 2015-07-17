var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    htmlreplace = require('gulp-html-replace'),
    gulpFilter = require('gulp-filter');

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

gulp.task('copy', ['clean'], function () {
    return gulp.src(['./app/**/*.html', './app/bower_components/**/*', './app/images/**/*', './app/styles/**/*'], { base: './app' })
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-cordova', ['build:cordova', 'clean-cordova'], function () {
    var indexFilter = gulpFilter('index.html');

    return gulp.src('./dist/**/*')
        .pipe(indexFilter)
        .pipe(htmlreplace({
            'cordova': 'cordova.js'
        }))
        .pipe(indexFilter.restore())
        .pipe(gulp.dest('./cordova/www'));
});

gulp.task('clean', function (cb) {
    del(['./dist/**/*'], cb);
});

gulp.task('clean-cordova', function (cb) {
    del(['./cordova/www/**/*'], cb);
});

gulp.task('replace', ['clean', 'copy'], function () {
    return gulp.src('./app/index.html')
        .pipe(htmlreplace({
            'js': 'app.min.js'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['clean', 'copy', 'replace'], function () {
    return gulp.src(['./app/**/*.js', '!./app/bower_components/**/*'])
        .pipe(gulp.dest('./dist'))
        .pipe(sourcemaps.init())
        .pipe(concat('app.concat.js'))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('replace:cordova', ['clean', 'copy'], function () {
    return gulp.src('./app/index.html')
        .pipe(htmlreplace({
            'js': 'app.min.js',
            'cordova': 'cordova.js'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build:cordova', ['clean', 'copy', 'replace:cordova'], function () {
    return gulp.src(['./app/**/*.js', '!./app/bower_components/**/*'])
        .pipe(gulp.dest('./dist'))
        .pipe(sourcemaps.init())
        .pipe(concat('app.concat.js'))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['server']);
