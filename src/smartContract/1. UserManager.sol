pragma solidity ^0.4.18;

contract UserManager {
    struct UserStruct {
        uint userIndex; // index in userIndex
        address userAddress;
        string userEmail;
        string userPassword;
        string userName;
        string userIdentity; // producer,investor,consumer
        uint256 userBalance;
        uint[] userBoughtFilm;
    }
    
    event logUser(
        string function_call, 
        uint userIndex,
        address userAddress,
        string userEmail,
        string userName,
        string userIdentity, // producer,investor,consumer
        uint256 userBalance,
        uint[] userBoughtFilm
    );

    event operationUser(
        string function_call,
        bool success
    );
    
    mapping(string => UserStruct) userStructs;
    string[] userIndexEmails;

    uint256 public totalSupplyEthereum;
    
    /* Constructor */
    function UserManager() public {
        insertUser("0@gmail.com", "a123", 0xca35b7d915458ef540ade6068dfe2f44e8fa733c, "Kickflix", "platform", 1);

        insertUser("1@gmail.com", "a123", 0x14723a09acff6d2a60dcdf7aa4aff308fddc160c, "consumer_user1", "consumer", 3000);
        insertUser("1.1@gmail.com", "a123", 0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db, "consumer_user2", "consumer", 4000);
        
        insertUser("2@gmail.com", "a123", 0x583031d1113ad414f02576bd6afabfb302140225, "producer_user3", "producer", 8000);
        insertUser("2.1@gmail.com", "a123", 0x2783ffc5f9a96e9dd3daf07c733f6556c95f7037, "producer_user4", "producer", 9000);
        // Must increase gas limit to deploy this contract
        insertUser("3@gmail.com", "a123", 0xdd870fa1b7c4700f2bd7f44238821c26f7392148, "investor_user5", "investor", 10000);
        insertUser("3.1@gmail.com", "a123", 0xe33ae12a297568c8f42727cffbbaef6e2d5040b3, "investor_user6", "investor", 11000);

    }
    
    // verify the existence of user
    function isUser(string userEmail, string userPassword) private view returns(bool isIndeed) {
        if(userIndexEmails.length == 0 || userStructs[userEmail].userIndex >= userIndexEmails.length) return false;
        return (
            keccak256(userIndexEmails[userStructs[userEmail].userIndex]) == keccak256(userEmail)
        &&
            keccak256(userStructs[userEmail].userPassword) == keccak256(userPassword)
        );
    }
    
    function insertUser(string userEmail, string userPassword, address userAddress, string userName, string userIdentity, 
    uint256 userBalance) public returns(uint index_userIndexEmails) {
        if(isUser(userEmail, userPassword)) revert();
        
        userStructs[userEmail].userIndex = userIndexEmails.push(userEmail) - 1;
        userStructs[userEmail].userAddress = userAddress;
        userStructs[userEmail].userEmail = userEmail;
        userStructs[userEmail].userPassword = userPassword;
        userStructs[userEmail].userName = userName;
        userStructs[userEmail].userIdentity = userIdentity;
        userStructs[userEmail].userBalance = userBalance;
        totalSupplyEthereum += userBalance;
        
        logUser("insertUser", userStructs[userEmail].userIndex, userAddress, userEmail, userName, userIdentity, userBalance, 
            userStructs[userEmail].userBoughtFilm);
        return userIndexEmails.length-1;
    }
    
    function getUser(string userEmail, string userPassword) public view returns(uint index_userIndexEmails, address userAddress, 
        string userName, string userIdentity, uint256 userBalance, uint[] userBoughtFilm) {
        if(!isUser(userEmail, userPassword)) revert();
        return(
            userStructs[userEmail].userIndex,
            userStructs[userEmail].userAddress,
            userStructs[userEmail].userName,
            userStructs[userEmail].userIdentity,
            userStructs[userEmail].userBalance,
            userStructs[userEmail].userBoughtFilm
        );
    }
    
    function updateUser(string userEmail, string userPassword, address userAddress, string userName, string userIdentity, 
    uint256 userBalance) public returns(bool success) {
        if(!isUser(userEmail, userPassword)) revert();
        
        userStructs[userEmail].userAddress = userAddress;
        userStructs[userEmail].userName = userName;
        userStructs[userEmail].userIdentity = userIdentity;
        totalSupplyEthereum += (userBalance-userStructs[userEmail].userBalance);
        userStructs[userEmail].userBalance = userBalance;

        logUser("updateUser", userStructs[userEmail].userIndex, userAddress, userEmail, userName, userIdentity, userBalance, 
            userStructs[userEmail].userBoughtFilm);
        return true;
    }

    function updateUserPassword(string userEmail, string userOldPassword, string userNewPassword) 
    public returns(bool success) {
        if(!isUser(userEmail, userOldPassword)) revert();
        
        var oneUser = userStructs[userEmail];
        oneUser.userPassword = userNewPassword;
        
        logUser("updateUserPassword", oneUser.userIndex, oneUser.userAddress, userEmail, oneUser.userName, oneUser.userIdentity, 
            oneUser.userBalance, oneUser.userBoughtFilm);
        return true;
    }
    
    function deleteUser(string userEmail, string userPassword) public returns(bool success) {
        if(!isUser(userEmail, userPassword)) revert();
        
        totalSupplyEthereum -= userStructs[userEmail].userBalance;

        uint rowToDelete = userStructs[userEmail].userIndex;
        string keyToMove = userIndexEmails[userIndexEmails.length-1];
        userIndexEmails[rowToDelete] = keyToMove;
        userStructs[keyToMove].userIndex = rowToDelete;
        userIndexEmails.length--;
        
        operationUser("deleteUser", true);
        return true;
    }
    
    function getNumberUser() public view returns(uint numberUser) {
        return userIndexEmails.length;
    }

    function getByIndex_userIndexEmails(uint index_userIndexEmails) public view returns(string userEmail) {
         return userIndexEmails[index_userIndexEmails];
    }

    function getUserAddressBy_userEmail(string userEmail) public view returns(address userAddress) {
        return (
            userStructs[userEmail].userAddress
        );
    }

    function buyFilm(string userEmail, string userPassword, string userEmailProducer, uint filmIndex, 
    uint filmPrice) public returns(bool success) {
        if(!isUser(userEmail, userPassword)) revert();
        
        sendTokenEthereum(userEmail, userEmailProducer, filmPrice);
        userStructs[userEmail].userBoughtFilm.push(filmIndex);

        operationUser("buyFilm", true);
        return true;
    }

    function buyToken(string userEmail, string userPassword, string userEmailProducer, uint tokenPrice, 
    uint tokenNumber) public returns(bool success) {
        if(!isUser(userEmail, userPassword)) revert();

        sendTokenEthereum(userEmail, userEmailProducer, tokenPrice*tokenNumber);
        operationUser("buyToken", true);
        return true;
    }

    function finishToken(string userEmailProducer, string userPassword, string userEmailInvestor, uint amountTokens) public returns(bool success) {
        if(!isUser(userEmailProducer, userPassword)) revert();

        sendTokenEthereum(userEmailProducer, userEmailInvestor, amountTokens);
        operationUser("finishToken", true);
        return true;
    }

    /* Transfer tokens to another account for payment */
    function sendTokenEthereum(string _from, string _to, uint256 _value) private returns(bool success) {
        require(userStructs[_from].userBalance >= _value 
            && 
            userStructs[_to].userBalance + _value >= userStructs[_to].userBalance); // Check if the sender has enough tokens and for overflows 

        userStructs[_from].userBalance -= _value; // subtract the number of tokens from the sender’s balance
        userStructs[_to].userBalance += _value; //add the number of tokens to the receiver’s balance
        // Transfer(msg.sender, _to, _value); // Notify anyone listening that this transfer took place 
        
        return true;
    }

}