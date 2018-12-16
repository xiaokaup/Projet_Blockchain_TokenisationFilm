// test_transactionBetween two acounts
function test_transfer(account1, account2) {
    console.log("defaultAccount_from:");
    console.log(account1);
    console.log("account2_to")
    console.log(account2);
    var message = {
        from: account1, to:account2, 
        value: web3.toWei(1, 'ether'), 
        gas: 6000000
    };
    web3.eth.sendTransaction(message, (err, res) => {
        var output = "";
        if (!err) {
            output += res;
        } else {
            output = "Error";
        }
    });
}