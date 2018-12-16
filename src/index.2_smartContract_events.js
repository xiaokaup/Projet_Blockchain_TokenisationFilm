// watch events returned by smartContract


// userEvents
var logUserEvent = userManager.logUser();
logUserEvent.watch(
    function(error, result){
        console.log("*********************************************");
        if (!error) {
            console.log("logUserEvent:");
            console.log(result);
            console.log(result.args);
            console.log("\n");
        } else {
            console.log("error_logUserEvent:");
            console.log(error);
        }
    });

var operationUserEvent = userManager.operationUser();
operationUserEvent.watch(
    function(error, result){
        console.log("*********************************************");
        if (!error) {

                console.log("operationUserEvent:");
                console.log(result);

                console.log(result.args);
                console.log("\n");
        } else {
                console.log("error_operationUserEvent:");
                console.log(error);
        }
    });




// filmEvents
var logFilmEvent = filmManager.logFilm();
logFilmEvent.watch(
    function(error, result){
        console.log("*********************************************");
        if (!error) {
            console.log("logFilmEvent:");
            console.log(result);
            console.log(result.args);
            console.log("\n");
        } else {
            console.log("error_logFilmEvent:");
            console.log(error);
        }
    }
);

var logFilm_published_ico_producer_Event = filmManager.logFilm_published_ico_producer();
logFilm_published_ico_producer_Event.watch(
    function(error, result){
        console.log("*********************************************");
        if (!error) {
            console.log("logFilm_published_ico_producer_Event:");
            console.log(result);
            console.log(result.args);
            console.log("\n");
        } else {
            console.log("error_logFilm_published_ico_producer_Event:");
            console.log(error);
        }
    }
);

var operationFilmEvent = filmManager.operationFilm();
operationFilmEvent.watch(
    function(error, result){
        console.log("*********************************************");
        if (!error) {

                console.log("operationFilmEvent:");
                console.log(result);
                console.log(result.args);
                console.log("\n");
        } else {
                console.log("error_operationFilmEvent:");
                console.log(error);
        }
    });