#!/usr/bin/env node

var ahem = require('../lib/ahem');
var argv = require('minimist')(process.argv.slice(2));
var package = require('../package.json');

if (argv.h || argv.help) {
    showHelp();
} else if (argv.v || argv.version) {
    showVersion();
} else {
    ahem(process.cwd());
}

function showHelp() {
    console.log();
    console.log('NAME:');
    console.log('    ahem');
    console.log();
    console.log('DESCRIPTION:');
    console.log('    Looks in the current working directory for a package.json, looks for any');
    console.log('    node requirements specified in the engines property, and checks them');
    console.log('    against your current node version. Exits with a code 0 if they\'re'); 
    console.log('    satisfied, otherwise exits 1.');
    console.log();
    console.log('USAGE:');
    console.log('    ahem');
    console.log();    
    console.log('VERSION:');
    console.log('    ' + package.version);
    console.log();
    console.log('OPTIONS:');
    console.log('    -h, --help:    Shows this message');
    console.log('    -v, --version: Shows this message');
    console.log();   
}

function showVersion() {
    console.log(package.version);
}