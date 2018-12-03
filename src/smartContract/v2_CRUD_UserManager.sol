pragma solidity ^0.4.18;

contract UserManager {
    struct UserStruct {
        uint userIndex; // index in userIndex
        address userAddress;
        uint256 userPassword;
        string userName;
        string userIdentity; // producer,investor,consumer
        uint256 userBalance;
        uint[] userBoughtFilm;
    }
    
    event logUser(
        uint userIndex,
        address userAddress,
        string userName,
        string userIdentity, // producer,investor,consumer
        uint256 userBalance,
        uint[] userBoughtFilm
    );
    
    mapping(address => UserStruct) public userStructs;
    address[] public userIndexAddresses;
    uint256 public totalSupplyEthereum;
    
    /* Constructor */
    // function UserManager() public {
        
    // }
    
    // verify the existence of user
    function isUser(address userAddress, uint256 userPassword) public view returns(bool isIndeed) {
        if(userIndexAddresses.length == 0) return false;
        return (
            userIndexAddresses[userStructs[userAddress].userIndex] == userAddress
        &&
            userStructs[userAddress].userPassword == userPassword
        );
    }
    
    function insertUser(address userAddress, uint256 userPassword, string userName, string userIdentity, 
    uint256 userBalance) public returns(uint userIndex) {
        if(isUser(userAddress, userPassword)) revert();
        
        userStructs[userAddress].userIndex = userIndexAddresses.push(userAddress) - 1;
        userStructs[userAddress].userAddress = userAddress;
        userStructs[userAddress].userPassword = userPassword;
        userStructs[userAddress].userName = userName;
        userStructs[userAddress].userIdentity = userIdentity;
        userStructs[userAddress].userBalance = userBalance;
        totalSupplyEthereum += userBalance;
        
        logUser(userStructs[userAddress].userIndex, userAddress, userName, userIdentity, userBalance, 
            userStructs[userAddress].userBoughtFilm);
        return userIndexAddresses.length-1;
    }
    
    function getUser(address userAddress, uint256 userPassword) public view returns(uint userIndex, string userName, 
    string userIdentity, uint256 userBalance, uint[] userBoughtFilm) {
        if(!isUser(userAddress, userPassword)) revert();
        return(
            userStructs[userAddress].userIndex,
            userStructs[userAddress].userName,
            userStructs[userAddress].userIdentity,
            userStructs[userAddress].userBalance,
            userStructs[userAddress].userBoughtFilm
        );
    }
    
    function updateUser(address userAddress, uint256 userPassword, string userName, string userIdentity, 
    uint256 userBalance) public returns(bool success) {
        if(!isUser(userAddress, userPassword)) revert();
        
        userStructs[userAddress].userPassword = userPassword;
        userStructs[userAddress].userName = userName;
        userStructs[userAddress].userIdentity = userIdentity;
        totalSupplyEthereum += (userBalance-userStructs[userAddress].userBalance);
        userStructs[userAddress].userBalance = userBalance;

        
        logUser(userStructs[userAddress].userIndex, userAddress, userName, userIdentity, userBalance, 
            userStructs[userAddress].userBoughtFilm);
        return true;
    }

    function updateUserPassword(address userAddress, uint256 userOldPassword, uint256 userNewPassword) 
    public returns(bool success) {
        if(!isUser(userAddress, userOldPassword)) revert();
        
        userStructs[userAddress].userPassword = userNewPassword;
        
        logUser(userStructs[userAddress].userIndex, userAddress, "null", "null", 0, 
            userStructs[userAddress].userBoughtFilm);
        return true;
    }
    
    function deleteUser(address userAddress, uint256 userPassword) public returns(uint userIndex) {
        if(!isUser(userAddress, userPassword)) revert();
        
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

    function buyFilm(address userAddress, uint256 userPassword,address userAddressProducer, uint filmIndex, 
        uint filmPrice) public returns(bool success) {
        if(!isUser(userAddress, userPassword)) revert();
            
        sendTokenEthereum(userAddress, userAddressProducer, filmPrice);
        userStructs[userAddress].userBoughtFilm.push(filmIndex);

        return true;
    }

    /* Transfer tokens to another account for payment */
    function sendTokenEthereum(address _from, address _to, uint256 _value) private returns(bool success) {
        require(userStructs[_from].userBalance >= _value 
            && 
            userStructs[_to].userBalance + _value >= userStructs[_to].userBalance); // Check if the sender has enough tokens and for overflows 

        userStructs[_from].userBalance -= _value; // subtract the number of tokens from the sender’s balance
        userStructs[_to].userBalance += _value; //add the number of tokens to the receiver’s balance
        // Transfer(msg.sender, _to, _value); // Notify anyone listening that this transfer took place 
        
        return true;
    }

    function get_test() public view returns(string a, uint b) {
        return("test", 888);
    }

}