/**
  * @author Matias Barrios
  * @version 1.0
  */

/** @title Lucky7Store. 
  * This contract contains all the functions to generate and sell tickets to the users.
  * The front end interacts with this functions to make the necessary transactions to play the game.
*/

pragma solidity ^0.5.0;
import "./Lucky7Ballot.sol";

contract Lucky7Store is Lucky7Ballot{
    /** @dev Constructor to make the contract payable
      */
    constructor() payable public{
        
    }

    /** @dev userBoughtTicket is a modifier to check if the user paid the necessary amount to buy a ticket.
      */
    modifier userBoughtTicket(address _ticketOwner){
        require(msg.value >= sellTicketPrice);
        userValues[_ticketOwner].userPaidTicket = true;
        _;
    }
    
    /** @dev userBoughtParameters is a modifier to check if the user paid the necessary amount to buy parameters, i.e. generate a ticket without buying it.
      */
    modifier userBoughtParameters(address _ticketOwner){
        require(msg.value >= generateTicketPrice);
        _;
    }
    
    /** @dev setParametersToReady is a modifier to set the muReady and iReady booleans of the UserParametersValue of the Lucky7TicketFactory to false.
      * This way, the user can call for new parameters or buy ticket without being rejected by teh oraclize's callback function of the Lucky7TicketFactory contract.
      */
    modifier setParametersToReady(address _ticketOwner){
        userValues[_ticketOwner].muReady = false;
        userValues[_ticketOwner].iReady = false;
        _;
    }
    
    /** @dev sellingIsActive is a modifier which acts as a circuit breaker. If the settingLucky7Number is true, i.e. the game is in setting Lucky7Numbers phase, then
      * the users aren't allowed to buy tickets because the Lucky7Number are getting setted. Once the last Lucky7Number is setted and all them are ordered through the
      * _orderLucky7Numbers function of the Lucky7Ballot contract, the settingLucky7Numbers is setted to false, which means that users are then allowed to buy tickets.
      */
    modifier sellingIsActive {
        require(settingLucky7Numbers==false);
        _;
    }

    /** @dev notEmptyParameters checks if the user have mu and i parameters
      */
    modifier notEmptyParameters(address ticketRequester) {
        bytes memory userMu = bytes(userValues[ticketRequester].mu);
        bytes memory userI = bytes(userValues[ticketRequester].i); 
        require(userMu.length != 0  && userI.length != 0);
        _;
    }
    //------------------------
    
    event RandomTicketSelled(uint randomTicketCounter, address indexed owner);
    event GeneratedTicket(uint generatedTicketCounter, address indexed owner);
    event GeneratedTicketSelled(uint selledGeneratedTicketCounter, address indexed owner);
    // maps from gameID to every counter
    mapping (uint=>uint) public randomTicketCounter;
    mapping (uint=>uint) public generatedTicketCounter;
    mapping (uint=>uint) public selledGeneratedTicketCounter;

    /** @dev sellRandomTicket is a function used to sell a random ticket to the user. It checks if the user sent the correct amount and if the game is not
      * in the setting Lucky7Numbers phase. If so, then sets the user muReady and iReady of the UserParameters value of the Lucky7TicketFactory contract to false and 
      calls the _generateTicket function of the Lucky7TicketFactory contract with the msg.sender as the owner.
      */
    function sellRandomTicket() 
        public
        payable 
        userBoughtTicket(msg.sender)
        setParametersToReady(msg.sender)
        sellingIsActive
    { 
        randomTicketCounter[gameID]++;
        emit RandomTicketSelled(randomTicketCounter[gameID], msg.sender); 
        _generateTicket(msg.sender);
    }
    
    /** @dev generateRandomTicket is a function used to sell a parameters to the user without selling the ticket. It checks if the user sent the correct amount and 
      * if the game is not in the setting Lucky7Numbers phase. If so, then sets the user muReady and iReady of the UserParameters struct of the Lucky7TicketFactory 
      * contract to false and calls the _askForMuParameter and _askForIParamater functions of the Lucky7TicketFactory contract with the msg.sender as the owner.
      */
    function generateRandomTicket() 
        public 
        payable 
        userBoughtParameters(msg.sender)
        setParametersToReady(msg.sender)
        sellingIsActive
    {
        generatedTicketCounter[gameID]++;
        emit GeneratedTicket(generatedTicketCounter[gameID], msg.sender);
        _generateTicket(msg.sender);
    }
    
    /** @dev sellGeneratedTicket is a function used to sell the ticket generated through the parameters the user already bought. 
      * It checks if the user sent the correct amount and if the game is not in the setting Lucky7Numbers phase. 
      * If so, then sets the user muReady and iReady of the UserParameters struct of the Lucky7TicketFactory contract to false 
      * and calls the _generateTicket function of the Lucky7TicketFactory contract with the msg.sender as the owner.
      */
    function sellGeneratedTicket() 
        public 
        payable 
        userBoughtTicket(msg.sender)
        sellingIsActive
        notEmptyParameters(msg.sender)
    {
        selledGeneratedTicketCounter[gameID]++;
        emit GeneratedTicketSelled(selledGeneratedTicketCounter[gameID], msg.sender);
        _askForTicket(msg.sender);
    }
    
    function () external payable{
        
    }
}   
                                           
