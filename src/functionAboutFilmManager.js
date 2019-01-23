

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

function getFilm(filmIndex) {
    return new Promise((resolve, reject) => {
        filmManager.getFilm(filmIndex, (error, response) => {
            if(!error) {
                console.log("getFilm("+filmIndex+")_success:");
                var filmInfo = 
                { 
                    "filmIndex": filmIndex, 
                    "filmName": response[0], 
                    "filmDescription": response[1], 
                    "filmImageUrl": response[2], 
                    "filmUrl": response[3], 
                    "filmPrice": response[4].c[0], 
                    "filmNumberVoir": response[5].c[0], 
                    "filmNotation": response[6].c[0], 
                                        
                };
                // console.log(response);
                resolve(filmInfo);
            } else {
                console.log("getFilm("+filmIndex+")_error:");
                reject(error);
            }
        });
    });
}

function getNextFilmIndex() {
    return new Promise((resolve, reject) => {
        filmManager.getNextFilmIndex((error, response) => {
            if(!error) {
                console.log("getNextFilmIndex()_success:");
                // console.log(response);
                resolve(response.c[0]);
            } else {
                console.log("getNextFilmIndex()_error:");
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

function updateFilm(filmIndex, filmName, filmDescription, filmImageUrl, filmUrl, filmPrice, filmNumberVoir, filmNotation, filmPublished, filmIco) {
    return new Promise((resolve, reject) => {
        filmManager.updateFilm(filmIndex, filmName, filmDescription, filmImageUrl, filmUrl, filmPrice, filmNumberVoir, filmNotation, filmPublished, filmIco, (error, response) => {
            if(!error) {
                console.log("updateFilm("+[filmIndex, filmName, filmDescription, filmImageUrl, filmUrl, filmPrice, filmNumberVoir, filmNotation, filmPublished, filmIco].join()+")_success:");
                // console.log(response);
                resolve(response);
            } else {
                console.log("updateFilm("+[filmIndex, filmName, filmDescription, filmImageUrl, filmUrl, filmPrice, filmNumberVoir, filmNotation, filmPublished, filmIco].join()+")_error:");
                reject(error);
            }
        });
    });
}



function getByIndex_filmIndexes_filmManager(index_filmIndexes) {
    return new Promise((resolve, reject) => {
        filmManager.getByIndex_filmIndexes(index_filmIndexes, (error, response) => {
            if(!error) {
                console.log("getByIndex_filmIndexes_filmManager_success("+index_filmIndexes+") -> filmIndex :");
                resolve(response.c[0]);
            } else {
                console.log("getByIndex_filmIndexes_filmManager_error("+index_filmIndexes+"):");
                reject(error);
            }
        });
    });
}
