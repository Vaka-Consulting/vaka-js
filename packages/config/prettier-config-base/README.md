# @vaka-tech/prettier-config-base

Shared prettier configuration for usage across our apps.

## Usage

Within the application project you're working on you can create a `.prettierrc.js` file with the following code:

```
/** Prettier configuration file that can be extended */
module.exports = { ...require('@vaka-tech/prettier-config-base') };
```

This will import and extend the configuration from the `index.js` located in this package.
