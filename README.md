# Ahem

Check your project's requirements against your current Node environment.

## Description

Ahem looks for a `package.json` in the current working directory, looks for an `node` property inside the `engines` property, and compares the two using [`semver`](https://github.com/npm/node-semver). If the project's requirements are satisfied, it exits cleanly. Otherwise it exits with an error code of 1.

It's quite aggressive - if it can't find an engines / node entry, it'll exit with an error. The reason being is that if you need to be using it, it should be quite strict.

## Usage

Just run it before your build processes start.

## Examples

In a ruby build script:

```
system('ahem') or exit(1)


# Carry on building stuff...
```

