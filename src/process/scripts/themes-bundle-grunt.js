#!/usr/bin/env node

const path = require('node:path');
const { env, cwd, chdir } = require('node:process');
const { spawnSync } = require('node:child_process');
const { writeFileSync, readFileSync, existsSync } = require('node:fs');

class GruntRunner {
    constructor() {
        this.project_dir = cwd();
        this.node18 = path.join(env.HOME, '.nvm', 'versions', 'node', 'v18.12.1', 'lib');
    }

    validate() {
        if (!existsSync(path.join(this.project_dir, 'Gruntfile.js'))) {
            throw new Error('Gruntfile.js not found in project directory');
        }

        if (!existsSync(this.node18)) {
            throw new Error('Node v18.12.1 directory not found');
        }

        console.log('✅ Validation passed');
        console.log('Project:', this.project_dir);
        console.log('Node v18:', this.node18);
    }

    createTemplate() {
        let template = readFileSync(path.join(this.project_dir, 'Gruntfile.js'), { encoding: 'utf-8' });

        // Replace placeholders with actual values
        template = template
            .replace(/{{init_cwd}}/g, this.project_dir)
            .replace(/{{env\.BASEPATH_THEMES_BUNDLE}}/g, this.project_dir)
            .replace(/{{env\.NODE_MODULES_THEMES}}/g, path.join(this.project_dir, 'node_modules'));

        return template;
    }

    runGrunt(task = 'bootstrap4:dist') {
        console.log('🚀 Preparing Grunt execution...');

        // Show node version
        spawnSync('node', ['-v'], { stdio: "inherit" });

        // Create and write template
        const template = this.createTemplate();
        chdir(this.node18);
        writeFileSync('Gruntfile.js', template);

        console.log('📦 Running Grunt task:', task);

        // Execute grunt
        const result = spawnSync('grunt', [task], {
            stdio: "inherit",
            env: { ...env, BASEPATH_BOOTSTRAP4_BUNDLE: this.project_dir }
        });

        // Cleanup
        spawnSync('rm', ['-r', 'Gruntfile.js'], { stdio: "inherit" });

        console.log('📁 Current dir after execution:', cwd());

        return result.status === 0;
    }
}

// Main execution
try {
    const runner = new GruntRunner();
    runner.validate();

    const task = process.argv[2] || 'themes_bundle:test';
    const success = runner.runGrunt(task);

    if (success) {
        console.log('🎉 Grunt execution completed successfully!');
    } else {
        console.error('💥 Grunt execution failed!');
        process.exit(1);
    }

} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}