// ======================================================================
// example d'utiliser async/await function
async function showListOfTokenMarket(block_id, compte_investor, compte_producer) {
    // data
    var allToken = await returnListToken();
    // view
    var block = document.getElementById(block_id);
    var block_html = "";
    
    for(var item in allToken) {
        // console.log(allToken[item]);
        var oneToken = allToken[item];

        // add cards
        block_html += "<div class='col-4 py-3 mx-auto col-xl-4 col-lg-6 col-md-6 col-sm-12' style='min-width:300px;min-height:300px;'>"
        block_html += "<div class='card' style='width:100%;height:100%;'>";

        block_html += "<div class='card-body'>"; 
        block_html += "<h5>project number: <span>"+oneToken.filmIndex+"</span></h5>"; 
        block_html += "<br>"; 
        block_html += "<p>issue date: <span>"+oneToken.filmIssueDate+"</span></p>"; 
        block_html += "<p>maturity date: <span>"+oneToken.filmMaturity+"</span></p>"; 
        block_html += "<p>token number: <span>"+oneToken.tokenNumber+"</span></p>"; 
        block_html += "<p>token price: <span>"+(oneToken.tokenPrice+0.001*oneToken.tokenRecommend)+"</span></p>"; 
        block_html += "<p>token Recommend: <span>"+oneToken.tokenRecommend+"</span></p>"; 
        block_html += "</div>"; 

        block_html += "<hr>"; 

        block_html += "<form class='form-inline' style='margin-left: 10px;'><div class='form-group mb-6'><input type='number' class='form-control-plaintext' id='buyTokenNumberInput_"+oneToken.filmIndex+"' placeholder='buy token number' style='margin-bottom: 10px;'></div><button type='button' class='btn btn-primary mb-2' style='margin-left: 15px;' onclick=buyToken_button('"+compte_investor.email+"','"+compte_investor.password+"','"+compte_producer.email+"','"+oneToken.filmIndex+"','"+(oneToken.tokenPrice+0.001*oneToken.tokenRecommend)+"')>Buy</button></form>";
        block_html += "</div></div></div>";
    }

    block.innerHTML = block_html;

}

async function returnListToken() {
    var listToken = [];

    var numbertoken = await getNumberToken(); 
    console.log(numbertoken);

    for(var i =0; i < numbertoken; i++) {
        var filmIndex = await getByIndex_filmIndexes(i);
        console.log(filmIndex);
        var response = await getToken(filmIndex);
        listToken.push(response);
    }

    // console.log(listToken);
    return listToken;
}

async function buyToken_button(emailInvestor, passwordInvestor, emailProducer, filmIndex, oneTokenPrice) {
    // console.log("yang");
    // console.log(emailInvestor);
    // console.log(passwordInvestor);
    // console.log(emailProducer);
    // console.log(filmIndex);
    // console.log(oneTokenPrice);

    // var break_value = 0;
    var buyTokenNumber = Number(document.getElementById("buyTokenNumberInput_"+filmIndex).value);
    // console.log(buyTokenNumber);
    // if(buyTokenNumber < 0) break_value = 1;

    var userInvestor = await getUser(emailInvestor, passwordInvestor);
    console.log("userInvestor:");
    console.log(userInvestor);

    await buyToken(emailInvestor, passwordInvestor, emailProducer, oneTokenPrice, buyTokenNumber);

    
}

async function test() {
    await getUser("2@gmail.com", "a123");
}

test();

function buyToken_t(emailInvestor, passwordInvestor, emailProducer, filmIndex, oneTokenPrice) {
    // console.log("yang");
    // console.log(emailInvestor);
    // console.log(passwordInvestor);
    // console.log(emailProducer);
    // console.log(filmIndex);
    // console.log(oneTokenPrice);

    var break_value = 0
    var tokenNumber = Number(document.getElementById("buyTokenNumberInput_"+filmIndex).value);
    if(tokenNumber < 0) break_value = 1;

    // exist of user
    userManager.getUser(emailInvestor, passwordInvestor, function(error, result) {
        if(!error && result[3]=="investor" && break_value == 0){
            // console.log("result_getUser:"+"->");
            console.log(result);
            var addressInvestor = result[1];
            // console.log(addressInvestor);
            // console.log(oneTokenPrice*tokenNumber);

            userManager.buyToken(emailInvestor, passwordInvestor, emailProducer, oneTokenPrice, tokenNumber, {
                    "from": web3.eth.defaultAccount, 
                    'gas': 6000000
                }, function(error,result) {
                     if(!error){
                        console.log("buyToken...");
                        // console.log(result);
                        
                    } else {
                        console.log("error_buyToken:");
                        console.log(error);
                    }
                });
        } else {
            console.log("error_getUser:"+"->");
            console.log(error);
        }
    });
}     



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

                console.log(token);
                resolve(token);
            } else {
                console.log("getToken("+filmIndex+")_error:");
                reject(error);
            }
        });
    });
}




   