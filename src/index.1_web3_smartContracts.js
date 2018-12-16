// web3 provider
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    // eth = new Eth(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/76ba8681b14b4f1bac44c41e5e0e843a"));
    // eth = new Eth(web3.currentProvider);
}

web3.eth.defaultAccount = web3.eth.accounts[0];


// prepare smartContracts
var userManagerContrat_address = "0xb6eb46928be50e15bcc4ece94d87a187d959fb56";
var userManagerContrat_abi = 
    [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "name": "userPassword",
                    "type": "string"
                },
                {
                    "name": "userAddressProducer",
                    "type": "address"
                },
                {
                    "name": "filmIndex",
                    "type": "uint256"
                },
                {
                    "name": "filmPrice",
                    "type": "uint256"
                }
            ],
            "name": "buyFilm",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "name": "userPassword",
                    "type": "string"
                },
                {
                    "name": "userName",
                    "type": "string"
                },
                {
                    "name": "userIdentity",
                    "type": "string"
                },
                {
                    "name": "userBalance",
                    "type": "uint256"
                }
            ],
            "name": "insertUser",
            "outputs": [
                {
                    "name": "index_userIndexAddresses",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "name": "userPassword",
                    "type": "string"
                },
                {
                    "name": "userName",
                    "type": "string"
                },
                {
                    "name": "userIdentity",
                    "type": "string"
                },
                {
                    "name": "userBalance",
                    "type": "uint256"
                }
            ],
            "name": "updateUser",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "name": "userPassword",
                    "type": "string"
                }
            ],
            "name": "deleteUser",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "index_userIndexAddresses",
                    "type": "uint256"
                }
            ],
            "name": "getByIndex_userIndexAddresses",
            "outputs": [
                {
                    "name": "userAddress",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupplyEthereum",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "name": "userOldPassword",
                    "type": "string"
                },
                {
                    "name": "userNewPassword",
                    "type": "string"
                }
            ],
            "name": "updateUserPassword",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "name": "userPassword",
                    "type": "string"
                }
            ],
            "name": "getUser",
            "outputs": [
                {
                    "name": "index_userIndexAddresses",
                    "type": "uint256"
                },
                {
                    "name": "userName",
                    "type": "string"
                },
                {
                    "name": "userIdentity",
                    "type": "string"
                },
                {
                    "name": "userBalance",
                    "type": "uint256"
                },
                {
                    "name": "userBoughtFilm",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getNumberUser",
            "outputs": [
                {
                    "name": "numberUser",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "function_call",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "userIndex",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "userName",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "userIdentity",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "userBalance",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "userBoughtFilm",
                    "type": "uint256[]"
                }
            ],
            "name": "logUser",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "function_call",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "success",
                    "type": "bool"
                }
            ],
            "name": "operationUser",
            "type": "event"
        }
    ];

