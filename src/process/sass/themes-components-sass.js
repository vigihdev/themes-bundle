// themes-components.js
'use strict';

const path = require('node:path');
const fs = require('node:fs');
const { Paths } = require('../config/paths');

const BASEPATH = Paths.themes_components;

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
        GOOGLE_MAP: path.join(BASEPATH, 'google-map'),
        TYPEAHEAD: path.join(BASEPATH, 'typeahead'),
        INFINITE_SCROLL: path.join(BASEPATH, 'infinite-scroll'),
        LIGHTBOX: path.join(BASEPATH, 'lightbox'),
        OWL_CAROUSEL: path.join(BASEPATH, 'owl-carousel'),
        SELECT2: path.join(BASEPATH, 'select2'),
        TEMPUS_DOMINUS: path.join(BASEPATH, 'tempus-dominus')
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
            [`${PATHS.DIST.CSS}/google-map.css`]: `${PATHS.LIBRARIES.GOOGLE_MAP}/src/scss/google-map.scss`,
            [`${PATHS.DIST.CSS}/typeahead.css`]: `${PATHS.LIBRARIES.TYPEAHEAD}/src/scss/typeahead.scss`,
            [`${PATHS.DIST.CSS}/infinite-scroll.css`]: `${PATHS.LIBRARIES.INFINITE_SCROLL}/src/scss/infinite-scroll.scss`,
            [`${PATHS.DIST.CSS}/lightbox.css`]: `${PATHS.LIBRARIES.LIGHTBOX}/src/scss/lightbox.scss`,
            [`${PATHS.DIST.CSS}/owl-carousel.css`]: `${PATHS.LIBRARIES.OWL_CAROUSEL}/src/scss/owl-carousel.scss`,
            [`${PATHS.DIST.CSS}/select2.css`]: `${PATHS.LIBRARIES.SELECT2}/src/scss/select2.scss`,
            [`${PATHS.DIST.CSS}/tempus-dominus.css`]: `${PATHS.LIBRARIES.TEMPUS_DOMINUS}/src/scss/tempus-dominus.scss`
        }
    }
};

// Concat Configuration
const concatFiles = {
    js: {
        [`${PATHS.DIST.JS}/google-map.js`]: `${PATHS.LIBRARIES.GOOGLE_MAP}/src/js/*.js`,
        [`${PATHS.DIST.JS}/lightbox.js`]: `${PATHS.LIBRARIES.LIGHTBOX}/src/js/*.js`,
        [`${PATHS.DIST.JS}/select2.js`]: `${PATHS.LIBRARIES.SELECT2}/src/js/*.js`,
        [`${PATHS.DIST.JS}/typeahead.js`]: `${PATHS.LIBRARIES.TYPEAHEAD}/src/js/*.js`,
        [`${PATHS.DIST.JS}/owl-carousel.js`]: `${PATHS.LIBRARIES.OWL_CAROUSEL}/src/js/*.js`,
        [`${PATHS.DIST.JS}/infinite-scroll.js`]: `${PATHS.LIBRARIES.INFINITE_SCROLL}/src/js/*.js`,
        [`${PATHS.DIST.JS}/tempus-dominus.js`]: `${PATHS.LIBRARIES.TEMPUS_DOMINUS}/src/js/*.js`,
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

module.exports.ThemesComponentsSass = {
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
                    [`${PATHS.BUILDS.JS}/themes-components.js`]: buildsConfig.js,
                },
            },
        },
        concat_css: {
            main: {
                files: {
                    [`${PATHS.BUILDS.CSS}/themes-components.css`]: buildsConfig.css,
                },
            }
        },
    },
    watch: watch
};