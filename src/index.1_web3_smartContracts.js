// web3 provider
if (typeof web3 !== 'undefined') {
    console.log("Existing instance of web3");
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    console.log("set your providers for web3");
    // web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/76ba8681b14b4f1bac44c41e5e0e843a"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var compte_investor = {
    "email": "3@gmail.com",
    "password": "a123"
};

var compte_producer = {
    "email": "2@gmail.com",
    "password": "a123",
    "address": "0x583031d1113ad414f02576bd6afabfb302140225"
};

// prepare smartContracts
var userManagerContrat_address = "0xe2e975110056e8c576e1d319db91966dcabb919d";
var userManagerContrat_abi = 
    [ 
    { "constant": false, "inputs": [ { "name": "userEmail", "type": "string" }, { "name": "userPassword", "type": "string" }, { "name": "userEmailProducer", "type": "string" }, { "name": "filmIndex", "type": "uint256" }, { "name": "filmPrice", "type": "uint256" } ], "name": "buyFilm", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "userEmail", "type": "string" }, { "name": "userPassword", "type": "string" }, { "name": "userEmailProducer", "type": "string" }, { "name": "tokenPrice", "type": "uint256" }, { "name": "tokenNumber", "type": "uint256" } ], "name": "buyToken", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "userEmail", "type": "string" }, { "name": "userPassword", "type": "string" } ], "name": "deleteUser", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "userEmailProducer", "type": "string" }, { "name": "userPassword", "type": "string" }, { "name": "userEmailInvestor", "type": "string" }, { "name": "amountTokens", "type": "uint256" } ], "name": "finishToken", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "userEmail", "type": "string" }, { "name": "userPassword", "type": "string" }, { "name": "userAddress", "type": "address" }, { "name": "userName", "type": "string" }, { "name": "userIdentity", "type": "string" }, { "name": "userBalance", "type": "uint256" } ], "name": "insertUser", "outputs": [ { "name": "index_userIndexEmails", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "userEmail", "type": "string" }, { "name": "userPassword", "type": "string" }, { "name": "userAddress", "type": "address" }, { "name": "userName", "type": "string" }, { "name": "userIdentity", "type": "string" }, { "name": "userBalance", "type": "uint256" } ], "name": "updateUser", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "userEmail", "type": "string" }, { "name": "userOldPassword", "type": "string" }, { "name": "userNewPassword", "type": "string" } ], "name": "updateUserPassword", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "function_call", "type": "string" }, { "indexed": false, "name": "userIndex", "type": "uint256" }, { "indexed": false, "name": "userAddress", "type": "address" }, { "indexed": false, "name": "userEmail", "type": "string" }, { "indexed": false, "name": "userName", "type": "string" }, { "indexed": false, "name": "userIdentity", "type": "string" }, { "indexed": false, "name": "userBalance", "type": "uint256" }, { "indexed": false, "name": "userBoughtFilm", "type": "uint256[]" } ], "name": "logUser", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "function_call", "type": "string" }, { "indexed": false, "name": "success", "type": "bool" } ], "name": "operationUser", "type": "event" }, { "constant": true, "inputs": [ { "name": "index_userIndexEmails", "type": "uint256" } ], "name": "getByIndex_userIndexEmails", "outputs": [ { "name": "userEmail", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getNumberUser", "outputs": [ { "name": "numberUser", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "userEmail", "type": "string" }, { "name": "userPassword", "type": "string" } ], "name": "getUser", "outputs": [ { "name": "index_userIndexEmails", "type": "uint256" }, { "name": "userAddress", "type": "address" }, { "name": "userName", "type": "string" }, { "name": "userIdentity", "type": "string" }, { "name": "userBalance", "type": "uint256" }, { "name": "userBoughtFilm", "type": "uint256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "userEmail", "type": "string" } ], "name": "getUserAddressBy_userEmail", "outputs": [ { "name": "userAddress", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupplyEthereum", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ];

var filmManagerContrat_address = "0xbdf243a4fdb1d98f3e7563f56056c90a543f599f";
var filmManagerContrat_abi = 
    [ 
    { "constant": false, "inputs": [ { "name": "filmIndex", "type": "uint256" }, { "name": "filmName", "type": "string" }, { "name": "filmDescription", "type": "string" }, { "name": "filmImageUrl", "type": "string" }, { "name": "filmUrl", "type": "string" }, { "name": "filmPrice", "type": "uint256" }, { "name": "filmNumberVoir", "type": "uint256" }, { "name": "filmNotation", "type": "uint256" }, { "name": "filmPublished", "type": "bool" }, { "name": "filmIco", "type": "bool" } ], "name": "updateFilm", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "filmIndex", "type": "uint256" } ], "name": "getFilm", "outputs": [ { "name": "filmName", "type": "string" }, { "name": "filmDescription", "type": "string" }, { "name": "filmImageUrl", "type": "string" }, { "name": "filmUrl", "type": "string" }, { "name": "filmPrice", "type": "uint256" }, { "name": "filmNumberVoir", "type": "uint256" }, { "name": "filmNotation", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "filmIndex", "type": "uint256" } ], "name": "deleteFilm", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getNumberFilm", "outputs": [ { "name": "numberFilm", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "filmName", "type": "string" }, { "name": "filmDescription", "type": "string" }, { "name": "filmImageUrl", "type": "string" }, { "name": "filmUrl", "type": "string" }, { "name": "filmPrice", "type": "uint256" }, { "name": "filmNumberVoir", "type": "uint256" }, { "name": "filmNotation", "type": "uint256" }, { "name": "filmPublished", "type": "bool" }, { "name": "filmIco", "type": "bool" }, { "name": "userEmailProducer", "type": "string" } ], "name": "insertFilm", "outputs": [ { "name": "index_filmIndexes", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "filmIndex", "type": "uint256" } ], "name": "getFilmInfo_published_ico_producer", "outputs": [ { "name": "index_filmIndexes", "type": "uint256" }, { "name": "filmPublished", "type": "bool" }, { "name": "filmIco", "type": "bool" }, { "name": "userEmailProducer", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "index_filmIndexes", "type": "uint256" } ], "name": "getByIndex_filmIndexes", "outputs": [ { "name": "filmIndex", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getNextFilmIndex", "outputs": [ { "name": "nextFIlmIndex", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "function_call", "type": "string" }, { "indexed": false, "name": "filmIndex", "type": "uint256" }, { "indexed": false, "name": "filmName", "type": "string" }, { "indexed": false, "name": "filmDescription", "type": "string" }, { "indexed": false, "name": "filmImageUrl", "type": "string" }, { "indexed": false, "name": "filmUrl", "type": "string" }, { "indexed": false, "name": "filmPrice", "type": "uint256" }, { "indexed": false, "name": "filmNumberVoir", "type": "uint256" }, { "indexed": false, "name": "filmNotation", "type": "uint256" } ], "name": "logFilm", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "function_call", "type": "string" }, { "indexed": false, "name": "filmIndex", "type": "uint256" }, { "indexed": false, "name": "filmPublished", "type": "bool" }, { "indexed": false, "name": "filmIco", "type": "bool" }, { "indexed": false, "name": "userEmailProducer", "type": "string" } ], "name": "logFilm_published_ico_producer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "function_call", "type": "string" }, { "indexed": false, "name": "success", "type": "bool" } ], "name": "operationFilm", "type": "event" } ];

var tokenManagerContrat_address = "0xa987b04b6b36d1bca6c0926c621295c1b44f9f3f";
var tokenManagerContrat_abi = 
    [ 
    { "constant": false, "inputs": [ { "name": "filmIndex", "type": "uint256" }, { "name": "filmBudget", "type": "uint256" }, { "name": "filmIssueDate", "type": "uint256" }, { "name": "filmMaturity", "type": "uint256" }, { "name": "tokenPrice", "type": "uint256" }, { "name": "tokenNumber", "type": "uint256" } ], "name": "updateToken", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "filmIndex", "type": "uint256" } ], "name": "minusOneTokenRecommend", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "filmIndex", "type": "uint256" } ], "name": "deleteToken", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getNumberToken", "outputs": [ { "name": "numberToken", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "filmIndex", "type": "uint256" } ], "name": "addOneTokenRecommend", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "filmIndex", "type": "uint256" }, { "name": "filmBudget", "type": "uint256" }, { "name": "filmIssueDate", "type": "uint256" }, { "name": "filmMaturity", "type": "uint256" }, { "name": "tokenPrice", "type": "uint256" }, { "name": "tokenNumber", "type": "uint256" }, { "name": "tokenRecommend", "type": "int256" } ], "name": "insertToken", "outputs": [ { "name": "index_filmIndexes", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "index_filmIndexes", "type": "uint256" } ], "name": "getByIndex_filmIndexes", "outputs": [ { "name": "filmIndex", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "filmIndex", "type": "uint256" } ], "name": "getToken", "outputs": [ { "name": "index_filmIndexes", "type": "uint256" }, { "name": "filmBudget", "type": "uint256" }, { "name": "filmMaturity", "type": "uint256" }, { "name": "filmIssueDate", "type": "uint256" }, { "name": "tokenPrice", "type": "uint256" }, { "name": "tokenNumber", "type": "uint256" }, { "name": "tokenRecommend", "type": "int256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "filmIndex", "type": "uint256" }, { "indexed": false, "name": "filmBudget", "type": "uint256" }, { "indexed": false, "name": "filmIssueDate", "type": "uint256" }, { "indexed": false, "name": "filmMaturity", "type": "uint256" }, { "indexed": false, "name": "tokenPrice", "type": "uint256" }, { "indexed": false, "name": "tokenNumber", "type": "uint256" }, { "indexed": false, "name": "tokenRecommend", "type": "int256" } ], "name": "logToken", "type": "event" } ];


