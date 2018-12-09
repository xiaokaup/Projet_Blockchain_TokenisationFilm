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
        string function_call, 
        uint userIndex,
        address userAddress,
        string userName,
        string userIdentity, // producer,investor,consumer
        uint256 userBalance,
        uint[] userBoughtFilm
    );

    event operationUser(
        string function_call,
        bool success
    );
    
    mapping(address => UserStruct) userStructs;
    address[] userIndexAddresses;

    uint256 public totalSupplyEthereum;
    
    /* Constructor */
    function UserManager() public {
        insertUser(0xca35b7d915458ef540ade6068dfe2f44e8fa733c, 123, "Kickflix", "platform", 1);

        insertUser(0x14723a09acff6d2a60dcdf7aa4aff308fddc160c, 123, "customer_user1", "customer", 1000);
        insertUser(0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db, 123, "customer_user2", "customer", 1000);
        insertUser(0x583031d1113ad414f02576bd6afabfb302140225, 123, "producer_user3", "producer", 3000);
        // Must increase gas limit to deploy this contract
        insertUser(0xdd870fa1b7c4700f2bd7f44238821c26f7392148, 123, "investor_user4", "investor", 10000);

    }
    
    // verify the existence of user
    function isUser(address userAddress, uint256 userPassword) private view returns(bool isIndeed) {
        if(userIndexAddresses.length == 0 || userStructs[userAddress].userIndex >= userIndexAddresses.length) return false;
        return (
            userIndexAddresses[userStructs[userAddress].userIndex] == userAddress
        &&
            userStructs[userAddress].userPassword == userPassword
        );
    }
    
    function insertUser(address userAddress, uint256 userPassword, string userName, string userIdentity, 
    uint256 userBalance) public returns(uint index_userIndexAddresses) {
        if(isUser(userAddress, userPassword)) revert();
        
        userStructs[userAddress].userIndex = userIndexAddresses.push(userAddress) - 1;
        userStructs[userAddress].userAddress = userAddress;
        userStructs[userAddress].userPassword = userPassword;
        userStructs[userAddress].userName = userName;
        userStructs[userAddress].userIdentity = userIdentity;
        userStructs[userAddress].userBalance = userBalance;
        totalSupplyEthereum += userBalance;
        
        logUser("insertUser", userStructs[userAddress].userIndex, userAddress, userName, userIdentity, userBalance, 
            userStructs[userAddress].userBoughtFilm);
        return userIndexAddresses.length-1;
    }
    
    function getUser(address userAddress, uint256 userPassword) public view returns(uint index_userIndexAddresses, string userName, 
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

        logUser("updateUser", userStructs[userAddress].userIndex, userAddress, userName, userIdentity, userBalance, 
            userStructs[userAddress].userBoughtFilm);
        return true;
    }

    function updateUserPassword(address userAddress, uint256 userOldPassword, uint256 userNewPassword) 
    public returns(bool success) {
        if(!isUser(userAddress, userOldPassword)) revert();
        
        var oneUser = userStructs[userAddress];
        oneUser.userPassword = userNewPassword;
        
        logUser("updateUserPassword", oneUser.userIndex, userAddress, oneUser.userName, oneUser.userIdentity, 
            oneUser.userBalance, oneUser.userBoughtFilm);
        return true;
    }
    
    function deleteUser(address userAddress, uint256 userPassword) public returns(bool success) {
        if(!isUser(userAddress, userPassword)) revert();
        
        uint rowToDelete = userStructs[userAddress].userIndex;
        address keyToMove = userIndexAddresses[userIndexAddresses.length-1];
        userIndexAddresses[rowToDelete] = keyToMove;
        userStructs[keyToMove].userIndex = rowToDelete;
        userIndexAddresses.length--;
        
        operationUser("deleteUser", true);
        return true;
    }
    
    function getNumberUser() public view returns(uint numberUser) {
        return userIndexAddresses.length;
    }

    function getByIndex_userIndexAddresses(uint index_userIndexAddresses) public view returns(address userAddress) {
         return userIndexAddresses[index_userIndexAddresses];
    }

    function buyFilm(address userAddress, uint256 userPassword,address userAddressProducer, uint filmIndex, 
        uint filmPrice) public returns(bool success) {
        if(!isUser(userAddress, userPassword)) revert();
        
        sendTokenEthereum(userAddress, userAddressProducer, filmPrice);
        userStructs[userAddress].userBoughtFilm.push(filmIndex);

        operationUser("buyFilm", true);
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

}