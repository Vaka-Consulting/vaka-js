# @vaka-tech/stylelint-config-base

Shared stylelint configuration for usage across our apps.

## Usage

Within the application project you're working on you can create a `.stylelintrc.js` file with the following code:

```
/** Stylelint configuration file that can be extended */
module.exports = { ...require('@vaka-tech/stylelint-config-base') };
```

This will import and extend the configuration from the `index.js` located in this package.
