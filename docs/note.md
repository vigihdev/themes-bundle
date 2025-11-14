```
build
dist
themes-bundle
target_path
node_modules
Bootstrap4
BASEPATH_BOOTSTRAP4_BUNDLE
Paths
basepath
process
themes
themes_bootstrap
themes_components
themes_styles
```

```
concat
concat_css
```

```json
{
  "grunt:themes": "./src/process/scripts/themes-bundle-grunt.js themes",
  "grunt:themes:dist": "./src/process/scripts/themes-bundle-grunt.js themes:dist",
  "grunt:themes:build": "./src/process/scripts/themes-bundle-grunt.js themes:build",
  "grunt:themes:clean": "./src/process/scripts/themes-bundle-grunt.js themes:clean",
  "grunt:themes:fresh": "./src/process/scripts/themes-bundle-grunt.js themes:fresh",
  "grunt:styles": "./src/process/scripts/themes-bundle-grunt.js themes_styles",
  "grunt:styles:dist": "./src/process/scripts/themes-bundle-grunt.js themes_styles:dist",
  "grunt:styles:clean": "./src/process/scripts/themes-bundle-grunt.js themes_styles:clean",
  "grunt:styles:fresh": "./src/process/scripts/themes-bundle-grunt.js themes_styles:fresh",
  "grunt:styles:build": "./src/process/scripts/themes-bundle-grunt.js themes_styles:build",
  "grunt:components": "./src/process/scripts/themes-bundle-grunt.js themes_components",
  "grunt:components:dist": "./src/process/scripts/themes-bundle-grunt.js themes_components:dist",
  "grunt:components:clean": "./src/process/scripts/themes-bundle-grunt.js themes_components:clean",
  "grunt:components:build": "./src/process/scripts/themes-bundle-grunt.js themes_components:build",
  "grunt:themes-bs": "./src/process/scripts/themes-bundle-grunt.js themes_bootstrap",
  "grunt:themes-bs:dist": "./src/process/scripts/themes-bundle-grunt.js themes_bootstrap:dist",
  "grunt:themes-bs:build": "./src/process/scripts/themes-bundle-grunt.js themes_bootstrap:build",
  "grunt:themes-bs:clean": "./src/process/scripts/themes-bundle-grunt.js themes_bootstrap:clean"
}
```

```js
const path = require("node:path");
const fs = require("node:fs");
const { cwd, env } = require("node:process");
const { ThemesBundle } = require("./index");
const {
  ThemesGrunt,
  ThemesStylesGrunt,
  ThemesComponentsGrunt,
} = require("./src/process/grunt");

console.log(`Server From ${__dirname}\n`);

console.log(
  [ThemesBundle.Paths.themes, ThemesBundle.Paths.themes_components].join("\n")
);

console.log(ThemesBundle.ThemesBootstrapSass.sass.dist.files);

console.log(
  [
    ThemesBundle.ThemesSass.paths.BUILDS.CSS,
    ThemesBundle.ThemesSass.paths.BUILDS.JS,
  ].join("\n")
);

console.log(
  typeof ThemesStylesGrunt === "function",
  typeof ThemesGrunt === "function",
  typeof ThemesComponentsGrunt === "function"
);

console.log(
  [
    ThemesBundle.ThemesBootstrapSass.basepath,
    ThemesBundle.ThemesBootstrapSass.watch.js,
  ].join("\n")
);
```
