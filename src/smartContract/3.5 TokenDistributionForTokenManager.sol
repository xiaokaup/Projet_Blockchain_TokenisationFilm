pragma solidity ^0.4.18;

contract TokenDistributionForTokenManager {
    struct TokenDistributionForToken {
        uint filmIndex;
        uint numberAllToken;

        // userAddresses
        address[] boughtUserAddresses;
        // userAddress => index_boughtUserAddresses
        mapping(address => uint) index_boughtUserAddresses;

        mapping(address => uint) numberToken_thisUser;
    }
    
    event logTokenDistributionForToken(

    );
    
    // filmIndex => one token
    mapping(uint => TokenDistributionForToken) tokenDistributionsForFilm;
    uint[] public filmIndexes;
    
    /* Constructor */
    function TokenDistributionForTokenManager() public {
        insertToken(1,100);
        insertToken(3,50);
        insertToken(8,90);
        insertToken(6, 800);

        insertUserForToken(3, 0xca35b7d915458ef540ade6068dfe2f44e8fa733c, 200);
        insertUserForToken(3,0x14723a09acff6d2a60dcdf7aa4aff308fddc160c,230);
        insertUserForToken(3, 0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db,550);
        

        insertUserForToken(1, 0xca35b7d915458ef540ade6068dfe2f44e8fa733c, 250);
        insertUserForToken(1, 0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db,550);
        insertUserForToken(1, 0x14723a09acff6d2a60dcdf7aa4aff308fddc160c,600);

        insertUserForToken(6, 0xca35b7d915458ef540ade6068dfe2f44e8fa733c, 300);
        insertUserForToken(6, 0x14723a09acff6d2a60dcdf7aa4aff308fddc160c, 210);
        insertUserForToken(6, 0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db, 1);
    }


    // Token
    function isToken(uint filmIndex) public view returns(bool isIndeed) {
        if(filmIndexes.length == 0 || tokenDistributionsForFilm[filmIndex].filmIndex >= filmIndexes.length) return false;
        return(filmIndexes[tokenDistributionsForFilm[filmIndex].filmIndex] == filmIndex);
    }

    function insertToken(uint filmIndex, uint numberAllToken) public returns(uint index_filmIndexes) {
        if(isToken(filmIndex)) revert();

        tokenDistributionsForFilm[filmIndex].filmIndex = filmIndexes.push(filmIndex) -1;
        tokenDistributionsForFilm[filmIndex].numberAllToken = numberAllToken;

        return filmIndexes.length-1;
    }

    function getTokenAndAllUsers(uint filmIndex) public view returns(uint index_filmIndexes, uint numberAllToken, address[] boughtUserAddresses) {
        if(!isToken(filmIndex)) revert();
        
        var oneToken = tokenDistributionsForFilm[filmIndex];
        return (oneToken.filmIndex, oneToken.numberAllToken, oneToken.boughtUserAddresses);
    }

    function deleteToken(uint filmIndex) public returns(uint index_filmIndexes) {
        if(!isToken(filmIndex)) revert();

        uint rowToDelete = tokenDistributionsForFilm[filmIndex].filmIndex;
        uint keyToMove = filmIndexes[filmIndexes.length-1];
        filmIndexes[rowToDelete] = keyToMove;
        tokenDistributionsForFilm[keyToMove].filmIndex = rowToDelete;
        filmIndexes.length--;

        return rowToDelete;
    }

    function getAllToken() public view returns(uint[] allToken) {
        return filmIndexes;
    }

    function getAllUserForOneToken(uint filmIndex) public view returns(address[] boughtUserAddresses) {
        if(!isToken(filmIndex)) revert();
        return tokenDistributionsForFilm[filmIndex].boughtUserAddresses;
    }


    // TokenDistributionForToken
    function isUserForToken(uint filmIndex, address userAddress) public view returns(bool isIndeed) {
        var oneToken = tokenDistributionsForFilm[filmIndex];
        if(oneToken.boughtUserAddresses.length == 0 || oneToken.index_boughtUserAddresses[userAddress] >= oneToken.boughtUserAddresses.length) return false;

        return(oneToken.boughtUserAddresses[oneToken.index_boughtUserAddresses[userAddress]] == userAddress);
    }

    function insertUserForToken(uint filmIndex, address userAddress, uint numberToken_thisUser) public returns(bool success) {
        if(!isToken(filmIndex)) revert();
        if(isUserForToken(filmIndex, userAddress)) revert();

        var oneToken = tokenDistributionsForFilm[filmIndex];
        oneToken.index_boughtUserAddresses[userAddress] = oneToken.boughtUserAddresses.push(userAddress) - 1;
        oneToken.numberToken_thisUser[userAddress] = numberToken_thisUser;

        return true;
    }

    function getUserForToken(uint filmIndex, address userAddress) public view returns(uint index_boughtUserAddresses, address userAddress_return, 
        uint numberToken_thisUser, uint numberAllToken) {
        if(!isToken(filmIndex) || !isUserForToken(filmIndex, userAddress)) revert();

        var oneToken = tokenDistributionsForFilm[filmIndex];
        return (
            oneToken.index_boughtUserAddresses[userAddress],
            userAddress,
            oneToken.numberToken_thisUser[userAddress],
            oneToken.numberAllToken
        );


    }

    function deleteUserForToken(uint filmIndex, address userAddress) public returns(uint index_boughtUserAddresses) {
        if(!isToken(filmIndex) || !isUserForToken(filmIndex, userAddress)) revert();

        var oneToken = tokenDistributionsForFilm[filmIndex];

        uint rowToDelete = oneToken.index_boughtUserAddresses[userAddress];
        address keyToMove = oneToken.boughtUserAddresses[oneToken.boughtUserAddresses.length-1];
        oneToken.boughtUserAddresses[rowToDelete] = keyToMove;
        oneToken.index_boughtUserAddresses[keyToMove] = rowToDelete;
        oneToken.boughtUserAddresses.length--;

        return rowToDelete;
    }

}