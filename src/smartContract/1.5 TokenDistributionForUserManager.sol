pragma solidity ^0.4.18;

contract TokenDistributionForUserManager {
    struct TokenDistributionForUser {
        uint userIndex; // index_userIndexAddresses
        
        // tokenIndex equal filmIndex
        uint[] userBoughtTokens;
        // filmIndex => index_userBoughtTokens
        mapping(uint => uint) index_userBoughtTokens;

        mapping(uint => uint) numberTokenPocket;
        mapping(uint => uint) numberTokenOnSell;
        mapping(uint => uint) numberTokenTotal;
    }
    
    event logTokenDistributionForUser(

    );
    
    // userAddress => one user
    mapping(address => TokenDistributionForUser) tokenDistributionsForUser;
    address[] public userIndexAddresses;
    
    /* Constructor */
    function TokenDistributionForUserManager() public {
        // insertUser(userAddress)
        // producer
        insertUser(0x583031d1113ad414f02576bd6afabfb302140225);
        // investor
        insertUser(0xdd870fa1b7c4700f2bd7f44238821c26f7392148);
        insertUser(0xe33ae12a297568c8f42727cffbbaef6e2d5040b3);


        // inserTokenForUser(userAddress, filmIndex, numberTokenPocket, numberTokenOnSell, numberTokenTotal)
        // producer
        insertTokenForUser(0x583031d1113ad414f02576bd6afabfb302140225, 4, 0, 0, 300);
        insertTokenForUser(0x583031d1113ad414f02576bd6afabfb302140225, 5, 0, 0, 150);
        // investor 
        insertTokenForUser(0xdd870fa1b7c4700f2bd7f44238821c26f7392148, 4, 0, 0, 40);
        insertTokenForUser(0xdd870fa1b7c4700f2bd7f44238821c26f7392148, 5, 0, 0, 20);

        insertTokenForUser(0xe33ae12a297568c8f42727cffbbaef6e2d5040b3, 4, 0, 0, 60);
        insertTokenForUser(0xe33ae12a297568c8f42727cffbbaef6e2d5040b3, 5, 0, 0, 30);
    }


    // User
    function isUser(address userAddress) private view returns(bool isIndeed) {
        if(userIndexAddresses.length == 0 || tokenDistributionsForUser[userAddress].userIndex >= userIndexAddresses.length) return false;
        return(userIndexAddresses[tokenDistributionsForUser[userAddress].userIndex] == userAddress);
    }

    function insertUser(address userAddress) public returns(uint index_userIndexAddresses){
        if(isUser(userAddress)) revert();

        tokenDistributionsForUser[userAddress].userIndex = userIndexAddresses.push(userAddress) -1;

        return userIndexAddresses.length-1;
    }

    function getUserAndAllTokens(address userAddress) public view returns(uint index_userIndexAddresses, uint[] userBoughtTokens) {
        if(!isUser(userAddress)) revert();
        
        return (tokenDistributionsForUser[userAddress].userIndex, tokenDistributionsForUser[userAddress].userBoughtTokens);
    }

    function deleteUser(address userAddress) public returns(uint index_userIndexAddresses) {
        if(!isUser(userAddress)) revert();

        uint rowToDelete = tokenDistributionsForUser[userAddress].userIndex;
        address keyToMove = userIndexAddresses[userIndexAddresses.length-1];
        userIndexAddresses[rowToDelete] = keyToMove;
        tokenDistributionsForUser[keyToMove].userIndex = rowToDelete;
        userIndexAddresses.length--;

        return rowToDelete;
    }

    function getAllUser() public view returns(address[] allUser) {
        return userIndexAddresses;
    }

    function getAllTokenForOneUser(address userAddress) public view returns(uint[] userBoughtTokens) {
        if(!isUser(userAddress)) revert();
        return tokenDistributionsForUser[userAddress].userBoughtTokens;
    }


    // TokenDistributionForUser
    function isTokenForUser(address userAddress, uint filmIndex) private view returns(bool isIndeed) {
        var oneUser = tokenDistributionsForUser[userAddress];
        if(oneUser.userBoughtTokens.length == 0 || oneUser.index_userBoughtTokens[filmIndex] >= oneUser.userBoughtTokens.length) return false;
        return(oneUser.userBoughtTokens[oneUser.index_userBoughtTokens[filmIndex]] == filmIndex);
    }

    function insertTokenForUser(address userAddress, uint filmIndex, uint numberTokenPocket, uint numberTokenOnSell, uint numberTokenTotal) 
    public returns(bool success){
        if(!isUser(userAddress)) revert();
        if(isTokenForUser(userAddress, filmIndex)) revert();

        var oneUser = tokenDistributionsForUser[userAddress];
        oneUser.index_userBoughtTokens[filmIndex] = oneUser.userBoughtTokens.push(filmIndex) - 1;
        oneUser.numberTokenPocket[filmIndex] = numberTokenPocket;
        oneUser.numberTokenOnSell[filmIndex] = numberTokenOnSell;
        oneUser.numberTokenTotal[filmIndex] = numberTokenTotal;
        return true;
    }

    function getTokenForUser(address userAddress, uint filmIndex) public view returns(uint index_userBoughtTokens, uint filmIndex_return, 
        uint numberTokenPocket, uint numberTokenOnSell, uint numberTokenTotal) {
        if(!isUser(userAddress) || !isTokenForUser(userAddress, filmIndex)) revert();

        var oneUser = tokenDistributionsForUser[userAddress];
        return (
            oneUser.index_userBoughtTokens[filmIndex],
            filmIndex,
            oneUser.numberTokenPocket[filmIndex],
            oneUser.numberTokenOnSell[filmIndex],
            oneUser.numberTokenTotal[filmIndex]
        );
    }

    function updateTokenForUser(address userAddress, uint filmIndex, uint numberTokenPocket, uint numberTokenOnSell, uint numberTokenTotal) public returns(bool success) {
        if(!isUser(userAddress) || !isTokenForUser(userAddress, filmIndex)) revert();

        var oneUser = tokenDistributionsForUser[userAddress];
        oneUser.numberTokenPocket[filmIndex] = numberTokenPocket;
        oneUser.numberTokenOnSell[filmIndex] = numberTokenOnSell;
        oneUser.numberTokenTotal[filmIndex] = numberTokenTotal;

        return true;
    }

    function deleteTokenForUser(address userAddress, uint filmIndex)
    public returns(uint index_userBoughtTokens) {
        if(!isUser(userAddress) || !isTokenForUser(userAddress, filmIndex)) revert();

        var oneUser = tokenDistributionsForUser[userAddress];
        uint rowToDelete = oneUser.index_userBoughtTokens[filmIndex];
        uint keyToMove = oneUser.userBoughtTokens[oneUser.userBoughtTokens.length-1];
        oneUser.userBoughtTokens[rowToDelete] = keyToMove;
        oneUser.index_userBoughtTokens[keyToMove] = rowToDelete;
        oneUser.userBoughtTokens.length--;

        return rowToDelete;
    }


}