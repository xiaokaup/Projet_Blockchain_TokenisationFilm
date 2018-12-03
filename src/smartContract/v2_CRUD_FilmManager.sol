pragma solidity ^0.4.18;

contract FilmManager {
    struct FilmStruct {
        uint filmIndex;
        string filmName;
        string filmDescription;
        string filmUrl; // droit de diffusion
        uint filmPrice;
        uint filmNumberVoir;
        uint filmNotation;
        address userAddressProducer;
    }
    
    event logFilm(
        uint filmIndex,
        string filmName,
        string filmDescription,
        string filmUrl, // droit de diffusion
        uint filmNumberVoir,
        uint filmNotation,
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

    function insertFilm(string filmName, string filmDescription, 
        string filmUrl, uint filmNumberVoir, uint filmNotation,
        address userAddressProducer) public returns(uint filmIndex) {
        var fimIndex = count;
        count ++;
        if(isFilm(fimIndex)) revert(); // ?

        filmStructs[fimIndex].filmIndex = filmIndexAddresses.push(fimIndex) - 1;
        filmStructs[fimIndex].filmName = filmName;
        filmStructs[fimIndex].filmDescription = filmDescription;
        filmStructs[fimIndex].filmUrl = filmUrl;
        filmStructs[fimIndex].filmNumberVoir = filmNumberVoir;
        filmStructs[fimIndex].filmNotation = filmNotation;
        filmStructs[fimIndex].userAddressProducer = userAddressProducer;


        logFilm(filmStructs[filmIndex].filmIndex, filmName, filmDescription, 
            filmUrl, filmNumberVoir, filmNotation, userAddressProducer);
        return filmIndexAddresses.length-1;
    }

    function getFilm(uint filmIndex) public constant returns(
        string filmName, string filmDescription, string filmUrl, 
        uint filmNumberVoir, uint filmNotation, 
        address userAddressProducer) {
        if(!isFilm(filmIndex)) revert();
        return(
            filmStructs[filmIndex].filmName,
            filmStructs[filmIndex].filmDescription,
            filmStructs[filmIndex].filmUrl,
            filmStructs[filmIndex].filmNumberVoir,
            filmStructs[filmIndex].filmNotation,
            filmStructs[filmIndex].userAddressProducer
        );
    }


    function updateFilm(uint filmIndex, string filmName, string filmDescription, 
        string filmUrl, uint filmNumberVoir, uint filmNotation) public returns(bool success) {
        if(!isFilm(filmIndex)) revert();

        filmStructs[filmIndex].filmName = filmName;
        filmStructs[filmIndex].filmDescription = filmDescription;
        filmStructs[filmIndex].filmUrl = filmUrl;
        filmStructs[filmIndex].filmNumberVoir = filmNumberVoir;
        filmStructs[filmIndex].filmNotation = filmNotation;



        logFilm(filmStructs[filmIndex].filmIndex, filmName, filmDescription, 
            filmUrl, filmNumberVoir, filmNotation, 
            filmStructs[filmIndex].userAddressProducer);
        return true;
    }

    function deleteFilm(uint fimIndex) public returns(uint filmIndex) {
        if(!isFilm(fimIndex)) revert();

        uint rowToDelete = filmStructs[fimIndex].filmIndex;
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

    // function getFilmTest(uint filmIndex) public constant returns(
    //     uint filmIndex_return, string filmName, string filmDescription, string filmUrl, 
    //     uint filmNumberVoir, uint filmNotation, 
    //     address userAddressProducer) {
    //     if(!isFilm(filmIndex)) revert();
    //     return(
    //         filmStructs[filmIndex].filmIndex,
    //         filmStructs[filmIndex].filmName,
    //         filmStructs[filmIndex].filmDescription,
    //         filmStructs[filmIndex].filmUrl,
    //         filmStructs[filmIndex].filmNumberVoir,
    //         filmStructs[filmIndex].filmNotation,
    //         filmStructs[filmIndex].userAddressProducer
    //     );
    // }

}