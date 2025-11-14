// themes.js
'use strict';

const path = require('node:path');
const fs = require('node:fs');
const { Paths } = require('../config/paths');

const BASEPATH = Paths.themes;

const PATHS = {
    DIST: {
        CSS: path.join(BASEPATH, 'dist', 'css'),
        JS: path.join(BASEPATH, 'dist', 'js')
    },
    BUILDS: {
        CSS: path.join(BASEPATH, 'builds', 'css'),
        JS: path.join(BASEPATH, 'builds', 'js')
    }
};

// Sass Configuration
const sass = {
    dist: {
        options: {
            sourceMap: false,
            'no-source-map': true,
            style: 'expanded'
        },
        files: {
            [`${PATHS.DIST.CSS}/themes.css`]: `${BASEPATH}/src/scss/themes.scss`,
        }
    }
};

// Concat Configuration
const concatFiles = {
    js: {
        [`${PATHS.DIST.JS}/themes.js`]: `${BASEPATH}/src/js/*.js`,
    },
    css: {}
};


module.exports.ThemesSass = {
    basepath: BASEPATH,
    paths: PATHS,
    sass: sass,
    concat: {
        options: {
            separator: ';'
        },
        dist: {
            files: { ...concatFiles.js },
        },
    },
    builds: {
        copy: {
            main: {
                files: {
                    [`${PATHS.BUILDS.JS}/themes.js`]: [`${PATHS.DIST.JS}/themes.js`],
                    [`${PATHS.BUILDS.CSS}/themes.css`]: [`${PATHS.DIST.CSS}/themes.css`],
                }
            }
        },
    },
    watch: {
        sass: [
            `${BASEPATH}/src/scss/*.scss`,
            `${BASEPATH}/src/scss/*/*.scss`,
            `${BASEPATH}/src/scss/*/*/*.scss`,
            `${BASEPATH}/src/scss/*/*/*/*.scss`,
        ],
        js: [
            `${BASEPATH}/src/js/*.js`,
            `${BASEPATH}/src/js/*/*.js`,
        ]
    }
};