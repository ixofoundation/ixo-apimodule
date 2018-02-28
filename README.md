# ixo-module

![npm](https://img.shields.io/npm/v/ixo-module.svg) ![license](https://img.shields.io/npm/l/ixo-module.svg) ![github-issues](https://img.shields.io/github/issues/ixofoundation/ixo-module.svg)  ![Circle CI build status](https://circleci.com/gh/ixofoundation/ixo-module.svg?style=svg)

This is a node module that defines the functions that can be performed by the ixo protocol.

![nodei.co](https://nodei.co/npm/ixo-module.png?downloads=true&downloadRank=true&stars=true)

![travis-status](https://img.shields.io/travis/ixofoundation/ixo-module.svg)
![stars](https://img.shields.io/github/stars/ixofoundation/ixo-module.svg)
![forks](https://img.shields.io/github/forks/ixofoundation/ixo-module.svg)

![forks](https://img.shields.io/github/forks/ixofoundation/ixo-module.svg)

![](https://david-dm.org/ixofoundation/ixo-module/status.svg)
![](https://david-dm.org/ixofoundation/ixo-module/dev-status.svg)

## Features


## Install

`npm install --save ixo-module`


## Scripts

 - **npm run build** : `tsc`
 - **npm run test** : `mocha --timeout 5000 -r ts-node/register 'test/**/*.spec.ts'`
 - **npm run readme** : `node ./node_modules/.bin/node-readme`
 - **npm run prep-publish** : `rm -Rf node_modules/ package-lock.json dist/ && npm install && gulp`

## Dependencies

Package | Version | Dev
--- |:---:|:---:
[@types/es6-promise](https://www.npmjs.com/package/@types/es6-promise) | ^3.3.0 | ✖
[base58](https://www.npmjs.com/package/base58) | 1.0.1 | ✖
[bip39](https://www.npmjs.com/package/bip39) | 2.4.0 | ✖
[crypto-js](https://www.npmjs.com/package/crypto-js) | ^3.1.9-1 | ✖
[elliptic](https://www.npmjs.com/package/elliptic) | ^6.4.0 | ✖
[ethjs-query](https://www.npmjs.com/package/ethjs-query) | ^0.3.3 | ✖
[immutable](https://www.npmjs.com/package/immutable) | ^3.8.2 | ✖
[isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch) | ^2.2.1 | ✖
[jayson](https://www.npmjs.com/package/jayson) | ^2.0.5 | ✖
[json-hash](https://www.npmjs.com/package/json-hash) | ^1.2.0 | ✖
[loadjs](https://www.npmjs.com/package/loadjs) | ^3.5.2 | ✖
[node](https://www.npmjs.com/package/node) | ^9.3.0 | ✖
[node-fetch](https://www.npmjs.com/package/node-fetch) | ^1.7.3 | ✖
[sovrin-did](https://www.npmjs.com/package/sovrin-did) | 1.2.0 | ✖
[tls](https://www.npmjs.com/package/tls) | 0.0.1 | ✖
[whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch) | ^2.0.3 | ✖
[@types/chai](https://www.npmjs.com/package/@types/chai) | ^4.1.0 | ✔
[@types/mocha](https://www.npmjs.com/package/@types/mocha) | ^2.2.46 | ✔
[@types/node](https://www.npmjs.com/package/@types/node) | ^9.3.0 | ✔
[babel-core](https://www.npmjs.com/package/babel-core) | ^6.26.0 | ✔
[babel-preset-env](https://www.npmjs.com/package/babel-preset-env) | ^1.6.1 | ✔
[babelify](https://www.npmjs.com/package/babelify) | ^8.0.0 | ✔
[browserify](https://www.npmjs.com/package/browserify) | ^15.2.0 | ✔
[chai](https://www.npmjs.com/package/chai) | ^4.1.2 | ✔
[chalk](https://www.npmjs.com/package/chalk) | ^2.3.0 | ✔
[ethereumjs-util](https://www.npmjs.com/package/ethereumjs-util) | ^5.1.4 | ✔
[ethereumjs-wallet](https://www.npmjs.com/package/ethereumjs-wallet) | ^0.6.0 | ✔
[ethjs-provider-http](https://www.npmjs.com/package/ethjs-provider-http) | ^0.1.6 | ✔
[ethjs-rpc](https://www.npmjs.com/package/ethjs-rpc) | ^0.1.8 | ✔
[gulp](https://www.npmjs.com/package/gulp) | ^3.9.1 | ✔
[gulp-sequence](https://www.npmjs.com/package/gulp-sequence) | ^1.0.0 | ✔
[gulp-typescript](https://www.npmjs.com/package/gulp-typescript) | ^3.2.4 | ✔
[gulp-uglify](https://www.npmjs.com/package/gulp-uglify) | ^3.0.0 | ✔
[gulp-uglify-es](https://www.npmjs.com/package/gulp-uglify-es) | ^1.0.0 | ✔
[mocha](https://www.npmjs.com/package/mocha) | ^4.1.0 | ✔
[node-noop](https://www.npmjs.com/package/node-noop) | ^1.0.0 | ✔
[node-readme](https://www.npmjs.com/package/node-readme) | ^0.1.9 | ✔
[pump](https://www.npmjs.com/package/pump) | ^3.0.0 | ✔
[ts-node](https://www.npmjs.com/package/ts-node) | ^4.1.0 | ✔
[tsify](https://www.npmjs.com/package/tsify) | ^3.0.4 | ✔
[typescript](https://www.npmjs.com/package/typescript) | ^2.6.2 | ✔


## Contributing

Contributions welcome; Please submit all pull requests the against master branch. If your pull request contains JavaScript patches or features, you should include relevant unit tests. Please check the [Contributing Guidelines](contributng.md) for more details. Thanks!

## Author

nicolaas.vercuiel73@gmail.com

## License

 - **MIT** : http://opensource.org/licenses/MIT