var filmManagerContrat_address = "0xc6703cbe713e1651f099afd70a76f6ca1b26265e";
var filmManagerContrat_abi = 
    [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "filmIndex",
                    "type": "uint256"
                }
            ],
            "name": "deleteFilm",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "filmName",
                    "type": "string"
                },
                {
                    "name": "filmDescription",
                    "type": "string"
                },
                {
                    "name": "filmImageUrl",
                    "type": "string"
                },
                {
                    "name": "filmUrl",
                    "type": "string"
                },
                {
                    "name": "filmPrice",
                    "type": "uint256"
                },
                {
                    "name": "filmNumberVoir",
                    "type": "uint256"
                },
                {
                    "name": "filmNotation",
                    "type": "uint256"
                },
                {
                    "name": "filmPublished",
                    "type": "bool"
                },
                {
                    "name": "filmIco",
                    "type": "bool"
                },
                {
                    "name": "userAddressProducer",
                    "type": "address"
                }
            ],
            "name": "insertFilm",
            "outputs": [
                {
                    "name": "index_filmIndexes",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "filmIndex",
                    "type": "uint256"
                },
                {
                    "name": "filmName",
                    "type": "string"
                },
                {
                    "name": "filmDescription",
                    "type": "string"
                },
                {
                    "name": "filmImageUrl",
                    "type": "string"
                },
                {
                    "name": "filmUrl",
                    "type": "string"
                },
                {
                    "name": "filmPrice",
                    "type": "uint256"
                },
                {
                    "name": "filmNumberVoir",
                    "type": "uint256"
                },
                {
                    "name": "filmNotation",
                    "type": "uint256"
                },
                {
                    "name": "filmPublished",
                    "type": "bool"
                },
                {
                    "name": "filmIco",
                    "type": "bool"
                }
            ],
            "name": "updateFilm",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "function_call",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "filmIndex",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "filmName",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "filmDescription",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "filmImageUrl",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "filmUrl",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "filmPrice",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "filmNumberVoir",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "filmNotation",
                    "type": "uint256"
                }
            ],
            "name": "logFilm",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "function_call",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "filmIndex",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "filmPublished",
                    "type": "bool"
                },
                {
                    "indexed": false,
                    "name": "filmIco",
                    "type": "bool"
                },
                {
                    "indexed": false,
                    "name": "userAddressProducer",
                    "type": "address"
                }
            ],
            "name": "logFilm_published_ico_producer",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "function_call",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "success",
                    "type": "bool"
                }
            ],
            "name": "operationFilm",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "index_filmIndexes",
                    "type": "uint256"
                }
            ],
            "name": "getByIndex_filmIndexes",
            "outputs": [
                {
                    "name": "filmIndex",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "filmIndex",
                    "type": "uint256"
                }
            ],
            "name": "getFilm",
            "outputs": [
                {
                    "name": "filmName",
                    "type": "string"
                },
                {
                    "name": "filmDescription",
                    "type": "string"
                },
                {
                    "name": "filmImageUrl",
                    "type": "string"
                },
                {
                    "name": "filmUrl",
                    "type": "string"
                },
                {
                    "name": "filmPrice",
                    "type": "uint256"
                },
                {
                    "name": "filmNumberVoir",
                    "type": "uint256"
                },
                {
                    "name": "filmNotation",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "filmIndex",
                    "type": "uint256"
                }
            ],
            "name": "getFilmInfo_published_ico_producer",
            "outputs": [
                {
                    "name": "index_filmIndexes",
                    "type": "uint256"
                },
                {
                    "name": "filmPublished",
                    "type": "bool"
                },
                {
                    "name": "filmIco",
                    "type": "bool"
                },
                {
                    "name": "userAddressProducer",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getNumberFilm",
            "outputs": [
                {
                    "name": "numberFilm",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

var tokenManagerContrat_address = "0xed2092469de550a83d17dc723588be1c4e6e8a66";
var tokenManagerContrat_abi = 
    [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "filmIndex",
                    "type": "uint256"
                },
                {
                    "name": "filmBudget",
                    "type": "uint256"
                },
                {
                    "name": "filmMaturity",
                    "type": "uint256"
                },
                {
                    "name": "tokenPrice",
                    "type": "uint256"
                },
                {
                    "name": "tokenNumber",
                    "type": "uint256"
                }
            ],
            "name": "updateToken",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "filmIndex",
                    "type": "uint256"
                },
                {
                    "name": "filmBudget",
                    "type": "uint256"
                },
                {
                    "name": "filmMaturity",
                    "type": "uint256"
                },
                {
                    "name": "tokenPrice",
                    "type": "uint256"
                },
                {
                    "name": "tokenNumber",
                    "type": "uint256"
                },
                {
                    "name": "tokenRecommend",
                    "type": "int256"
                }
            ],
            "name": "insertToken",
            "outputs": [
                {
                    "name": "index_filmIndexes",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "filmIndex",
                    "type": "uint256"
                }
            ],
            "name": "minusOneTokenRecommend",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "filmIndex",
                    "type": "uint256"
                }
            ],
            "name": "deleteToken",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getNumberToken",
            "outputs": [
                {
                    "name": "numberToken",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "filmIndex",
                    "type": "uint256"
                }
            ],
            "name": "addOneTokenRecommend",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "index_filmIndexes",
                    "type": "uint256"
                }
            ],
            "name": "getByIndex_filmIndexes",
            "outputs": [
                {
                    "name": "filmIndex",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "filmIndex",
                    "type": "uint256"
                }
            ],
            "name": "getToken",
            "outputs": [
                {
                    "name": "index_filmIndexes",
                    "type": "uint256"
                },
                {
                    "name": "filmBudget",
                    "type": "uint256"
                },
                {
                    "name": "filmMaturity",
                    "type": "uint256"
                },
                {
                    "name": "tokenPrice",
                    "type": "uint256"
                },
                {
                    "name": "tokenNumber",
                    "type": "uint256"
                },
                {
                    "name": "tokenRecommend",
                    "type": "int256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "filmIndex",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "filmBudget",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "filmMaturity",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "tokenPrice",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "tokenNumber",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "tokenRecommend",
                    "type": "int256"
                }
            ],
            "name": "logToken",
            "type": "event"
        }
    ];

var userManager = web3.eth.contract(userManagerContrat_abi).at(userManagerContrat_address);
var filmManager = web3.eth.contract(filmManagerContrat_abi).at(filmManagerContrat_address);
var tokenManager = web3.eth.contract(tokenManagerContrat_abi).at(tokenManagerContrat_address);


// console.log
// console.log("user accounts:")
// console.log(web3.eth.accounts);
// console.log("user default account:")
// console.log(web3.eth.defaultAccount);

// console.log("contract_userManager:");
// console.log(userManager);
// console.log("contract_filmManager:");
// console.log(filmManager);
// console.log("contract_tokenManager:");
// console.log(tokenManager);