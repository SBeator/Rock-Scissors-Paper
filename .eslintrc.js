module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": [
        "react"
    ],
    "rules": {
        "comma-dangle": 0,
        "no-unused-vars": [
            "error",
            {
                "vars": "all",
                "args": "none"
            }]
    }
};