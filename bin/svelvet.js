"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const util = require("util");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path = require("path");
const svelte = require("svelte/compiler");
const chokidar = require("chokidar");
const babel = require("@babel/core");
const glob = require("glob");
const p_limit_1 = require("p-limit");
const exec = util.promisify(child_process_1.exec);
const IS_PRODUCTION_MODE = process.env.NODE_ENV === 'production';
async function compile(srcPath) {
    try {
        const source = await fs_1.promises.readFile(srcPath, 'utf8');
        const isSvelte = srcPath.endsWith('.svelte');
        // Only compile svelte files
        const newSource = isSvelte
            ? svelte.compile(source, {
                dev: !IS_PRODUCTION_MODE,
            }).js.code
            : source;
        const destPath = srcPath
            .replace(/^src\//, 'public/')
            .replace(/.svelte$/, '.js');
        // Create all ancestor directories for this file
        await fs_1.promises.mkdir(path.dirname(destPath), { recursive: true });
        await fs_1.promises.writeFile(destPath, newSource);
        console.info(`Svelte compiled ${destPath}`);
        return destPath;
    }
    catch (err) {
        console.log('');
        console.error(`Failed to compile with svelte: ${srcPath}`);
        console.error(err);
        console.log('');
        return null;
    }
}
async function copyFile(srcPath) {
    const destPath = srcPath.replace(/^src\//, 'public/');
    // Create all ancestor directories for this file
    await fs_1.promises.mkdir(path.dirname(destPath), { recursive: true });
    await fs_1.promises.copyFile(srcPath, destPath);
    console.info(`Copied asset ${destPath}`);
}
// Update the import paths to correctly point to web_modules.
async function transform(destPath) {
    try {
        const source = await fs_1.promises.readFile(destPath, 'utf8');
        const transformed = (await babel.transformAsync(source, {
            plugins: [
                [
                    'snowpack/assets/babel-plugin.js',
                    {
                        // Append .js to all src file imports
                        optionalExtensions: true,
                    },
                ],
            ],
        }));
        await fs_1.promises.writeFile(destPath, transformed.code);
        console.info(`Babel transformed ${destPath}`);
    }
    catch (err) {
        console.log('');
        console.error(`Failed to transform with babel: ${destPath}`);
        console.error(err);
        console.log('');
    }
}
// Only needs to run during the initial compile cycle. If a developer adds a new package dependency,
// they should restart svelvet.
const snowpack = async () => {
    const maybeOptimize = IS_PRODUCTION_MODE ? '--optimize' : '';
    console.info(`\nBuilding web_modules with snowpack...`);
    try {
        const snowpackLocation = path.resolve(require.resolve('snowpack'), '../index.bin.js');
        const { stdout, stderr } = await exec(`${snowpackLocation} --include 'public/**/*' --dest public/web_modules ${maybeOptimize}`);
        // TODO: hide behind --verbose flag
        // Show any output from snowpack...
        stdout && console.info(stdout);
        stderr && console.info(stderr);
    }
    catch (err) {
        console.log('');
        console.error('Failed to build with snowpack');
        console.error(err);
        console.log('');
    }
};
async function initialBuild() {
    if (IS_PRODUCTION_MODE)
        console.info(`Building in production mode...`);
    const concurrencyLimit = p_limit_1.default(8);
    const globConfig = { nodir: true };
    const svelteAndJsFiles = glob.sync('src/**/*.+(js|mjs|svelte)', globConfig);
    const otherAssetFiles = glob.sync('src/**/*.!(js|mjs|svelte)', globConfig);
    // Just copy all other asset types, no point in reading them.
    await Promise.all(otherAssetFiles.map(srcPath => concurrencyLimit(async () => copyFile(srcPath))));
    // Compile all source files with svelte.
    const destFiles = await Promise.all(svelteAndJsFiles.map(srcPath => concurrencyLimit(async () => {
        const destPath = await compile(srcPath);
        return destPath;
    })));
    // Need to run this (only once) before transforming the import paths, or else it will fail.
    await snowpack();
    // Transform all generated js files with babel.
    await Promise.all(destFiles.map(destPath => concurrencyLimit(async () => {
        if (!destPath)
            return;
        await transform(destPath);
    })));
}
function startWatchMode() {
    console.info(`Watching for files...`);
    const srcWatcher = chokidar.watch('src');
    srcWatcher.on('change', async (srcPath) => {
        // Copy updated non-js/svelte files
        if (!srcPath.endsWith('.svelte') &&
            !srcPath.endsWith('.js') &&
            !srcPath.endsWith('.mjs')) {
            copyFile(srcPath);
            return;
        }
        const destPath = await compile(srcPath);
        if (!destPath)
            return;
        transform(destPath);
    });
}
async function main() {
    await initialBuild();
    if (!IS_PRODUCTION_MODE)
        startWatchMode();
}
main();
