



// ======================================================================
// from smartContract
function getNumberToken() {
    return new Promise((resolve, reject) => {
        tokenManager.getNumberToken((error,response) => {
            if(!error){
                console.log("getNumberToken_success -> numberToken :");
                resolve(response.c[0]);
            } else {     
                console.log("getNumberToken_error:");
                reject(error);
            }
        });
    });
}

function getByIndex_filmIndexes(index_filmIndexes) {
    return new Promise((resolve, reject) => {
        tokenManager.getByIndex_filmIndexes(index_filmIndexes, (error, response) => {
            if(!error) {
                console.log("getByIndex_filmIndexes_success("+index_filmIndexes+") -> filmIndex :");
                resolve(response.c[0]);
            } else {
                console.log("getByIndex_filmIndexes_error("+index_filmIndexes+"):");
                reject(error);
            }
        });
    });
}

function getToken(filmIndex) {
    return new Promise((resolve, reject) => {
        tokenManager.getToken(filmIndex, (error, response) => {
            if(!error) {
                console.log("getToken("+filmIndex+")_success:");
                var token = 
                { 
                    "index_filmIndexes": response[0].c[0], 
                    "filmIndex": filmIndex, 
                    "filmBudget": response[1].c[0], 
                    "filmIssueDate": new Date(response[2].c[0]).toLocaleDateString(), 
                    "filmMaturity": new Date(response[3].c[0]).toLocaleDateString(), 
                    "tokenPrice": response[4].c[0], 
                    "tokenNumber": response[5].c[0], 
                    "tokenRecommend": response[6].c[0], 
                };

                // console.log(token);
                resolve(token);
            } else {
                console.log("getToken("+filmIndex+")_error:");
                reject(error);
            }
        });
    });
}



function deleteToken_TokenManager(filmIndex) {
    return new Promise((resolve, reject) => {
        tokenManager.deleteToken(filmIndex, (error, response) => {
            if(!error) {
                console.log("deleteToken_TokenManager("+[filmIndex].join()+")_success:")
                // console.log(distributionForThisUserThisToken);
                resolve(response);
            } else {
                console.log("deleteToken_TokenManager("+[filmIndex].join()+")_error:")
                reject(error);
            }
        });
    });
}


   