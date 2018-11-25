pragma solidity ^0.4.18;

contract UserManager {
    struct UserStruct {
        uint userIndex; // index in userIndex
        address userAddress;
        string userName;
        string userIdentity; // producer,investor,consumer
        uint256 userSold;
    }
    
    event logUser(
        uint userIndex,
        address userAddress,
        string userName,
        string userIdentity, // producer,investor,consumer
        uint256 userSold
    );
    
    mapping(address => UserStruct) userStructs;
    address[] public userIndexAddresses;
    
    /* Constructor */
    // function UserManager() public {
        
    // }
    
    // verify the existence of user
    function isUser(address userAddress) public view returns(bool isIndeed) {
        if(userIndexAddresses.length == 0) return false;
        return (userIndexAddresses[userStructs[userAddress].userIndex] == userAddress);
    }
    
    function insertUser(address userAddress, string userName, string userIdentity, 
    uint256 userSold) public returns(uint userIndex) {
        if(isUser(userAddress)) revert();
        
        userStructs[userAddress].userIndex = userIndexAddresses.push(userAddress) - 1;
        userStructs[userAddress].userAddress = userAddress;
        userStructs[userAddress].userName = userName;
        userStructs[userAddress].userIdentity = userIdentity;
        userStructs[userAddress].userSold = userSold;
        
        logUser(userStructs[userAddress].userIndex, userAddress, userName, userIdentity, userSold);
        return userIndexAddresses.length-1;
    }
    
    function getUser(address userAddress) public view returns(uint userIndex, string userName, 
    string userIdentity, uint256 userSold) {
        if(!isUser(userAddress)) revert();
        return(
            userStructs[userAddress].userIndex,
            userStructs[userAddress].userName,
            userStructs[userAddress].userIdentity,
            userStructs[userAddress].userSold
        );
    }
    
    function updateUser(address userAddress, string userName, string userIdentity, 
    uint256 userSold) public returns(bool success) {
        if(!isUser(userAddress)) revert();
        
        userStructs[userAddress].userName = userName;
        userStructs[userAddress].userIdentity = userIdentity;
        userStructs[userAddress].userSold = userSold;
        
        logUser(userStructs[userAddress].userIndex, userAddress, userName, userIdentity, userSold);
        return true;
    }
    
    function deleteUser(address userAddress) public returns(uint userIndex) {
        if(!isUser(userAddress)) revert();
        
        uint rowToDelete = userStructs[userAddress].userIndex;
        address keyToMove = userIndexAddresses[userIndexAddresses.length-1];
        userIndexAddresses[rowToDelete] = keyToMove;
        userStructs[keyToMove].userIndex = rowToDelete;
        userIndexAddresses.length--;
        
        return rowToDelete;
    }
    
    function getUserCount() public view returns(uint count) {
        return userIndexAddresses.length;
    }
    
    function getUserAtIndex(uint userIndex) public view returns(address userAddress) {
        return userIndexAddresses[userIndex];
    }

    function get_test() public view returns(string a, uint b) {
        return("test", 888);
    }
}