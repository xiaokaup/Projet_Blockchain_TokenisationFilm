
// ======================================================================
// from About userManager smartContract
function getNumberUser() {
    return new Promise((resolve, reject) => {
        userManager.getNumberUser((error,response) => {
            if(!error){
                console.log("getNumberUser_success -> numberToken :");
                resolve(response.c[0]);
            } else {     
                console.log("getNumberUser_error:");
                reject(error);
            }
        });
    });
}


function getUser(userEmail, userPassword) {
    return new Promise((resolve, reject) => {
        userManager.getUser(userEmail, userPassword, (error, response) => {
            if(!error) {
                console.log("getUser("+userEmail+")_success:");
                var user = 
                { 
                    "userEmail": userEmail, 
                    "index_userIndexEmails": response[0].c[0], 
                    "userAddress": response[1], 
                    "userName": response[2], 
                    "userIdentity": response[3], 
                    "userBalance": response[4].c[0], 
                    "userBoughtFilm": response[5], 
                };

                // console.log(user);
                resolve(user);
            } else {
                console.log("getUser("+userEmail+")_error:");
                reject(error);
            }
        });
    });
}

function updateUser(userEmail, userPassword, userAddress, userName, userIdentity, userBalance) {
    return new Promise((resolve, reject) => {
        userManager.updateUser(userEmail, userPassword, userAddress, userName, userIdentity, userBalance, (error, response) => {
            if(!error) {
                console.log("updateUser("+[userEmail, userPassword, userAddress, userName, userIdentity, userBalance].join()+")_success:");

                resolve(response);
            } else {
                console.log("updateUser("+[userEmail, userPassword, userAddress, userName, userIdentity, userBalance].join()+")_error:");
                reject(error);
            }
        });
    });
}

function getByIndex_userIndexEmails(index_userIndexEmails) {
    return new Promise((resolve, reject) => {
        userManager.getByIndex_userIndexEmails(index_userIndexEmails, (error, response) => {
            if(!error) {
                console.log("getByIndex_userIndexEmails("+[index_userIndexEmails].join()+")_success:")
                // console.log(response);
                resolve(response);
            } else {
                console.log("getByIndex_userIndexEmails("+[index_userIndexEmails].join()+")_error:")
                reject(error);
            }
        });
    });
}

function getUserAddressBy_userEmail(userEmail) {
    return new Promise((resolve, reject) => {
        userManager.getUserAddressBy_userEmail(userEmail, (error, response) => {
            if(!error) {
                console.log("getUserAddressBy_userEmail("+[userEmail].join()+")_success:")
                // console.log(response);
                resolve(response);
            } else {
                console.log("getUserAddressBy_userEmail("+[userEmail].join()+")_error:")
                reject(error);
            }
        });
    });
}

function buyFilm(userEmail, userPassword, userEmailProducer, filmIndex, filmPrice) {
    return new Promise((resolve, reject) => {
        userManager.buyFilm(userEmail, userPassword, userEmailProducer, filmIndex, filmPrice, (error, response) => {
            if(!error) {
                console.log("buyFilm("+[userEmail, userPassword, userEmailProducer, filmIndex, filmPrice].join()+")_success:")
                // console.log(response);
                resolve(response);
            } else {
                console.log("buyFilm("+[userEmail, userPassword, userEmailProducer, filmIndex, filmPrice].join()+")_error:")
                reject(error);
            }
        });
    });
}


function buyToken(userEmail, userPassword, userEmailProducer, tokenPrice, buyTokenNumber) {
    return new Promise((resolve, reject) => {
        userManager.buyToken(userEmail, userPassword, userEmailProducer, tokenPrice, buyTokenNumber, (error, response) => {
            if(!error) {
                console.log("buyToken("+[userEmail, userPassword, userEmailProducer, tokenPrice, buyTokenNumber].join()+")_success:")
                // console.log(response);
                resolve(response);
            } else {
                console.log("buyToken("+[userEmail, userPassword, userEmailProducer, tokenPrice, buyTokenNumber].join()+")_error:")
                reject(error);
            }
        });
    });
}

function finishToken(userEmailProducer, userPassword, userEmailInvestor, amountTokens) {
    return new Promise((resolve, reject) => {
        userManager.finishToken(userEmailProducer, userPassword, userEmailInvestor, amountTokens, (error, response) => {
            if(!error) {
                console.log("finishToken("+[userEmailProducer, userPassword, userEmailInvestor, amountTokens].join()+")_success:")
                // console.log(response);
                resolve(response);
            } else {
                console.log("finishToken("+[userEmailProducer, userPassword, userEmailInvestor, amountTokens].join()+")_error:")
                reject(error);
            }
        });
    });
}
