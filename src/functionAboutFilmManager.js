

// ======================================================================
// from smartContract
function getNumberFilm() {
    return new Promise((resolve, reject) => {
        filmManager.getNumberFilm((error,response) => {
            if(!error){
                console.log("getNumberFilm_success -> numberFilm :");
                resolve(response.c[0]);
            } else {     
                console.log("getNumberFilm_error:");
                reject(error);
            }
        });
    });
}

function getByIndex_filmIndexes_forProducer_ICO(index_filmIndexes) {
    return new Promise((resolve, reject) => {
        filmManager.getByIndex_filmIndexes(index_filmIndexes, (error, response) => {
            if(!error) {
                console.log("getByIndex_filmIndexes_forProducer_success("+index_filmIndexes+") -> filmIndex :");
                resolve(response.c[0]);
            } else {
                console.log("getByIndex_filmIndexes_forProducer_error("+index_filmIndexes+"):");
                reject(error);
            }
        });
    });
}


function getFilmInfo_published_ico_producer(filmIndex) {
    return new Promise((resolve, reject) => {
        filmManager.getFilmInfo_published_ico_producer(filmIndex, (error, response) => {
            if(!error) {
                console.log("getFilmInfo_published_ico_producer("+filmIndex+")_success:");
                var film_ICO = 
                { 
                	"filmIndex": filmIndex, 
                    "index_filmIndexes": response[0].c[0], 
                    "filmPublished": response[1], 
                    "filmIco": response[2], 
                    "userAddressProducer": response[3], 
                };

                resolve(film_ICO);
            } else {
                console.log("getFilmInfo_published_ico_producer("+filmIndex+")_error:");
                reject(error);
            }
        });
    });
}
