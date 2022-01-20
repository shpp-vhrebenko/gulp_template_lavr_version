const gulp = require("gulp");
const del = require("del");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const gcmq = require('gulp-group-css-media-queries');
const webp = require('gulp-webp');
const less = require('gulp-less');
const browserSync = require("browser-sync").create();
const gulpIf = require("gulp-if");
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');


let isMap = process.argv.includes('--map');
let isMinify = process.argv.includes('--clean');
let isSync = process.argv.includes('--sync');

const paths = {
  root: './build',
  html: {
    src: './src/**/*.html',
    dest: './build'
  },
  //templates: {
  //   pages: './src/views/pages/*.pug',
  //   src: './src/views/**/*.pug',
  //   dest: './dist'
  //} 
  styles: { 
      main: './src/css/main.scss',
      src: './src/css/**/*.css',
      dest: './build/css'
  },
  styles_less: {
    main: './src/css/main.less',
      src: './src/css/main.less',
      dest: './build/css'
  },
  scripts: {
      src: './src/js/index.js',
      dest: './build/js'
  },
  images: {
      src: './src/img/**/*',
      dest: './build/img'
  }
}

function clean() {
  return del(paths.root);
}

function html() {
  return gulp
      .src(paths.html.src)
      .pipe(gulp.dest(paths.html.dest))
      .pipe(gulpIf(isSync,browserSync.stream()));
}

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(gulpIf(isMap,sourcemaps.init()))
    .pipe(concat("main.css"))
    .pipe(gcmq())
    .pipe(autoprefixer())    
    .pipe(gulpIf(isMinify, cleanCSS({
      level: 2,
    })))
    .pipe(gulpIf(isMap,sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(gulpIf(isSync,browserSync.stream()));
}

function styles_less() {
  return gulp
    .src(paths.styles_less.src)
    .pipe(gulpIf(isMap,sourcemaps.init()))
    .pipe(less())    
    .pipe(gcmq())
    .pipe(autoprefixer())    
    .pipe(gulpIf(isMinify, cleanCSS({
      level: 2,
    })))
    .pipe(gulpIf(isMap,sourcemaps.write()))
    .pipe(gulp.dest(paths.styles_less.dest))
    .pipe(gulpIf(isSync,browserSync.stream()));
}

function scripts() {
  return gulp.src(paths.scripts.src)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(gulpIf(isSync,browserSync.stream()));
}

function images() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}

function imagesToWebp(){
	return gulp.src(paths.images.src)
				.pipe(webp())
				.pipe(gulp.dest(paths.images.dest));
}

function watch() {
  if(isSync) {
    browserSync.init({
      server: {
        baseDir: paths.root,
      },
    })
  }
  //gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.styles_less.src, styles_less);
  gulp.watch(paths.html.src, html);
}

let build = gulp.parallel(html, styles_less, images);
//let build = gulp.parallel(html, styles, images, imagesToWebp, scripts);
let buildWithClean = gulp.series(clean, build);
let dev = gulp.series(buildWithClean, watch);

gulp.task("build", buildWithClean);
gulp.task("watch", dev);
