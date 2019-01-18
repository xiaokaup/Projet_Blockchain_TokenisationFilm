
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