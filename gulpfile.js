var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    package = require('./package.json'),
    sourcemaps = require('gulp-sourcemaps'),
    jscs = require('gulp-jscs');


var banner = [
    '/*!\n' +
    ' * <%= package.name %>\n' +
    ' * <%= package.title %>\n' +
    ' * <%= package.url %>\n' +
    ' * @author <%= package.author %>\n' +
    ' * @version <%= package.version %>\n' +
    ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
    ' */',
    '\n'
].join('');

gulp.task('sass', function () {
    return gulp.src('app/assets/sass/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true, sourceComments: true}))
        .pipe(header(banner, { package : package } ))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(minifyCSS({
            removeDuplicates: true
        }))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('js',function(){
    gulp.src([
        'app/assets/js/app.js'
    ])
    .pipe(concat('main.js'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/assets/js'))
    //.pipe(uglify())
    //.pipe(header(banner, { package : package }))
    //.pipe(rename({ suffix: '.min' }))
    //.pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('jsCheck',function(){
    gulp.src('app/assets/js/**/*.js')
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('image',function(){
    return gulp.src([
        'app/assets/images/**/*.gif',
        'app/assets/images/**/*.png',
        'app/assets/images/**/*.jpg'
    ])
        .pipe(gulp.dest('dist/assets/images/'))
        .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('html',function(){
    gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "dist"
        },
        open: false
    });
});

gulp.task('default', ['jsCheck', 'js', 'sass', 'image', 'html', 'browser-sync'], function () {
    gulp.watch('app/assets/img/**/*', ['image']);
    gulp.watch("app/assets/sass/**/*.scss", ['sass']);
    gulp.watch("app/assets/js/**/*.js", ['jsCheck', 'js']);
    gulp.watch("app/**/*.html", ['html']);
});
