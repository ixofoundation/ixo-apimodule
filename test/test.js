var ixo = require('ixo-module');

var mnemonic = ixo.generateMnemonic();
console.log("Mnemonic: " + mnemonic);

var sdid = ixo.generateSovrinDID(mnemonic);

console.log("Sovrin DID: " + JSON.stringify(sdid));

var test = {
"employees":[
    {"firstName":"John", "lastName":"Doe"}, 
    {"firstName":"Anna", "lastName":"Smith"},
    {"firstName":"Peter", "lastName":"Jones"}
]
};

var signature = ixo.getDocumentSignature(sdid.secret.signKey, sdid.verifyKey, test);

console.log("Document signature: " + signature);
