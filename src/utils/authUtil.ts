var loadjs = require('loadjs');
declare const Web3: any;

export function getWeb3FromBrowser(): any {
    loadjs('https://cdn.rawgit.com/ethereum/web3.js/develop/dist/web3.min.js', 'web3');
    loadjs.ready('web3', {
        success: function () {
            window.addEventListener('load', function () {
                var web3 = (window as any)['web3'];
                // Checking if Web3 has been injected by the browser (Mist/MetaMask)
                if (typeof web3 !== 'undefined') {
                    // Use Mist/MetaMask's provider.
                    return new Web3(web3.currentProvider);
                } else {
                    // Fallback to localhost if no web3 injection. We've configured this to
                    // use the development console's port by default.
                    return new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'));
                }
            });
        },
        error  : function (depsNotFound: any) {
            console.error(depsNotFound);
        }
    });
    
}