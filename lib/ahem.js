#!/usr/bin/env node

var chalk = require('chalk');
var semver = require('semver')

var environment = semver.clean(process.version);

module.exports = ahem;

function ahem(directory) {

    // Check for directory
    if (typeof directory === 'undefined') {
        exit('No directory specified.', false);
    }

    // Load the package.json
    try {
        var package = require(directory + '/package.json');
    } 
    catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            exit('Couldn\'t find a valid package.json in ' + process.cwd() + '.', false);
        } else {
            exit(error, false);
        }
    }

    console.log('Checking node version...');

    // Get the project's node version
    try {
        var project = package.engines.node;
    } 
    catch (error) {
        if (error.message === "Cannot read property 'node' of undefined") {
            exit('No engines property set in package.json.', false);
        }
    }
    finally {
        if (typeof project === 'undefined') {
            exit('No node version defined in package.json.', false);
        }
    }

    var message;
    
    // Check if it's legit
    if (!semver.satisfies(environment, project)) {
        message = [
            chalk.red.bold('** WARNING ** '),
            'You\'re running an incorrect version of node for this project.',
            '\n',
            'You\'re currently running ' + environment + '.',
            '\n',
            'You should be using ' + project + ' instead.',
            '\n',
            'Shutting it down...',
            '\n'
        ].join('');
    } else {
        message = [
            chalk.green.bold('** SUCCESS ** '),
            'Node environment satisifies the project requirements.', 
            '\n',
            'You\'re currently running ' + environment + '.',
            '\n',
            'Project requires ' + project + '.',
        ].join('');
    }

    // And exit with our result
    exit(message, false);

}

function exit(message, success) {
    console.log(message);
    process.exit((success) ? 0 : 1);
}
