<<<<<<< HEAD
const { src, dest, watch, parallel, series } = require('gulp')

const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const clean = require('gulp-clean')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')

function styles() {
    return src('app/sass/style.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({ overrideBrowserlist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'app/js/*.js',
        '!app/js/main.min.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function images() {
    return src('app/images/**/*')
        .pipe(imagemin(
            [
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        { removeViewBox: true },
                        { cleanupIDs: false }
                    ]
                })
            ]
        ))
        .pipe(dest('dist/images'))
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/images/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'))
}

function watching() {
    watch(['app/sass/**/*.sass'], styles)
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)
    watch(['app/*.html']).on('change', browserSync.reload)
}

exports.styles = styles
exports.scripts = scripts
exports.watching = watching
exports.browsersync = browsersync

exports.build = series(cleanDist, build)
=======
const { src, dest, watch, parallel, series } = require('gulp')

const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const clean = require('gulp-clean')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')

function styles() {
    return src('app/sass/style.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({ overrideBrowserlist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'app/js/*.js',
        '!app/js/main.min.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function images() {
    return src('app/images/**/*')
        .pipe(imagemin(
            [
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        { removeViewBox: true },
                        { cleanupIDs: false }
                    ]
                })
            ]
        ))
        .pipe(dest('dist/images'))
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/images/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'))
}

function watching() {
    watch(['app/sass/**/*.sass'], styles)
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)
    watch(['app/*.html']).on('change', browserSync.reload)
}

exports.styles = styles
exports.scripts = scripts
exports.watching = watching
exports.browsersync = browsersync

exports.build = series(cleanDist, build)
>>>>>>> d44a302 (first commit)
exports.default = parallel(styles, scripts, watching, browsersync)