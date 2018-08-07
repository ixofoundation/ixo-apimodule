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

gulp.task('definitions', function(done) {
	var exec = require('child_process').exec;
	var cmd = 'node ./node_modules/dts-generator/bin/dts-generator --baseDir dist --project ./ --out dist/index.d.ts';
	exec(cmd, function(error, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		done();
	});
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

gulp.task('default', gulpSequence('ts-to-js', 'uglify', 'definitions'));
