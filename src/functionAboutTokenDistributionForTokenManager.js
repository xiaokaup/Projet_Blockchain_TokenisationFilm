


// ======================================================================
// from About TokenDistributionForTokenManager smartContract

function getTokenAndAllUsers(filmIndex) {
    return new Promise((resolve, reject) => {
        tokenDistributionForTokenManager.getTokenAndAllUsers(filmIndex, (error, response) => {
            if(!error) {
                console.log("getTokenAndAllUsers("+[filmIndex].join()+")_success:")
                var distributionForThisToken = {
                	"index_filmIndexes": response[0].c[0], 
                	// "numberAllToken": response[1].c[0], 
                	"BoughtUserAddresses": response[2], 
                }
                // console.log(distributionForThisToken);
                resolve(distributionForThisToken);
            } else {
                console.log("getTokenAndAllUsers("+[filmIndex].join()+")_error:")
                reject(error);
            }
        });
    });
}

function getUserForToken(filmIndex, userAddress) {
	return new Promise((resolve, reject) => {
        tokenDistributionForTokenManager.getUserForToken(filmIndex, userAddress, (error, response) => {
            if(!error) {
                console.log("getUserForToken("+[filmIndex, userAddress].join()+")_success:")
                var distributionForThisUserThisToken = {
                	"userAddress": userAddress, 
                	"filmIndex": filmIndex,
                	"index_boughtUserAddresses": response[0].c[0], 
                	"numberToken_thisUser": response[2].c[0], 
                	// "numberAllToken": response[3].c[0], 
                }
                // console.log(distributionForThisUserThisToken);
                resolve(distributionForThisUserThisToken);
            } else {
                console.log("getUserForToken("+[filmIndex, userAddress].join()+")_error:")
                reject(error);
            }
        });
    });
}

function updateTokenAndUser(filmIndex, userAddress, numberAllToken, numberToken_thisUser) {
	return new Promise((resolve, reject) => {
        tokenDistributionForTokenManager.updateTokenAndUser(filmIndex, userAddress, numberAllToken, numberToken_thisUser, (error, response) => {
            if(!error) {
                console.log("updateTokenAndUser("+[filmIndex, userAddress, numberAllToken, numberToken_thisUser].join()+")_success:")
                // console.log(distributionForThisUserThisToken);
                resolve(response);
            } else {
                console.log("updateTokenAndUser("+[filmIndex, userAddress, numberAllToken, numberToken_thisUser].join()+")_error:")
                reject(error);
            }
        });
    });
}




async function test() {
	var t = await getUserForToken(4, await getUserAddressBy_userEmail("3@gmail.com"));
	console.log(t);
	console.log(await getToken(4));
	// var a = await updateTokenAndUser(4, t.userAddress_return, (await getToken(4)).tokenNumber, t.numberToken_thisUser)
	// console.log(a);
}
// test();

