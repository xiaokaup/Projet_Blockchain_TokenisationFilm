
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


async function getList_email_and_address() {
    // console.log("yang");
    // console.log(userAddress);
    var list_email_and_address = [];

    var userNumber = await getNumberUser();
    for(i=0; i<userNumber; i++) {
        var userEmail = await getByIndex_userIndexEmails(i);
        // console.log(userEmail);
        var userAddress = await getUserAddressBy_userEmail(userEmail);
        // console.log(userAddress);
        
        list_email_and_address.push({
            "userEmail": userEmail, 
            "userAddress": userAddress, 
        });
    }

    return list_email_and_address;
}



