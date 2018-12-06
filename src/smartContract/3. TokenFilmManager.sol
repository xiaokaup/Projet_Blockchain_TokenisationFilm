pragma solidity ^0.4.18;

contract TokenFilmManager {
    struct TokenStruct {
        uint filmIndex; 
        uint filmBudget;
        uint filmMaturity;

        uint tokenPrice;
        uint tokenNumber;
        int tokenRecommend;
    }
    
    event logToken(
        uint filmIndex,
        uint filmBudget,
        uint filmMaturity,

        uint tokenPrice,
        uint tokenNumber,
        int tokenRecommend
    );
    
    mapping(uint => TokenStruct) public tokenStructs; // uint is filmIndex
    uint[] public filmIndexAddresses;

    /* Constructor */
    // function TokenFilmManager() public {

    // }

    // verify the existence of token
    function isToken(uint filmIndex) public constant returns(bool isIndeed) {
        if(filmIndexAddresses.length == 0) return false;
        return (filmIndexAddresses[tokenStructs[filmIndex].filmIndex] == filmIndex);
    }

    function insertToken(uint filmIndex, uint filmBudget, uint filmMaturity, uint tokenPrice, 
    uint tokenNumber, int tokenRecommend) public returns(uint index_filmIndexAddresses) {
        if(isToken(filmIndex)) revert();

        tokenStructs[filmIndex].filmIndex = filmIndexAddresses.push(filmIndex) - 1;
        tokenStructs[filmIndex].filmBudget = filmBudget;
        tokenStructs[filmIndex].filmMaturity = filmMaturity;
        tokenStructs[filmIndex].tokenPrice = tokenPrice;
        tokenStructs[filmIndex].tokenNumber = tokenNumber;
        tokenStructs[filmIndex].tokenRecommend = 0;

        logToken(tokenStructs[filmIndex].filmIndex, filmBudget, filmMaturity, tokenPrice, tokenNumber, 0);
        return filmIndexAddresses.length-1;
    }

    function getToken(uint filmIndex) public constant returns(uint filmBudget, uint filmMaturity, 
        uint tokenPrice, uint tokenNumber, int tokenRecommend) {
        if(!isToken(filmIndex)) revert();
        return(
            tokenStructs[filmIndex].filmBudget,
            tokenStructs[filmIndex].filmMaturity,
            tokenStructs[filmIndex].tokenPrice,
            tokenStructs[filmIndex].tokenNumber, 
            tokenStructs[filmIndex].tokenRecommend
        );
    }

    function updateToken(uint filmIndex, uint filmBudget, uint filmMaturity, uint tokenPrice, 
    uint tokenNumber) public returns(bool success) {
        if(!isToken(filmIndex)) revert();

        tokenStructs[filmIndex].filmBudget = filmBudget;
        tokenStructs[filmIndex].filmMaturity = filmMaturity;
        tokenStructs[filmIndex].tokenPrice = tokenPrice;
        tokenStructs[filmIndex].tokenNumber = tokenNumber;

        logToken(tokenStructs[filmIndex].filmIndex, filmBudget, filmMaturity, tokenPrice, tokenNumber, 
            tokenStructs[filmIndex].tokenRecommend);
        return true;
    }

    function addOneTokenRecommend(uint filmIndex) public { tokenStructs[filmIndex].tokenRecommend++; }

    function minusOneTokenRecommend(uint filmIndex) public { tokenStructs[filmIndex].tokenRecommend--; }

    function deleteToken(uint filmIndex) public returns(uint delete_index_filmIndexAddresses) {
        if(!isToken(filmIndex)) revert();

        uint rowToDelete = tokenStructs[filmIndex].filmIndex;
        uint keyToMove = filmIndexAddresses[filmIndexAddresses.length-1];
        filmIndexAddresses[rowToDelete] = keyToMove;
        tokenStructs[keyToMove].filmIndex = rowToDelete;
        filmIndexAddresses.length--;

        return rowToDelete;
    }

    function getTokenCount() public constant returns(uint count) {
        return filmIndexAddresses.length;
    }

    function getFilmIndexAddresses(uint index) public constant returns(uint filmIndex) {
        return filmIndexAddresses[index];
    }
}