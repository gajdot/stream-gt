const browserSync = require('browser-sync').create();
const chalk = require('chalk');
const fs = require('fs-extra');
const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const sass = require('gulp-sass');

async function clean() {
    const files = [];

    files.push(
        'lang',
        'templates',
        'scripts',
        'module.json',
    );

    console.log(' ', chalk.yellow('Files to clean:'));
    console.log('   ', chalk.blueBright(files.join('\n    ')));

    try {
        for (const filePath of files) {
            await fs.remove(path.join('dist', filePath));
        }
        return Promise.resolve();
    } catch (err) {
        Promise.reject(err);
    }
}

function buildWebpack() {
    return new Promise(function (resolve, reject) {
        webpack(webpackConfig, function (err, stats) {
            if (err)
                return reject(err);
            if (stats.hasErrors())
                return reject(new Error(stats.compilation.errors.join('\n')));

            browserSync.reload();
            resolve();
        });
    });
}

function buildSass() {
    return gulp.src('./src/styles/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/styles'));
}

/**
 * Copy static files
 */
async function copyFiles() {
    const statics = [
        'lang',
        'templates',
        'module.json',
    ];
    try {
        for (const file of statics) {
            if (fs.existsSync(path.join('src', file))) {
                await fs.copy(path.join('src', file), path.join('dist', file));
            }
        }
        browserSync.reload();
        return Promise.resolve();
    } catch (err) {
        Promise.reject(err);
    }
}

function serve() {
    const config = {
        server: false,
        proxy: {
            target: "localhost:30000",
            ws: true
        },
        browser: 'google-chrome',
        open: false
    };
    browserSync.init(config);
    gulp.watch('src/scripts/**/*.js', buildWebpack);
}

exports.build = gulp.series(clean, buildWebpack, buildSass, copyFiles);
exports.serve = gulp.series(clean, buildWebpack, buildSass, copyFiles, serve)