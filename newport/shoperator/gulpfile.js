var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint');

gulp.task('jshint',function(){
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('styles', function(){
    return gulp.src('styles/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('styles/'));
});

gulp.task('watch',function(){
    gulp.watch('styles/*.scss',['styles']);
    gulp.watch('js/*.js',['jshint']);
});
