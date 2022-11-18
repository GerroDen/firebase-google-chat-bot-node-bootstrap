module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:@typescript-eslint/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		sourceType: "module",
	},
	ignorePatterns: [
		"/lib/**/*", // Ignore built files.
	],
	plugins: [
		"import",
		"@typescript-eslint",
	],
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts"],
		},
		"import/resolver": {
			typescript: true,
			node: true,
		},
	},
};
