'use strict';
// Gruntfile.js
const { env } = require('node:process')
const path = require('node:path');
const fs = require('node:fs');
const HOME = process.env?.HOME;
const INIT_CWD = process.env?.INIT_CWD;

env.BASEPATH_THEMES_BUNDLE = '{{env.BASEPATH_THEMES_BUNDLE}}'
env.NODE_MODULES_THEMES = '{{env.NODE_MODULES_THEMES}}'

if (!env.BASEPATH_THEMES_BUNDLE || !env.NODE_MODULES_THEMES) {
    throw new Error("Env not set");
}

const {
    ThemesBootstrapGrunt,
    ThemesComponentsGrunt,
    ThemesStylesGrunt,
    ThemesGrunt,
} = require(`{{init_cwd}}/src/process/grunt`)

/** @param {import("grunt")} grunt */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-strip-css-comments');

    ThemesStylesGrunt(grunt);
    ThemesGrunt(grunt);
    ThemesBootstrapGrunt(grunt);
    ThemesComponentsGrunt(grunt);

    grunt.registerTask(`themes_bundle:test`, 'Test Grunt', function () {
        grunt.log.writeln(__dirname);
        grunt.log.writeln(`Env Basepath Themes Bundle : ${env.BASEPATH_THEMES_BUNDLE}`);
        grunt.log.writeln(`Env Node Modules Themes : ${env.NODE_MODULES_THEMES}`);
    })

};