var tokenDistributionForUserManager_address = "0x6fda0d401bd0fb8f27ea0f601df1dfc3fe633963";
var tokenDistributionForUserManager_abi = 
    [ 
    { "constant": false, "inputs": [ { "name": "userAddress", "type": "address" }, { "name": "filmIndex", "type": "uint256" } ], "name": "deleteTokenForUser", "outputs": [ { "name": "index_userBoughtTokens", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "userAddress", "type": "address" } ], "name": "getUserAndAllTokens", "outputs": [ { "name": "index_userIndexAddresses", "type": "uint256" }, { "name": "userBoughtTokens", "type": "uint256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getAllUser", "outputs": [ { "name": "allUser", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "userAddress", "type": "address" } ], "name": "deleteUser", "outputs": [ { "name": "index_userIndexAddresses", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "userAddress", "type": "address" }, { "name": "filmIndex", "type": "uint256" }, { "name": "numberTokenPocket", "type": "uint256" }, { "name": "numberTokenOnSell", "type": "uint256" }, { "name": "numberTokenTotal", "type": "uint256" } ], "name": "insertTokenForUser", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "userAddress", "type": "address" }, { "name": "filmIndex", "type": "uint256" }, { "name": "numberTokenPocket", "type": "uint256" }, { "name": "numberTokenOnSell", "type": "uint256" }, { "name": "numberTokenTotal", "type": "uint256" } ], "name": "updateTokenForUser", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "userAddress", "type": "address" }, { "name": "filmIndex", "type": "uint256" } ], "name": "getTokenForUser", "outputs": [ { "name": "index_userBoughtTokens", "type": "uint256" }, { "name": "filmIndex_return", "type": "uint256" }, { "name": "numberTokenPocket", "type": "uint256" }, { "name": "numberTokenOnSell", "type": "uint256" }, { "name": "numberTokenTotal", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "userIndexAddresses", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "userAddress", "type": "address" } ], "name": "getAllTokenForOneUser", "outputs": [ { "name": "userBoughtTokens", "type": "uint256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "userAddress", "type": "address" } ], "name": "insertUser", "outputs": [ { "name": "index_userIndexAddresses", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [], "name": "logTokenDistributionForUser", "type": "event" } ];

var tokenDistributionForTokenManager_address = "0x3c7d95fe492000cc763b0e3d118aefa9ce2804b8";
var tokenDistributionForTokenManager_abi = 
    [ 
    { "constant": false, "inputs": [ { "name": "filmIndex", "type": "uint256" }, { "name": "numberAllToken", "type": "uint256" } ], "name": "insertToken", "outputs": [ { "name": "index_filmIndexes", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "filmIndex", "type": "uint256" }, { "name": "userAddress", "type": "address" }, { "name": "numberToken_thisUser", "type": "uint256" } ], "name": "insertUserForToken", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "filmIndex", "type": "uint256" } ], "name": "deleteToken", "outputs": [ { "name": "index_filmIndexes", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getAllToken", "outputs": [ { "name": "allToken", "type": "uint256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "filmIndex", "type": "uint256" } ], "name": "getTokenAndAllUsers", "outputs": [ { "name": "index_filmIndexes", "type": "uint256" }, { "name": "numberAllToken", "type": "uint256" }, { "name": "boughtUserAddresses", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "filmIndex", "type": "uint256" }, { "name": "userAddress", "type": "address" } ], "name": "getUserForToken", "outputs": [ { "name": "index_boughtUserAddresses", "type": "uint256" }, { "name": "userAddress_return", "type": "address" }, { "name": "numberToken_thisUser", "type": "uint256" }, { "name": "numberAllToken", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "filmIndex", "type": "uint256" } ], "name": "getAllUserForOneToken", "outputs": [ { "name": "boughtUserAddresses", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "filmIndex", "type": "uint256" }, { "name": "userAddress", "type": "address" } ], "name": "deleteUserForToken", "outputs": [ { "name": "index_boughtUserAddresses", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "filmIndex", "type": "uint256" }, { "name": "userAddress", "type": "address" }, { "name": "numberAllToken", "type": "uint256" }, { "name": "numberToken_thisUser", "type": "uint256" } ], "name": "updateTokenAndUser", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "filmIndexes", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [], "name": "logTokenDistributionForToken", "type": "event" } ];


var userManager = web3.eth.contract(userManagerContrat_abi).at(userManagerContrat_address);
var filmManager = web3.eth.contract(filmManagerContrat_abi).at(filmManagerContrat_address);
var tokenManager = web3.eth.contract(tokenManagerContrat_abi).at(tokenManagerContrat_address);
var tokenDistributionForUserManager = web3.eth.contract(tokenDistributionForUserManager_abi).at(tokenDistributionForUserManager_address);
var tokenDistributionForTokenManager = web3.eth.contract(tokenDistributionForTokenManager_abi).at(tokenDistributionForTokenManager_address);


// console.log
// console.log("user accounts:")
// console.log(web3.eth.accounts);
console.log("user default account:")
console.log(web3.eth.defaultAccount);

// console.log("contract_userManager:");
// console.log(userManager);
// console.log("contract_filmManager:");
// console.log(filmManager);
// console.log("contract_tokenManager:");
// console.log(tokenManager);