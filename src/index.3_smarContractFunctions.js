
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


