'use strict';
// grunt/index.js
const { ThemesBootstrapGrunt } = require('./themes-bootstrap-grunt');
const { ThemesComponentsGrunt } = require('./themes-components-grunt');
const { ThemesStylesGrunt } = require('./themes-styles-grunt');
const { ThemesGrunt } = require('./themes-grunt');

module.exports = {
    ThemesBootstrapGrunt,
    ThemesComponentsGrunt,
    ThemesStylesGrunt,
    ThemesGrunt,
};