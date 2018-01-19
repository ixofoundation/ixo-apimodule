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
   
   ixo.network.pingIxoServerNode().then((result) => {
       console.log('Ping Results: ' + result)
   })
   
   ```
   > Ping Results: {
             "jsonrpc": "2.0",
             "id": 1,
             "result": "pong"
     }
     
### Projects
   
   **Gets project template**
   
   ```js
   
   ixo.project.getProjectTemplate().then((result) => {
       console.log('Project Template: ' + result)
   })
   
   ```
   > Project Template: {
                           "jsonrpc": "2.0",
                           "id": 1,
                           "result": {
                                   "template": {
                                           "@context": "http://ixo.foundation/schema",
                                           "@type": "Project",
                                           "so": "http://schema.org/",
                                           "name": "so:name",
                                           "about": "so:about",
                                           "country": "so:country",
                                           "thumbnail": {
                                                   "@type": "ImageObject",
                                                   "contentUrl": "so:contentUrl"
                                           },
                                           "owner": {
                                                   "@type": "Person",
                                                   "email": "so:email",
                                                   "name": "so:name"
                                           }
                                   },
                                   "form": {
                                           "fields": [
                                                   {
                                                           "label": "Project Name",
                                                           "name": "name",
                                                           "type": "text"
                                                   },
                                                   {
                                                           "label": "About",
                                                           "name": "about",
                                                           "type": "textarea"
                                                   },
                                                   {
                                                           "label": "Country",
                                                           "name": "country",
                                                           "type": "country"
                                                   },
                                                   {
                                                           "label": "Thumbnail",
                                                           "name": "thumbnail",
                                                           "type": "image"
                                                   },
                                                   {
                                                           "label": "Owner Name",
                                                           "name": "owner.name",
                                                           "type": "text"
                                                   },
                                                   {
                                                           "label": "Owner email",
                                                           "name": "owner.email",
                                                           "type": "text"
                                                   }
                                           ]
                                   }
                           }
                   }

     
**Gets list of projects**
   
   ```js
   
   ixo.project.listProjects().then((result) => {
       console.log('Project Template: ' + result)
   })
   
   ```
   
   > Project List: {
                             "jsonrpc": "2.0",
                                     "id": 1,
                                     "result": [
                                             {
                                                     "_id": "5a61abec670a09001abf0560",
                                                     "name": "Water Saving",
                                                     "country": "ZA",
                                                     "tx": "f249310d2582927fc2019a94f96ca9df9a1c069bf3826bec89a4226a8201df4e",
                                                     "__v": 0,
                                                     "owner": {
                                                             "email": "joe@bloggs.com",
                                                             "name": "Joe Blogs",
                                                             "did": "0x92928b5135d8dbad88b1e772bf5b8f91bfe41a8d"
                                                     },
                                                     "created": "2018-01-19T08:27:24.669Z"
                                             },
                                             {
                                                     "_id": "5a61abeb670a09001abf055e",
                                                     "name": "Water Saving",
                                                     "country": "ZA",
                                                     "tx": "77fc5cbdc2985aab2bda1754e36f9a879c29d98c0eb49394df07d40f306c3b65",
                                                     "__v": 0,
                                                     "owner": {
                                                             "email": "joe@bloggs.com",
                                                             "name": "Joe Blogs",
                                                             "did": "0x92928b5135d8dbad88b1e772bf5b8f91bfe41a8d"
                                                     },
                                                     "created": "2018-01-19T08:27:23.679Z"
                                             },
                                             {
                                                     "_id": "5a61abea670a09001abf055c",
                                                     "name": "Water Saving",
                                                     "country": "ZA",
                                                     "tx": "a843e51f7e8787a669463bb0eeda7c2f4578fb501388ab2bc0ae3493012b086e",
                                                     "__v": 0,
                                                     "owner": {
                                                             "email": "joe@bloggs.com",
                                                             "name": "Joe Blogs",
                                                             "did": "0x92928b5135d8dbad88b1e772bf5b8f91bfe41a8d"
                                                     },
                                                     "created": "2018-01-19T08:27:22.685Z"
                                             },
                                             {
                                                     "_id": "5a61abe8670a09001abf055a",
                                                     "name": "Water Saving",
                                                     "country": "ZA",
                                                     "tx": "02382076c5ae1b0478d32bf48f8e8f9b39049ae98d7fb573e346e72cd4d8242e",
                                                     "__v": 0,
                                                     "owner": {
                                                             "email": "joe@bloggs.com",
                                                             "name": "Joe Blogs",
                                                             "did": "0x92928b5135d8dbad88b1e772bf5b8f91bfe41a8d"
                                                     },
                                                     "created": "2018-01-19T08:27:20.833Z"
                                             },
                                             {
                                                     "_id": "5a61abe7670a09001abf0558",
                                                     "name": "Water Saving",
                                                     "country": "ZA",
                                                     "tx": "d164ffd4d18add95eea273783c4b98e3046618d3c2009b01a19f935ab9f734ca",
                                                     "__v": 0,
                                                     "owner": {
                                                             "email": "joe@bloggs.com",
                                                             "name": "Joe Blogs",
                                                             "did": "0x92928b5135d8dbad88b1e772bf5b8f91bfe41a8d"
                                                     },
                                                     "created": "2018-01-19T08:27:19.124Z"
                                             }
                                     ]
                             }


## Scripts

 -  `npm test` - **run mocha unit tests**
 -  `npm run build` - **complies ts files to js and creates dist/ folder**


## Contributing

Contributions welcome; Please submit all pull requests the against master branch. If your pull request contains JavaScript patches or features, you should include relevant unit tests. Please check the [Contributing Guidelines](contributng.md) for more details. Thanks!


## License

 - **MIT** : http://opensource.org/licenses/MIT
