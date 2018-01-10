<div align="center">
  <a href="http://ixo.foundation/">
    <img width="280" height="200" src="https://raw.githubusercontent.com/ixofoundation/ixo-module/master/assets/ixo_logo.png">
  </a>
</div>

# ixo-module

![npm](https://img.shields.io/npm/v/ixo-module.svg) ![license](https://img.shields.io/npm/l/ixo-module.svg) ![github-issues](https://img.shields.io/github/issues/ixofoundation/ixo-module.svg)  ![Circle CI build status](https://circleci.com/gh/ixofoundation/ixo-module.svg?style=svg)

This is a node module that defines the functions that can be performed by the ixo protocol. It enables developers to easily integrate their applications into the ixo network. 

Note. This is still a WIP. We are planning an official release early 2018. 

![nodei.co](https://nodei.co/npm/ixo-module.png?downloads=true&downloadRank=true&stars=true)

![](https://david-dm.org/ixofoundation/ixo-module/status.svg)
![](https://david-dm.org/ixofoundation/ixo-module/dev-status.svg)

## Features


## Install

`npm install --save ixo-module`

## Usage


```js
import * as ixo from 'ixo-module';
var cryptoUtil = new ixo.CryptoUtil();

console.log(cryptoUtil.generateMnemonic())
```


## Scripts

 - **npm run test** : `npm test`


## Contributing

Contributions welcome; Please submit all pull requests the against master branch. If your pull request contains JavaScript patches or features, you should include relevant unit tests. Please check the [Contributing Guidelines](contributng.md) for more details. Thanks!


## License

 - **MIT** : http://opensource.org/licenses/MIT
