var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var uglify = require('gulp-uglify-es').default;
var pump = require('pump');
var gulpSequence = require('gulp-sequence');

gulp.task("ts-to-js", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task("uglify", function () {
    return gulp.src('dist/**')
        .pipe(uglify(/* options */))
        .pipe(gulp.dest("dist/"));
});

gulp.task('default', gulpSequence('ts-to-js', 'uglify'));
