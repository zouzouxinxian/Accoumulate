// gulp够用了
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var inlinesource = require('gulp-inline-source');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');

gulp.task('uglifyCss', function () {
    return gulp.src(['nav-bar/*.scss', 'site-footer/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'last 2 versions', 'not ie <= 8'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('uglifyJs', function () {
    return gulp.src(['nav-bar/*.js', 'site-footer/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('merge', function () {
    return gulp.src(['nav-bar/*.ejs', 'site-footer/*.ejs'])
        .pipe(inlinesource())
        .pipe(gulp.dest('dist'));
});

gulp.task('beforeClean', function f () {
    return gulp.src('dist/*')
        .pipe(clean({force: true}));
});

gulp.task('afterClean', function f () {
    return gulp.src(['dist/*.css', 'dist/*.js'])
        .pipe(clean({force: true}));
});

gulp.task('build', function (cb) {
    gulpSequence(['beforeClean'], ['uglifyCss', 'uglifyJs'], ['merge'], ['afterClean'], cb);
});

gulp.task('watch', function () {
    gulp.watch(['nav-bar/*', 'site-footer/*'], ['build']);
});
