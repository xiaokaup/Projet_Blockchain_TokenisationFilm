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
        insertUser(0xca35b7d915458ef540ade6068dfe2f44e8fa733c);
        insertUser(0x14723a09acff6d2a60dcdf7aa4aff308fddc160c);
        insertUser(0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db);
        // insertUser(0x583031d1113ad414f02576bd6afabfb302140225);

        insertTokenForUser(0xca35b7d915458ef540ade6068dfe2f44e8fa733c, 0, 50, 150, 200);
        insertTokenForUser(0xca35b7d915458ef540ade6068dfe2f44e8fa733c, 1, 100, 150, 250);
        insertTokenForUser(0xca35b7d915458ef540ade6068dfe2f44e8fa733c, 12, 50, 250, 300);
        insertTokenForUser(0x14723a09acff6d2a60dcdf7aa4aff308fddc160c, 0, 200, 30, 230);
        insertTokenForUser(0x14723a09acff6d2a60dcdf7aa4aff308fddc160c, 9, 200, 10, 210);
        insertTokenForUser(0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db, 1, 550, 50, 550);
    }


    // User
    function isUser(address userAddress) public view returns(bool isIndeed) {
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
    function isTokenForUser(address userAddress, uint filmIndex) public view returns(bool isIndeed) {
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