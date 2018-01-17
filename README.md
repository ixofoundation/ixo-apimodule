<div align="center">
  <a href="http://ixo.foundation/">
    <img width="310" height="200" src="https://raw.githubusercontent.com/ixofoundation/ixo-module/master/assets/ixo_logo.png">
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

### CryptoUtil

**Create new Ixo Object**
```js
import Ixo from 'ixo-module';
var ixo = new Ixo('ixo_node_url')
```

**Generate Mnemonic**
```js

console.log('Mnemonic: ' + ixo.cryptoUtil.generateMnemonic())
```
> Mnemonic: dilemma allow swamp hedgehog client reject mistake spell involve index panda course


**Generate SovrinDID**
```js
console.log('SovrinDID: ' + ixo.cryptoUtil.generateSovrinDID(mnemonic))
```
   > SovrinDID: {
             "did": "LuEoT1EkTVT7vaYP1ibvfw",
             "verifyKey": "Br6jjwiPNBgDod4hHAKNP5AfA6ViV39eVX3UV4t9uADC",
             "secret": {
                     "seed": "b3cad338b23d0e58583ca243481262ee5f8632b14d713245e8b91be87daff073",
                     "signKey": "D6qMjQCdjB8gHkEPyxXoyJTxkk5WK9egYQAEtJ6RX5fx"
             }
     }

**Sign Document**
```js
console.log('Document Signature:' + ixo.cryptoUtil.getDocumentSignature(sdid.secret.signKey, sdid.verifyKey, JSON.stringify(testJson)))
```
> Document Signature: DjoT6XqQ53J2kR4zd1shB17qFuM9DM5A2DAxQ3jjtgacvvpafWefHx54kkHewMVMTAsZm61wDCtzMV2TwkL7Fc5YdTc898X4tQ8SepthqyFBdMVs8fAt3fWDGD1fiVe5cymPCDcHwB6hP34DpQB3UAcfZSoPP2wxCbCLhTAF25RywqEWmcMDqF42pEqa9RonpF6AYGxYQt2tUKT9383HR6RhCkkbrkJSBwYQ6b4jsnysz23p4TPfahPKGWinGahXFwtZKD69SSjipzQNHWFXb5YuoqQcCToTFcEteQ3dtkDQdCcWFZ9N1

**Validate Signature**
```js
console.log('Document Signature:' + ixo.cryptoUtil.verifyDocumentSignature(signature, sdid.verifyKey))
```
> Document Signature: DjoT6XqQ53J2kR4zd1shB17qFuM9DM5A2DAxQ3jjtgacvvpafWefHx54kkHewMVMTAsZm61wDCtzMV2TwkL7Fc5YdTc898X4tQ8SepthqyFBdMVs8fAt3fWDGD1fiVe5cymPCDcHwB6hP34DpQB3UAcfZSoPP2wxCbCLhTAF25RywqEWmcMDqF42pEqa9RonpF6AYGxYQt2tUKT9383HR6RhCkkbrkJSBwYQ6b4jsnysz23p4TPfahPKGWinGahXFwtZKD69SSjipzQNHWFXb5YuoqQcCToTFcEteQ3dtkDQdCcWFZ9N1

### Network

**Ping ixo Server Node**

```js

ixo.network.pingIxoServerNode('hostname').then((result) => {
    console.log('Ping Results: ' + result)
})

```
> Ping Results: {
          "jsonrpc": "2.0",
          "id": 1,
          "result": "pong"
  }


## Scripts

 -  `npm test` - **run mocha unit tests**
 -  `npm run build` - **complies ts files to js and creates dist/ folder**


## Contributing

Contributions welcome; Please submit all pull requests the against master branch. If your pull request contains JavaScript patches or features, you should include relevant unit tests. Please check the [Contributing Guidelines](contributng.md) for more details. Thanks!


## License

 - **MIT** : http://opensource.org/licenses/MIT
