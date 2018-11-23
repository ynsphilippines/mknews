var gulp = require('gulp'),
  pug = require('gulp-pug'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  htmlbeautify = require('gulp-html-beautify'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  htmlclean = require('gulp-htmlclean'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  paths = {
    css_dir:  './src/css/',
    scss: './src/scss/**/*.scss',
    css:  './src/css/main.css',
    pug:  './src/pug/*.pug',
    html:  './src/*.html',
    html_dir: './src/',

    src: './src/*',
    srcCSS: './src/css/**/*.css',
    srcImg: './src/images/*',
    srcJS: './src/javascript/**/*.js',

    tmp: 'tmp',   
    tmpCSS: './tmp/css/',
    tmpImg: './tmp/images/',
    tmpJS: './tmp/javascript/',

    dist: 'dist',   
    distCSS: './dist/css/',
    distImg: './dist/images/',
    distJS: './dist/javascript/',
  },
  options = {
    "indent_size": 4,
    "indent_char": " ",
    "eol": "\n",
    "indent_level": 0,
    "indent_with_tabs": false,
    "preserve_newlines": true,
    "max_preserve_newlines": 10,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse",
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "break_chained_methods": false,
    "eval_code": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "wrap_attributes": "auto",
    "wrap_attributes_indent_size": 4,
    "end_with_newline": true
  }

// AUTO BUILD TO TMP FILE
gulp.task('sass + autoprefixer', function () {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest(paths.css_dir))
});

gulp.task('pug', function () {
  return gulp.src(paths.pug, {base: './src/pug'})
    .pipe(pug())
    .pipe(htmlbeautify(options))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(htmlclean())
    .pipe(gulp.dest(paths.html_dir))
    .pipe(gulp.dest(paths.tmp))
});

gulp.task('css-minify', function () {
  return gulp.src('./src/css/main.css')
  .pipe(concat('main.min.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest(paths.tmpCSS));
});

gulp.task('js-minify', function () {
  return gulp.src('./src/javascript/main.js')
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(paths.tmpJS));
});

gulp.task('tmpCss', function () {
  return gulp.src([paths.srcCSS,'!./src/css/main.css'])
  .pipe(gulp.dest(paths.tmpCSS))
});

gulp.task('tmpJs', function () {
  return gulp.src([paths.srcJS,'!./src/javascript/main.js'])
  .pipe(gulp.dest(paths.tmpJS))
});

gulp.task('tmpImage', function () {
  return gulp.src(paths.srcImg)
  .pipe(cache(imagemin({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true})))
  .pipe(gulp.dest(paths.tmpImg));
});

gulp.task('copy', ['css-minify','js-minify','tmpCss','tmpImage']);
gulp.task('watch', function () {
  gulp.watch([ paths.scss, paths.pug, paths.src, paths.srcJS], ['sass + autoprefixer', 'pug', 'copy','tmpJs']);
});

gulp.task('default',function(){
  gulp.start('watch');
});
// END AUTO BUILD TO TMP FILE


// BUILD TO DIST FOLDER
gulp.task('distHtml', function () {
  return gulp.src('./tmp/*.html')
    .pipe(htmlclean())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('distCss', function () {
  return gulp.src('./tmp/css/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.distCSS))
});

gulp.task('distJavascript', function () {
  return gulp.src('./tmp/javascript/**/*.js')
    .pipe(gulp.dest(paths.distJS))
});

gulp.task('distImage', function () {
  return gulp.src('./tmp/images/**/*')
  .pipe(cache(imagemin({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true})))
  .pipe(gulp.dest(paths.distImg));
});

gulp.task('build', ['distHtml', 'distCss', 'distImage', 'distJavascript']);