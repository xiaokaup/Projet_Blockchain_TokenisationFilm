pragma solidity ^0.4.18;

contract TokenFilmManager {
    struct TokenStruct {
        uint filmIndex; 
        uint filmBudget;
        uint filmPeriode;

        uint tokenIndex; // Index of token
        uint tokenSum;
        uint tokenNumber;
    }
    
    event logToken(
        uint filmIndex,
        uint filmBudget,
        uint filmPeriode,

        uint tokenIndex,
        uint tokenSum,
        uint tokenNumber
    );
    
    mapping(uint => TokenStruct) tokenStructs; // uint is filmIndex
    uint[] public tokenIndexWithFilmIndexes; // uint[] is value of filmIndex, tokenIndex is the index of array

    /* Constructor */
    // function TokenFilmManager() public {

    // }

    // verify the existence of token
    function isToken(uint filmIndex) public constant returns(bool isIndeed) {
        if(tokenIndexWithFilmIndexes.length == 0) return false;
        return (tokenIndexWithFilmIndexes[tokenStructs[filmIndex].tokenIndex] == filmIndex);
    }

    function insertToken(uint filmIndex, uint filmBudget, uint filmPeriode, uint tokenSum, 
    uint tokenNumber) public returns(uint tokenIndex) {
        if(isToken(filmIndex)) revert();

        tokenStructs[filmIndex].filmIndex = filmIndex;
        tokenStructs[filmIndex].filmBudget = filmBudget;
        tokenStructs[filmIndex].filmPeriode = filmPeriode;
        tokenStructs[filmIndex].tokenIndex = tokenIndexWithFilmIndexes.push(filmIndex)-1;
        tokenStructs[filmIndex].tokenSum = tokenSum;
        tokenStructs[filmIndex].tokenNumber = tokenNumber;

        logToken(filmIndex, filmBudget, filmPeriode, tokenStructs[filmIndex].tokenIndex, 
        tokenSum, tokenNumber);
        return tokenIndexWithFilmIndexes.length-1;
    }

    function getToken(uint filmIndex) public constant returns(uint filmBudget, uint filmPeriode, 
    uint tokenIndex, uint tokenSum, uint tokenNumber) {
        if(!isToken(filmIndex)) revert();
        return(
            tokenStructs[filmIndex].filmBudget,
            tokenStructs[filmIndex].filmPeriode,
            tokenStructs[filmIndex].tokenIndex,
            tokenStructs[filmIndex].tokenSum,
            tokenStructs[filmIndex].tokenNumber
        );
    }

    function updateToken(uint filmIndex, uint filmBudget, uint filmPeriode, uint tokenSum, 
    uint tokenNumber) public returns(bool success) {
        if(!isToken(filmIndex)) revert();

        tokenStructs[filmIndex].filmBudget = filmBudget;
        tokenStructs[filmIndex].filmPeriode = filmPeriode;
        tokenStructs[filmIndex].tokenSum = tokenSum;
        tokenStructs[filmIndex].tokenNumber = tokenNumber;

        logToken(filmIndex, filmBudget, filmPeriode, tokenStructs[filmIndex].tokenIndex, 
        tokenSum, tokenNumber);
        return true;
    }

    function deleteToken(uint filmIndex) public returns(uint tokenIndex) {
        if(!isToken(filmIndex)) revert();

        uint rowToDelete = tokenStructs[filmIndex].tokenIndex;
        uint keyToMove = tokenIndexWithFilmIndexes[tokenIndexWithFilmIndexes.length-1];
        tokenIndexWithFilmIndexes[rowToDelete] = keyToMove;
        tokenStructs[keyToMove].tokenIndex = rowToDelete;
        tokenIndexWithFilmIndexes.length--;

        return rowToDelete;
    }

    function getTokenCount() public constant returns(uint count) {
        return tokenIndexWithFilmIndexes.length;
    }

    function getTokenAtTokenIndex(uint tokenIndex) public constant returns(uint filmIndex) {
        return tokenIndexWithFilmIndexes[tokenIndex];
    }
}