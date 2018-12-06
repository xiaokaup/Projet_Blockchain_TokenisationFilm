pragma solidity ^0.4.18;

contract FilmManager {
    struct FilmStruct {
        uint filmIndex;
        string filmName;
        string filmDescription;
        string filmImageUrl;
        string filmUrl; // droit de diffusion
        uint filmPrice;
        uint filmNumberVoir;
        uint filmNotation;
        bool filmPublished;
        bool filmIco;
        address userAddressProducer;
    }
    
    event logFilm(
        uint filmIndex,
        string filmName,
        string filmDescription,
        string filmImageUrl,
        string filmUrl, // droit de diffusion
        uint filmPrice,
        uint filmNumberVoir,
        uint filmNotation,
        bool filmPublished,
        bool filmIco,
        address userAddressProducer
    );
    
    mapping(uint => FilmStruct) public filmStructs;
    uint[] public filmIndexAddresses;
    uint count;
    
    /* Constructor */
    // function FilmManager() public {
        
    // }

    // verify the existence of film
    function isFilm(uint filmIndex) public constant returns(bool isIndeed) {
        if(filmIndexAddresses.length == 0) return false;
        return (filmIndexAddresses[filmStructs[filmIndex].filmIndex] == filmIndex);
    }

    function insertFilm(string filmName, string filmDescription, string filmImageUrl,
        string filmUrl, uint filmPrice, uint filmNumberVoir, uint filmNotation, 
        bool filmPublished, bool filmIco, address userAddressProducer) 
    public returns(uint index_filmIndexAddresses) {
        var filmIndex = count;
        count ++;
        if(isFilm(filmIndex)) revert(); 

        filmStructs[filmIndex].filmIndex = filmIndexAddresses.push(filmIndex) - 1;
        filmStructs[filmIndex].filmName = filmName;
        filmStructs[filmIndex].filmDescription = filmDescription;
        filmStructs[filmIndex].filmImageUrl = filmImageUrl;
        filmStructs[filmIndex].filmUrl = filmUrl;
        filmStructs[filmIndex].filmPrice = filmPrice;
        filmStructs[filmIndex].filmNumberVoir = filmNumberVoir;
        filmStructs[filmIndex].filmNotation = filmNotation;
        filmStructs[filmIndex].filmPublished = filmPublished;
        filmStructs[filmIndex].filmIco = filmIco;
        filmStructs[filmIndex].userAddressProducer = userAddressProducer;


        logFilm(filmStructs[filmIndex].filmIndex, filmName, filmDescription, 
            filmImageUrl, filmUrl, filmPrice, filmNumberVoir, filmNotation, 
            filmPublished, filmIco, userAddressProducer);
        return filmIndexAddresses.length-1;
    }

    function getFilm(uint filmIndex) public constant returns(
        string filmName, string filmDescription, string filmImageUrl, 
        string filmUrl, uint filmPrice, uint filmNumberVoir, uint filmNotation) {
        if(!isFilm(filmIndex)) revert();
        return(
            filmStructs[filmIndex].filmName,
            filmStructs[filmIndex].filmDescription,
            filmStructs[filmIndex].filmImageUrl,
            filmStructs[filmIndex].filmUrl,
            filmStructs[filmIndex].filmPrice,
            filmStructs[filmIndex].filmNumberVoir,
            filmStructs[filmIndex].filmNotation
        );
    }

    function getFilmInfo_published_ico_producer(uint filmIndex) public constant returns(
        bool filmPublished, bool filmIco, address userAddressProducer) {
        if(!isFilm(filmIndex)) revert();
        return(
            filmStructs[filmIndex].filmPublished,
            filmStructs[filmIndex].filmIco,
            filmStructs[filmIndex].userAddressProducer
        );
    }


    function updateFilm(uint filmIndex, string filmName, string filmDescription, 
        string filmImageUrl, string filmUrl, uint filmPrice, uint filmNumberVoir, 
        uint filmNotation, bool filmPublished, bool filmIco) public returns(bool success) {
        if(!isFilm(filmIndex)) revert();

        filmStructs[filmIndex].filmName = filmName;
        filmStructs[filmIndex].filmDescription = filmDescription;
        filmStructs[filmIndex].filmImageUrl = filmImageUrl;
        filmStructs[filmIndex].filmUrl = filmUrl;
        filmStructs[filmIndex].filmPrice = filmPrice;
        filmStructs[filmIndex].filmNumberVoir = filmNumberVoir;
        filmStructs[filmIndex].filmNotation = filmNotation;
        filmStructs[filmIndex].filmPublished = filmPublished;
        filmStructs[filmIndex].filmIco = filmIco;

        logFilm(filmStructs[filmIndex].filmIndex, filmName, filmDescription, 
            filmImageUrl, filmUrl, filmPrice, filmNumberVoir, filmNotation, 
            filmPublished, filmIco, address(0));
        return true;
    }

    function deleteFilm(uint filmIndex) public returns(uint delete_index_filmIndexAddresses) {
        if(!isFilm(filmIndex)) revert();

        uint rowToDelete = filmStructs[filmIndex].filmIndex;
        uint keyToMove = filmIndexAddresses[filmIndexAddresses.length-1];
        filmIndexAddresses[rowToDelete] = keyToMove;
        filmStructs[keyToMove].filmIndex = rowToDelete;
        filmIndexAddresses.length--;

        return rowToDelete;
    }

    function getFilmCount() public constant returns(uint count) {
        return filmIndexAddresses.length;
    }

    function getFilmIndexAddresses(uint index) public constant returns(uint filmIndex) {
        return filmIndexAddresses[index];
    }

}