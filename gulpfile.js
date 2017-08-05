var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    ftp = require('vinyl-ftp'),
    notify = require("gulp-notify"),
    wait = require('gulp-wait'),
    rsync = require('gulp-rsync');

// JavaScripts

gulp.task('common-js', function() {
    return gulp.src([
            'app/js/common.js',
        ])
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function() {
    return gulp.src([
            'app/libs/jquery/dist/jquery.min.js',
            // add new css libs
            'app/js/common.min.js' // alwayse in the end
        ])
        .pipe(concat('scripts.min.js'))
        // .pipe(uglify()) // minimize all js
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }));
});

// Browser localhost

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
        // tunnel: true,
        // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
    });
});

// CSS & SASS

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
        .pipe(wait(50))
        .pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer(['last 15 versions']))
        // .pipe(cleanCSS()) // не використовуючі стилі
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }));
});

// Watcher

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
    gulp.watch('app/*.html', browserSync.reload);
});

// Images

gulp.task('imagemin', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/img'));
});

// THE END

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

    var buildFiles = gulp.src([
        'app/*.html',
        'app/.htaccess',
    ]).pipe(gulp.dest('dist'));

    var buildCss = gulp.src([
        'app/css/main.min.css',
    ]).pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src([
        'app/js/scripts.min.js',
    ]).pipe(gulp.dest('dist/js'));

    var buildFonts = gulp.src([
        'app/fonts/**/*',
    ]).pipe(gulp.dest('dist/fonts'));

});

// FTP 

gulp.task('deploy', function() {

    var conn = ftp.create({
        host: 'hostname',
        user: 'admin',
        password: 'admin123',
        parallel: 10,
        log: gutil.log
    });

    var globs = [
        'dist/**',
        'dist/.htaccess',
    ];
    return gulp.src(globs, { buffer: false })
        .pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('rsync', function() {
    return gulp.src('dist/**')
        .pipe(rsync({
            root: 'dist/',
            hostname: 'username@yousite.com',
            destination: 'yousite/public_html/',
            archive: true,
            silent: false,
            compress: true
        }));
});

//Delete & clean

gulp.task('removedist', function() {
    return del.sync('dist');
});
gulp.task('clearcache', function() {
    return cache.clearAll();
});

gulp.task('default', ['watch']);