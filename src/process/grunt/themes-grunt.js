'use strict';

const { ThemesSass } = require('../sass/themes-sass')
const fs = require('node:fs')
const path = require('node:path')

const COMMAND = 'themes';

/** @param {import("grunt")} grunt */
module.exports.ThemesGrunt = function (grunt) {

    grunt.task.registerTask(`${COMMAND}:clean`, `${COMMAND} Development`, function () {
        const builds = path.join(ThemesSass.basepath, 'builds')
        if (fs.existsSync(builds)) {
            try {
                fs.rmSync(builds, { recursive: true, force: true })
                grunt.log.ok(`Success remove ${builds}`)
            } catch (error) {
                grunt.log.error(`Gagal remove ${builds}`)
                process.exit(1);
            }
        }

        const dist = path.join(ThemesSass.basepath, 'dist')
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
        const build = ThemesSass.sass;
        const args = grunt?.task?.current?.args ?? [];
        const initConfig = {}

        grunt.initConfig(initConfig)
        if (args.length > 0) {
            Object.keys(initConfig).forEach(k => {
                if (args.includes(k)) {
                    grunt.task.run([k])
                }
            })
            return;
        }

    });

    grunt.task.registerTask(`${COMMAND}:build`, 'Development', function () {
        const build = ThemesSass.builds;
        const args = grunt?.task?.current?.args ?? [];
        const initConfig = {}

        grunt.initConfig(initConfig)
        if (args.length > 0) {
            Object.keys(initConfig).forEach(k => {
                if (args.includes(k)) {
                    grunt.task.run([k])
                }
            })
            return;
        }

    });

    grunt.task.registerTask(`${COMMAND}:fresh`, 'Clean + Build fresh', [
        `${COMMAND}:clean`
    ]);

    grunt.task.registerTask(`${COMMAND}`, 'Default Bootstrap task', function () {
        grunt.log.ok(`Tidak ada task untuk di jalankan ${COMMAND}`)
    });

};