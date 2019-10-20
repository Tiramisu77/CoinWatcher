module.exports = {
    env: {
        es6: true,
        browser: true,
    },

    extends: ["eslint:recommended", "plugin:react/recommended"],
    parserOptions: {
        ecmaVersion: 2017,
        ecmaFeatures: { experimentalObjectRestSpread: true },
        sourceType: "module",
    },
    settings: {
        react: {
            createClass: "createReactClass", // Regex for Component Factory to use,
            pragma: "React", // Pragma to use, default to "React"
            version: "detect", // React version. "detect" automatically picks the version you have installed.
            flowVersion: "0.53", // Flow version
        },
        propWrapperFunctions: [
            // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
            "forbidExtraProps",
            { property: "freeze", object: "Object" },
            { property: "myFavoriteWrapper" },
        ],
        linkComponents: [
            // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
            "Hyperlink",
            { name: "Link", linkAttribute: "to" },
        ],
    },
    plugins: ["react"],
    rules: { "no-console": "off", "no-var": ["error"], "react/prop-types": [0] },
}
