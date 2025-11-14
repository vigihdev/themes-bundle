const path = require('node:path');
const { existsSync, lstat, lstatSync, readFileSync, writeFileSync } = require('node:fs');
const { Paths } = require('./paths')

class ParentThemesBundle {

    constructor() {
        this.parent_file = path.join(Paths.parent_themes_styles, '_index.scss')
    }

    add(...path_parent_sass) {
        if (!this.#validate()) {
            throw new Error(`File ${this.parent_file} tidak tersedia`)
        }

        if (path_parent_sass.length === 0) {
            return;
        }

        var outs = [];
        path_parent_sass.forEach(f => {
            var file = existsSync(this.#parseSassFile(f)) ? this.#parseSassFile(f) : undefined;
            if (file) {
                const rel_file = path.relative(path.parse(this.parent_file).dir, file);
                outs.push(this.#normalizeSassFile(rel_file))
            }
        })

        if (outs.length === 0) {
            return;
        }

        const out = outs.map(f => `@import "${f}";`).join('\n')
        try {
            writeFileSync(this.parent_file, out);
        } catch (error) {
            console.error(error)
        }
    }

    #parseSassFile(file) {
        let name = path.parse(file).name
        const trim = ( /** @type {string} */ txt) => txt.trim().replace(/^_/, '').replace(/\.scss$/, '')
        return path.join(path.parse(file).dir, `_${trim(name)}.scss`)
    }

    #normalizeSassFile(file) {
        var name = path.parse(file).name
        name = name.trim().replace(/^_/, '').replace(/\.scss$/, '')
        return path.join(path.parse(file).dir, name);
    }

    #validate() {
        return existsSync(this.parent_file) && lstatSync(this.parent_file).isFile();
    }

    #getContent() {
        if (!this.#validate()) {
            throw new Error(`File ${this.parent_file} tidak tersedia`)
        }
        return readFileSync(this.parent_file, { encoding: 'utf-8' })
    }
}

module.exports.ParentThemesBundle = ParentThemesBundle