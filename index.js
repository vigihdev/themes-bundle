const { env } = require('node:process')

const { Paths } = require('./src/process/config/paths')
const { ThemesBootstrapSass } = require('./src/process/sass/themes-bootstrap-sass')
const { ThemesComponentsSass } = require('./src/process/sass/themes-components-sass')
const { ThemesStyleSass } = require('./src/process/sass/themes-styles-sass')
const { ThemesSass } = require('./src/process/sass/themes-sass')
const path = require('node:path')

module.exports.ThemesBundle = {
    name: "@vigihdev/themes-bundle",
    basepath: env?.BASEPATH_BOOTSTRAP4_BUNDLE,
    node: env?.NODE_MODULES_BOOTSTRAP4,
    ThemesBootstrapSass: ThemesBootstrapSass,
    ThemesComponentsSass: ThemesComponentsSass,
    ThemesStyleSass: ThemesStyleSass,
    ThemesSass: ThemesSass,
    Paths: Paths,
}