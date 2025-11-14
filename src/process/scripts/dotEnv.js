#!/usr/bin/env node

const path = require('node:path');
const fs = require('node:fs');
const env = require('node:process');

class EnvSetup {
    static setup() {
        const HOME = process.env.HOME;
        const BASEPATH = path.join(HOME, 'VigihDev', 'NpmPackage', 'bootstrap4-bundle');

        // Set required environment variables
        process.env.BASEPATH_BOOTSTRAP4_BUNDLE = path.join(BASEPATH, '..', 'testBuild');
        process.env.NODE_MODULES_BOOTSTRAP4 = path.join(BASEPATH, 'node_modules');
        process.env.PROCESS_BASEPATH = BASEPATH;

        return {
            HOME,
            BASEPATH,
            BASEPATH_BOOTSTRAP4_BUNDLE: process.env.BASEPATH_BOOTSTRAP4_BUNDLE,
            NODE_MODULES_BOOTSTRAP4: process.env.NODE_MODULES_BOOTSTRAP4
        };
    }

    static validate() {
        const config = this.setup();

        // Validation
        if (!process.env.BASEPATH_BOOTSTRAP4_BUNDLE) {
            throw new Error('BASEPATH_BOOTSTRAP4_BUNDLE not set');
        }

        if (!process.env.NODE_MODULES_BOOTSTRAP4) {
            throw new Error('NODE_MODULES_BOOTSTRAP4 not set');
        }

        console.log('✅ Environment setup completed');
        console.log('BASEPATH_BOOTSTRAP4_BUNDLE:', process.env.BASEPATH_BOOTSTRAP4_BUNDLE);
        console.log('NODE_MODULES_BOOTSTRAP4:', process.env.NODE_MODULES_BOOTSTRAP4);

        return config;
    }
}
EnvSetup.setup();
EnvSetup.validate();