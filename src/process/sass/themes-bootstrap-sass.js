// themes-bootstrap.js
'use strict';

const path = require('node:path');
const fs = require('node:fs');
const { Paths } = require('../config/paths');

const BASEPATH = Paths.themes_bootstrap;

const PATHS = {
    DIST: {
        CSS: path.join(BASEPATH, 'dist', 'css'),
        JS: path.join(BASEPATH, 'dist', 'js')
    },
    BUILDS: {
        CSS: path.join(BASEPATH, 'builds', 'css'),
        JS: path.join(BASEPATH, 'builds', 'js')
    },
    LIBRARIES: {
        CHECKBOX: path.join(BASEPATH, 'checkbox'),
        FORM: path.join(BASEPATH, 'form'),
        LOADERS: path.join(BASEPATH, 'loaders'),
        RADIO_GROUP: path.join(BASEPATH, 'radio-group'),
        SWITCH: path.join(BASEPATH, 'switch'),
        VENDOR: path.join(BASEPATH, 'vendor')
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
            [`${PATHS.DIST.CSS}/checkbox.css`]: `${PATHS.LIBRARIES.CHECKBOX}/src/scss/checkbox.scss`,
            [`${PATHS.DIST.CSS}/form.css`]: `${PATHS.LIBRARIES.FORM}/src/scss/form.scss`,
            [`${PATHS.DIST.CSS}/loaders.css`]: `${PATHS.LIBRARIES.LOADERS}/src/scss/loaders.scss`,
            [`${PATHS.DIST.CSS}/radio-group.css`]: `${PATHS.LIBRARIES.RADIO_GROUP}/src/scss/radio-group.scss`,
            [`${PATHS.DIST.CSS}/switch.css`]: `${PATHS.LIBRARIES.SWITCH}/src/scss/switch.scss`,
            [`${PATHS.DIST.CSS}/vendor.css`]: `${PATHS.LIBRARIES.VENDOR}/src/scss/vendor.scss`,
        }
    }
};

// Concat Configuration
const concatFiles = {
    js: {
        [`${PATHS.DIST.JS}/checkbox.js`]: `${PATHS.LIBRARIES.CHECKBOX}/src/js/*.js`,
        [`${PATHS.DIST.JS}/form.js`]: `${PATHS.LIBRARIES.FORM}/src/js/*.js`,
        [`${PATHS.DIST.JS}/switch.js`]: `${PATHS.LIBRARIES.SWITCH}/src/js/*.js`,
        [`${PATHS.DIST.JS}/loaders.js`]: `${PATHS.LIBRARIES.LOADERS}/src/js/*.js`,
        [`${PATHS.DIST.JS}/vendor.js`]: `${PATHS.LIBRARIES.VENDOR}/src/js/*.js`,
        [`${PATHS.DIST.JS}/radio-group.js`]: `${PATHS.LIBRARIES.RADIO_GROUP}/src/js/*.js`,
    },
    css: {}
};

// Builds Configuration
const buildsConfig = {
    js: Object.keys(concatFiles.js)?.filter(f => fs.existsSync(f)),
    css: Object.keys(sass.dist.files)?.filter(f => fs.existsSync(f))
};


const watch = {
    js: [
        `${BASEPATH}/*/src/js/*.js`,
        `${BASEPATH}/*/src/js/*/*.js`,
        `${BASEPATH}/*/src/js/*/*/*.js`,
    ],
    css: [
        `${BASEPATH}/*/src/scss/*.scss`,
        `${BASEPATH}/*/src/scss/*/*.scss`,
        `${BASEPATH}/*/src/scss/*/*/*.scss`,
        `${BASEPATH}/*/src/scss/*/*/*/*.scss`,
    ]
}

module.exports.ThemesBootstrapSass = {
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
        concat: {
            dist: {
                files: {
                    [`${PATHS.BUILDS.JS}/themes-bootstrap.js`]: buildsConfig.js,
                },
            },
        },
        concat_css: {
            main: {
                files: {
                    [`${PATHS.BUILDS.CSS}/themes-bootstrap.css`]: buildsConfig.css,
                },
            }
        },
    },
    watch: watch
};