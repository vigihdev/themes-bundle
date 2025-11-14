// config/dotEnv.js
const { existsSync, readFileSync } = require('node:fs');
const path = require('node:path');
const { env } = require('node:process')

class DotEnv {

    constructor() {
    }

    boot(envFile) {
        if (!existsSync(envFile)) {
            throw new Error(`File env ${envFile} tidak tersedi`)
        }

        const lines = readFileSync(envFile, 'utf-8').split('\n');
        for (let line of lines) {
            line = line.trim();
            if (line && !line.startsWith('#')) {
                const [key, ...valueParts] = line.split('=');
                const value = valueParts.join('=').trim();
                process.env[key.trim()] = value;
            }
        }
        return this;
    }


}

module.exports.DotEnv = DotEnv