
// userManager

function getSession() {
    user = JSON.parse(sessionStorage.getItem("user"));
    return user;

}
function profil(userManager) {
    
    email= getSession().email;
    mdp = getSession().password;
    userManager.getUser(email, mdp, function (error, result) {
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
            console.log(result[4].c[0]);
            console.log(result[2]);
        } else {
            console.log("error_getbsolde:");
            console.log(error);
        }

        //var resultat = result;
        //document.getElementById(balance).innerHTML = resultat; 
    });
}


function profil_username(userManager) {

    email = getSession().email;
    mdp = getSession().password;
    userManager.getUser(email, mdp, function (error, result) {
        if (!error) {
            var userAddress_return = result;
            var nom = result[2];
            document.getElementById('username').innerHTML = nom;
       
            console.log(result[2]);
        } else {
            console.log("error_getbsolde:");
            console.log(error);
        }
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

