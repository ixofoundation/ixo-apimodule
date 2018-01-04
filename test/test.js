var ixo = require('ixo-module');

//Test generateMnemonic()
var mnemonic = ixo.generateMnemonic();
console.log("Mnemonic: " + mnemonic);

//Test generateSovrinDID()
var sdid = ixo.generateSovrinDID(mnemonic);

console.log("Sovrin DID: " + JSON.stringify(sdid));

//Test getDocumentSignature()
var test = {
"employees":[
    {"firstName":"John", "lastName":"Doe"}, 
    {"firstName":"Anna", "lastName":"Smith"},
    {"firstName":"Peter", "lastName":"Jones"}
]
};

var signature = ixo.getDocumentSignature(sdid.secret.signKey, sdid.verifyKey, test);

console.log("Document signature: " + signature);

//Test verifyDocumentSignature()
console.log("Is valid signature: " + ixo.verifyDocumentSignature(signature, sdid.verifyKey));
