var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify-es').default;
var gulpSequence = require('gulp-sequence');

var tsProject = ts.createProject('tsconfig.json', {
	declaration: true
});

gulp.task('ts-to-js', function() {
	return tsProject
		.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest('dist'));
});

gulp.task('ts-def', function() {
	return tsProject
		.src()
		.pipe(tsProject())
		.dts.pipe(gulp.dest('dist'));
});

gulp.task('uglify', function() {
	return gulp
		.src('dist/**')
		.pipe(uglify(/* options */))
		.pipe(gulp.dest('dist/'));
});

gulp.task('default', gulpSequence('ts-to-js', 'uglify', 'ts-def'));
