const Ixo = require('ixo-module');
var ixo = new Ixo();

//Test generateMnemonic()
var mnemonic = ixo.cryptoUtil.generateMnemonic();
console.log("Mnemonic: " + mnemonic);

//Test generateSovrinDID()
var sdid = ixo.cryptoUtil.generateSovrinDID(mnemonic);

console.log("Sovrin DID: " + JSON.stringify(sdid));

//Test getDocumentSignature()
var test = {
    "employees": [
        {"firstName": "John", "lastName": "Doe"},
        {"firstName": "Anna", "lastName": "Smith"},
        {"firstName": "Peter", "lastName": "Jones"}
    ]
};

var signature = ixo.cryptoUtil.getDocumentSignature(sdid.secret.signKey, sdid.verifyKey, test);

console.log("Document signature: " + signature);

//Test verifyDocumentSignature()
console.log("Is valid signature: " + ixo.cryptoUtil.verifyDocumentSignature(signature, sdid.verifyKey));

ixo.network.pingIxoNode().then(function (responses) {
    if (responses[0].error) console.log('error');
    console.log('Server response: ' + responses[0].result);
});



