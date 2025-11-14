'use strict';

const { ThemesStyleSass } = require('../sass/themes-styles-sass')
const fs = require('node:fs')
const path = require('node:path')

const COMMAND = 'themes_styles';

/** @param {import("grunt")} grunt */
module.exports.ThemesStylesGrunt = function (grunt) {

    grunt.task.registerTask(`${COMMAND}:clean`, `${COMMAND} Development`, function () {
        const builds = path.join(ThemesStyleSass.basepath, 'builds')
        if (fs.existsSync(builds)) {
            try {
                fs.rmSync(builds, { recursive: true, force: true })
                grunt.log.ok(`Success remove ${builds}`)
            } catch (error) {
                grunt.log.error(`Gagal remove ${builds}`)
                process.exit(1);
            }
        }

        const dist = path.join(ThemesStyleSass.basepath, 'dist')
        if (fs.existsSync(dist)) {
            try {
                fs.rmSync(dist, { recursive: true, force: true })
                grunt.log.ok(`Success remove ${dist}`)
            } catch (error) {
                grunt.log.error(`Gagal remove ${dist}`)
                process.exit(1);
            }
        }
    });

    grunt.task.registerTask(`${COMMAND}:dist`, 'Development', function () {

        grunt.initConfig({
            sass: ThemesStyleSass.sass,
        })
        grunt.task.run(['sass'])
    });

    grunt.task.registerTask(`${COMMAND}:build`, 'Development', function () {
        const build = ThemesStyleSass.builds;
        grunt.initConfig({
            concat_css: build.concat_css,
        })
        grunt.task.run(['concat_css'])
    });

    grunt.task.registerTask(`${COMMAND}:fresh`, 'Clean + Build fresh', [
        `${COMMAND}:clean`,
        `${COMMAND}:dist`,
        `${COMMAND}:build`,
    ]);

    grunt.task.registerTask(`${COMMAND}`, 'Default Bootstrap task', function () {
        grunt.task.run(`${COMMAND}:build`);
    });

    grunt.task.registerTask(`${COMMAND}:watch`, 'watch themes styles grunt', function () {

        const watch = ThemesStyleSass.watch;
        const args = grunt?.task?.current?.args ?? [];
        const initConfig = {
            watch: {
                css: {
                    files: watch.css,
                    tasks: [`${COMMAND}:dist`]
                }
            },
        }

        grunt.initConfig(initConfig)
        grunt.task.run(['watch'])

    });

};