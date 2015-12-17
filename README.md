# Ahem

Check your project's requirements against your current Node environment.

## Description

Ahem looks for a `package.json` in the current working directory, looks for an `node` property inside the `engines` property, and compares the two using [`semver`](https://github.com/npm/node-semver). If the project's requirements are satisfied, it exits cleanly. Otherwise it exits with an error code of 1.

It's quite aggressive - if it can't find an engines / node entry, it'll exit with an error. The reason being is that if you need to be using it, it should be quite strict.

Originally intended to make running old [spine](https://github.com/spine/spine) projects less painful, hence the name (thanks [marten](https://github.com/marten)).

## Installation

Add it to your project by running: 

```npm install --save-dev ahem```

You could also install it globally by running:

```npm install -g ahem```

...but you're probably better off not doing that. This should only ever be a crutch for legacy projects.

## Usage

In your project's `package.json`, set the version of Node it supports via the `engines` property:

```
"engines": {
    "node": "0.12.7"
}
```

Then run it before your build processes start, through the bin available at `./node_modules/bin/ahem`. Or `require` it into your Javascript and pass a directory as an argument:

```
var ahem = require('ahem');

ahem(process.cwd());
```

## Examples

In a ruby build script:

```
system('./node_modules/.bin/ahem') or exit(1)
# Carry on building stuff...
```

In an NPM `packages.json`:
```
"scripts": {
    "start": "ahem && haw serve",
}
```

This errors explosively - if you have a better way, let me know!
