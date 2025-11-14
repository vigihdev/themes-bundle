'use strict';

const { ThemesBootstrapSass } = require('../sass/themes-bootstrap-sass')
const fs = require('node:fs')
const path = require('node:path')

const COMMAND = 'themes_bootstrap';

/** @param {import("grunt")} grunt */
module.exports.ThemesBootstrapGrunt = function (grunt) {

    grunt.task.registerTask(`${COMMAND}:clean`, `${COMMAND} Development`, function () {
        const builds = path.join(ThemesBootstrapSass.basepath, 'builds')
        if (fs.existsSync(builds)) {
            try {
                fs.rmSync(builds, { recursive: true, force: true })
                grunt.log.ok(`Success remove ${builds}`)
            } catch (error) {
                grunt.log.error(`Gagal remove ${builds}`)
                process.exit(1);
            }
        }

        const dist = path.join(ThemesBootstrapSass.basepath, 'dist')
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
        const args = grunt?.task?.current?.args ?? [];
        const initConfig = {
            sass: ThemesBootstrapSass.sass,
            concat: ThemesBootstrapSass.concat,
        }

        grunt.initConfig(initConfig)
        if (args.length > 0) {
            Object.keys(initConfig).forEach(k => {
                if (args.includes(k)) {
                    grunt.task.run([k])
                }
            })
            return;
        }

        grunt.task.run(['sass', 'concat'])
    });

    grunt.task.registerTask(`${COMMAND}:build`, 'Development', function () {
        const args = grunt?.task?.current?.args ?? [];
        const build = ThemesBootstrapSass.builds;
        const initConfig = {
            concat: build.concat,
            concat_css: build.concat_css,
        }

        grunt.initConfig(initConfig)
        if (args.length > 0) {
            Object.keys(initConfig).forEach(k => {
                if (args.includes(k)) {
                    grunt.task.run([k])
                }
            })
            return;
        }
        grunt.task.run(['concat', 'concat_css'])
    });

    grunt.task.registerTask(`${COMMAND}:fresh`, 'Clean + Build fresh', [
        `${COMMAND}:clean`,
        `${COMMAND}:dist`,
        `${COMMAND}:build`,
    ]);

    grunt.task.registerTask(`${COMMAND}`, 'Default Bootstrap task', function () {
        grunt.task.run(`${COMMAND}:build`);
    });

    grunt.task.registerTask(`${COMMAND}:watch`, 'Watch themes bootstrap grunt', function () {

        const watch = ThemesBootstrapSass.watch;
        const args = grunt?.task?.current?.args ?? [];
        const initConfig = {
            watch: {
                css: {
                    files: watch.css,
                    tasks: [`${COMMAND}:dist`, `${COMMAND}:build`]
                },
                js: {
                    files: watch.js,
                    tasks: [`${COMMAND}:build`]
                }

            },
        }

        grunt.initConfig(initConfig)
        grunt.task.run(['watch'])

    });

};