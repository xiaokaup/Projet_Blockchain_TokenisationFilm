



// ======================================================================
// from tokenDistributionForUserManager smartContract
function getAllTokenForOneUser(userAddress) {
	return new Promise((resolve, reject) => {
		tokenDistributionForUserManager.getAllTokenForOneUser(userAddress, (error, response) => {
			if(!error) {
				console.log("getAllTokenForOneUser("+userAddress+")_success:");
				var userBoughtTokens = [];
				for(var item in response) {
					userBoughtTokens.push(response[item].c[0]);
				}
				console.log(userBoughtTokens);
				resolve(userBoughtTokens);
			} else {
				console.log("getAllTokenForOneUser("+userAddress+")_error:");
				reject(error);
			}
		});
	});
}

function getTokenForUser(userAddress, filmIndex) {
	return new Promise((resolve, reject) => {
		tokenDistributionForUserManager.getTokenForUser(userAddress, filmIndex, (error, response) => {
			if(!error) {
				console.log("getTokenForUser("+[userAddress, filmIndex].join()+")_success:");
				var distributionUser = {
					"index_userBoutTokens": response[0].c[0], 
					"filmIndex_return": response[1].c[0], 
					"numberTokenPocket": response[2].c[0], 
					"numberTokenOnSell": response[3].c[0], 
					"numberTokenTotal": response[4].c[0], 
				};
				console.log(distributionUser);
				resolve(distributionUser);
			} else {
				console.log("getTokenForUser("+[userAddress, filmIndex].join()+")_error:");
				reject(error);
			}
		});
	});
}

function updateTokenForUser(userAddress, filmIndex, numberTokenPocket, numberTokenOnSell, numberTokenTotal) {
	return new Promise((resolve, reject) => {
		tokenDistributionForUserManager.updateTokenForUser(userAddress, filmIndex, numberTokenPocket, numberTokenOnSell, numberTokenTotal, (error, response) => {
			if(!error) {
				console.log("updateTokenForUser("+[userAddress, filmIndex, numberTokenPocket, numberTokenOnSell, numberTokenTotal].join()+")_success:");
				
				console.log(response);
				resolve(response);
			} else {
				console.log("updateTokenForUser("+[userAddress, filmIndex, numberTokenPocket, numberTokenOnSell, numberTokenTotal].join()+")_error:");
				reject(error);
			}
		});
	});
}