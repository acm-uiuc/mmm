A template repository for creating API's with Node.js, the Serverless framework,
and AWS. Provisions Lambda, API Gateway, and DynamoDB with help from a few useful 
tools/frameworks.

## Installation
This will install the necessary dependencies from `npm` that are defined in the 
package.json, as well as DynamoDB Local for offline testing.

```bash
yarn setup
```

## Local Development

### Testing
By default, offline development is configured with serverless-offline and 
serverless-dynamodb-local. serverless-dynamodb-local still requires credentials
to be defined even if they aren't valid. This is already taken care of in `offline.sh`
which loads the necessary environment variables.

```bash
yarn offline
```

### Utilities
The project is configured to use [`eslint`]() and [`prettier`](). There is a script 
added to the `package.json` that auto-formats the `src/` directory with the 
`eslint-config-google` and `eslint-config-prettier` presets.

```bash
yarn lint
```

or 

```bash 
eslint --fix src/**/*.js
prettier --write src/**/*.js
```

To make commits more fluid you can also run

```bash
yarn commit
```

or 

```bash
yarn lint 
git add .
git commit # Will prompt you for your commit message
git push
```

## Deployment

Deployment is standard with the Serverless framework and requires AWS 
credentials to be already configured.

```bash
sls deploy 
```

### Packaging
This project uses `serverless-webpack` to handle packaging, as well as 
Babel to transpile the code to be compatible with modules (`import`/`export`).
These items are defined in the `.babelrc` and `webpack.config.js` files. Also 
from `webpack` we take advantage of [module aliases]() to be capable of 
shortening our paths for imports.

## Project structure
The most important files to note are below

```
serverless.yml
package.json 
webpack.config.js 
src/
  callbacks/
    shared.js
    users/
      register-cb.js 
      shared.js
  input-schemas/
    users/
      register-is.js
  middleware/
    wrapper.js
    custom/
      json-body-encoder.js
  models/
    User.js
  routes/
    users/
      register.js
```