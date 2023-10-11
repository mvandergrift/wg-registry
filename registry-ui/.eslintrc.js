module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars": "warn",        
        "no-tabs": "off",        
        "indent": "off",
        "no-trailing-spaces": "off",
        "extra-semi": "off",        
        "react/scope": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/indent": ["warn", 4],
        "@typescript-eslint/quotes": ["warn", "double"],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/semi": "off",
    }  
}
