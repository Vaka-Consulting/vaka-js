# @vaka-tech/eslint-config-base

Shared eslint configuration for usage across our apps.

## Usage

Within the application project you're working on you can create a `.eslintrc` file with the following code:

```
/** ESlint configuration file that can be extended */
{
	"extends": ["@vaka-tech/eslint-config-base"]
}
```

This will import and extend the configuration from the `index.js` located in this package.
