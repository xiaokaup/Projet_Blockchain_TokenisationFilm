pragma solidity ^0.4.18;

contract FilmManager {
    struct FilmStruct {
        uint filmIndex;
        address filmAddress; // user_producer
        string filmName;
        string filmDescription;
        string filmUrl; // droit de diffusion
        uint filmPrice;
        uint filmNumberVoir;
        uint filmNotation;
    }
    
    event logFilm(
        uint filmIndex,
        address filmAddress,
        string filmName,
        string filmDescription,
        string filmUrl, // droit de diffusion
        uint filmNumberVoir,
        uint filmNotation
    );
    
    mapping(address => FilmStruct) filmStructs;
    address[] public filmIndexAddresses;
    
    /* Constructor */
    // function FilmManager() public {
        
    // }

    // verify the existence of film
    function isFilm(address filmAddress) public constant returns(bool isIndeed) {
        if(filmIndexAddresses.length == 0) return false;
        return (filmIndexAddresses[filmStructs[filmAddress].filmIndex] == filmAddress);
    }

    function insertFilm(address filmAddress, string filmName, string filmDescription, 
        string filmUrl, uint filmNumberVoir, uint filmNotation) public returns(uint filmIndex) {
        if(isFilm(filmAddress)) revert();

        filmStructs[filmAddress].filmIndex = filmIndexAddresses.push(filmAddress) - 1;
        filmStructs[filmAddress].filmAddress = filmAddress;
        filmStructs[filmAddress].filmName = filmName;
        filmStructs[filmAddress].filmDescription = filmDescription;
        filmStructs[filmAddress].filmUrl = filmUrl;
        filmStructs[filmAddress].filmNumberVoir = filmNumberVoir;
        filmStructs[filmAddress].filmNotation = filmNotation;

        logFilm(filmStructs[filmAddress].filmIndex, filmAddress, filmName, filmDescription, 
            filmUrl, filmNumberVoir, filmNotation);
        return filmIndexAddresses.length-1;
    }

    function getFilm(address filmAddress) public constant returns(
        uint filmIndex; string filmName; string filmDescription; string filmUrl; 
        uint filmNumberVoir; uint filmNotation) {
        if(!isFilm(filmAddress)) revert();
        return(
            filmStructs[filmAddress].filmIndex,
            filmStructs[filmAddress].filmName,
            filmStructs[filmAddress].filmDescription,
            filmStructs[filmAddress].filmUrl,
            filmStructs[filmAddress].filmNumberVoir,
            filmStructs[filmAddress].filmNotation
        );
    }

    function updateFilm(address filmAddress, string filmName, string filmDescription, 
        string filmUrl, uint filmNumberVoir, uint filmNotation) public returns(bool success) {
        if(!isFilm(filmAddress)) revert();

        filmStructs[filmAddress].filmName = filmName;
        filmStructs[filmAddress].filmDescription = filmDescription;
        filmStructs[filmAddress].filmUrl = filmUrl;
        filmStructs[filmAddress].filmNumberVoir = filmNumberVoir;
        filmStructs[filmAddress].filmNotation = filmNotation;

        logFilm(filmStructs[filmAddress].filmIndex, filmAddress, filmName, filmDescription, 
            filmUrl, filmNumberVoir, filmNotation);
        return true;
    }

    function deleteFilm(address filmAddress) public returns(uint filmIndex) {
        if(!isFilm(filmAddress)) revert();

        uint rowToDelete = filmStructs[filmAddress].filmIndex;
        address keyToMove = filmIndexAddresses[filmIndexAddresses.length-1];
        filmIndexAddresses[rowToDelete] = keyToMove;
        filmStructs[keyToMove].filmIndex = rowToDelete;
        filmIndexAddresses.length--;

        return rowToDelete;
    }

    function getFilmCount() public constant returns(uint count) {
        return filmIndexAddresses.length;
    }

    function getFilmAtIndex(uint filmIndex) public constant returns(address filmAddress) {
        return filmIndexAddresses[filmIndex];
    }

}