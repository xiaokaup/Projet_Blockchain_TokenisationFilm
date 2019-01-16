
// userManager
function profil(userManager) {
    userManager.getUser("2@gmail.com", "a123", function (error, result) {
        if (!error) {
            var userAddress_return = result;
            var balance = result[4].c[0];
            var nom = result[2];
            var identite = result[3];
           document.getElementById('solde').innerHTML = balance + " " + "eth";
            document.getElementById('username').innerHTML = nom;
            document.getElementById('identity').innerHTML = identite;

            console.log("SOLDE:");
            console.log(result);
            console.log(result[3].c[0]);
            console.log(result[1]);
        } else {
            console.log("error_getbsolde:");
            console.log(error);
        }

        //var resultat = result;
        //document.getElementById(balance).innerHTML = resultat; 
    });
   

}


function test_userManager(userManager) {
    userManager.getNumberUser(function(error,result) {
        console.log("numberUser:");
        console.log(result.c[0]);

        userManager.getByIndex_userIndexEmails(Math.round(Math.random()*(result.c[0]-1)), function(error,result){
            if(!error){
                var userEmail_return = result;
                console.log("userEmail_return:"+userEmail_return);
            } else {
                console.log("error_getByIndex_userIndexEmails:");
                console.log(error);
            }
            
            console.log("---------------------------------------");

            userManager.getUser(userEmail_return, "a123", function(error, result) {
                if(!error){
                    console.log("result_getUser:"+userEmail_return+"->");
                    console.log(result);
                } else {
                    console.log("error_getUser:"+userEmail_return+"->");
                    console.log(error);
                }
            });
        });
    });        
}
function test_insertUser(userManager) {
    userManager.insertUser("1.3@gmail.com","a123", "0x4b0897b0513fdc7c541b6d9d7e929c4e5364d200","test_name","customer","50", 
        {
            "from": web3.eth.defaultAccount, 
            'gas': 6000000
        }, function(error, result) {
            if(!error){
                console.log("insertUser:");
                console.log(result);
            } else {
                console.log("error_insertUser:");
                console.log(error);
            }
        });
}
function test_deleteUser(userManager) {
    userManager.deleteUser("1.3@gmail.com","a123", 
        {
            "from": web3.eth.defaultAccount, 
            'gas': 6000000
        }
        ,
        function(error, result) {
            if(!error){
                    console.log("deleteUser:");
                    console.log(result);
                } else {
                    console.log("error_deleteUser:");
                    console.log(error);
                }
        });
}


// ===========================================================================


// filmManager
function test_filmManager(filmManager) {
    filmManager.getNumberFilm(function(error, result) {
        console.log("numberFilm:");
        console.log(result.c[0]);

        filmManager.getByIndex_filmIndexes(Math.round(Math.random()*(result.c[0]-1)), function(error,result){
            if(!error){
                var filmIndex_return = result;
                console.log("filmIndex_return:"+filmIndex_return);
            } else {
                console.log("error_getByIndex_filmIndexes:");
                console.log(error);
            }

            filmManager.getFilm(filmIndex_return, function(error, result) {
                if(!error){
                    console.log("result_getFilm:"+filmIndex_return+"->");
                    console.log(result);
                } else {
                    console.log("error_getFilm:"+filmIndex_return+"->");
                    console.log(error);
                }

                filmManager.getFilmInfo_published_ico_producer(filmIndex_return, function(error, result) {
                    if(!error){
                        console.log("result_getFilmInfo_published_ico_producer:"+filmIndex_return+"->");
                        console.log(result);
                    } else {
                        console.log("error_getFilmInfo_published_ico_producer:"+filmIndex_return+"->");
                        console.log(error);
                    }
                });
            });
        });
    });
}
function test_insertFilm(filmManager) {
    filmManager.insertFilm("film_6", "filmDescription_6", "imageUrl.com_6", "url.com_6", 15, 0, 0, true, false, "0x583031d1113ad414f02576bd6afabfb302140225",
        {
            "from": web3.eth.defaultAccount, 
            'gas': 6000000
        }, function(error, result) {
            if(!error){
                    console.log("insertFilm:");
                    console.log(result);
                } else {
                    console.log("error_insertFilm:");
                    console.log(error);
                }
        });
}
function test_deleteFilm(filmManager, index_filmIndexes) {
    filmManager.getByIndex_filmIndexes(index_filmIndexes, function(error, result) {
        if(!error){
            console.log("delete FilmIndex:");
            console.log(result.c[0]);
            
            filmManager.deleteFilm(result.c[0], 
            {
                "from": web3.eth.defaultAccount, 
                'gas': 6000000
            }, function(error, result) {
                if(!error){
                        console.log("deleteFilm:");
                        console.log(result);
                    } else {
                        console.log("error_deleteFilm:");
                        console.log(error);
                    }
            });

        } else {
            console.log("error_deleteFilm:");
            console.log(error);
        }
    });
    // 
}



