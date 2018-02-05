var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var uglify = require('gulp-uglify');
var pump = require('pump');
var gulpSequence = require('gulp-sequence');

gulp.task("ts-to-js", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task('compress', function (cb) {
    pump([
        gulp.src('dist/**'),
        uglify(),
        gulp.dest('dist')
    ],
        cb
    );
});

gulp.task('default', gulpSequence('ts-to-js', 'compress'));