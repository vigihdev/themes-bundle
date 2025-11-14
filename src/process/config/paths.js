const path = require("path");
const { env, cwd } = require('node:process')

const BASEPATH = env?.BASEPATH_THEMES_BUNDLE ?? cwd();
const NODE = env?.NODE_MODULES_THEMES;

module.exports.Paths = {
    Basepath: BASEPATH,
    themes: path.join(BASEPATH, 'src', 'themes'),
    themes_bootstrap: path.join(BASEPATH, 'src', 'themes-bootstrap'),
    themes_components: path.join(BASEPATH, 'src', 'themes-components'),
    themes_styles: path.join(BASEPATH, 'src', 'themes-styles'),
}