// ===========================================================================



function test_tokenManager(tokenManager) {
    tokenManager.getNumberToken(function(error,result) {
        console.log("numberToken:");
        console.log(result.c[0]);

        tokenManager.getByIndex_filmIndexes(Math.round(Math.random()*(result.c[0]-1)), function(error,result){
            if(!error){
                var filmIndex_return = result;
                console.log("filmIndex_return:"+filmIndex_return);
            } else {
                console.log("error_getByIndex_filmIndexes:");
                console.log(error);
            }

            tokenManager.getToken(filmIndex_return, function(error, result) {
                if(!error){
                    console.log("result_getToken:"+filmIndex_return+"->");
                    console.log(result);
                } else {
                    console.log("error_getToken:"+filmIndex_return+"->");
                    console.log(error);
                }
            });
        });
    });
}


// views/investment.html
function showListOfTokenMarket(block_id) {
            tokenManager.getNumberToken(function(error,result) {
                console.log("numberToken:");
                console.log(result.c[0]);

                var tokenLength = Number(result.c[0]);
                // view
                var block = document.getElementById(block_id);
                var block_html = "";

                for(var i =0; i < tokenLength; i++) {
                    tokenManager.getByIndex_filmIndexes(i, function(error,result){
                        if(!error){
                            var filmIndex_return = result;
                            // console.log("filmIndex_return:"+filmIndex_return);

                            tokenManager.getToken(filmIndex_return, function(error, result) {
                                if(!error){
                                    // console.log("result_getToken:"+filmIndex_return+"->");
                                    // console.log(result);

                                    infoToken = { 
                                        "index_filmIndexes": result[0].c[0], 
                                        "filmIndex": filmIndex_return.c[0], 
                                        "filmBudget": result[1].c[0], 
                                        "filmIssueDate": result[2].c[0], 
                                        "filmMaturity": result[3].c[0],
                                        "tokenPrice": result[4].c[0],
                                        "tokenNumber": result[5].c[0], 
                                        "tokenRecommend": result[6].c[0]
                                    };

                                    // add cards
                                    block_html += "<div class='col-4 py-3 mx-auto col-xl-4 col-lg-6 col-md-6 col-sm-12' style='min-width:300px;min-height:300px;'>"
                                    block_html += "<div class='card' style='width:100%;height:100%;'>";

                                    block_html += "<div class='card-body'>"; 
                                    block_html += "<h5>project number: <span>"+infoToken.filmIndex+"</span></h5>"; 
                                    block_html += "<br>"; 
                                    block_html += "<p>issue date: <span>"+ new Date(infoToken.filmIssueDate).toLocaleDateString() +"</span></p>"; 
                                    block_html += "<p>maturity date: <span>"+new Date(infoToken.filmMaturity).toLocaleDateString()+"</span></p>"; 
                                    block_html += "<p>token number: <span>"+infoToken.tokenNumber+"</span></p>"; 
                                    block_html += "<p>token price: <span>"+(infoToken.tokenPrice+0.001*infoToken.tokenRecommend)+"</span></p>"; 
                                    block_html += "<p>token Recommend: <span>"+infoToken.tokenRecommend+"</span></p>"; 
                                    block_html += "</div>"; 

                                    block_html += "<hr>"; 

                                    block_html += "<form class='form-inline' style='margin-left: 10px;'><div class='form-group mb-6'><input type='number' class='form-control-plaintext' id='buyTokenNumberInput_"+infoToken.filmIndex+"' placeholder='buy token number' style='margin-bottom: 10px;'></div><button type='button' class='btn btn-primary mb-2' style='margin-left: 15px;' onclick=buyToken('"+compte_investor.email+"','"+compte_investor.password+"','"+compte_producer.email+"','"+infoToken.filmIndex+"','"+(infoToken.tokenPrice+0.001*infoToken.tokenRecommend)+"')>Buy</button></form>";
                                    block_html += "</div></div></div>";

                                    // if((i+1)%3 == 0) {
                                    //     block_html += "</div><div class='row'>"; // 3 cards form 1 row
                                    // }

                                    
                                    // block_html += "</div>";
                                    block.innerHTML = block_html
                                    

                                } else {
                                    console.log("error_getToken:"+filmIndex_return+"->");
                                    console.log(error);
                                }
                            });

                        } else {
                            console.log("error_getByIndex_filmIndexes:");
                            console.log(error);
                        }

                    });
                }
            });
}

function buyToken(emailInvestor, passwordInvestor, emailProducer, filmIndex, oneTokenPrice) {
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