/**
 * @author Matias Barrios
 * @version 1.0
 */

/** @title Lucky7Store. 
 * This contract contains all the functions to generate and sell tickets to the users.
 * The front end interacts with this functions to make the necessary transactions to play the game.
 */

pragma solidity ^ 0.5 .0;
import "./Lucky7Raffle.sol";

contract Lucky7Store is Lucky7Raffle {
  /** @dev Constructor to make the contract payable
   */
  event GameParameters(string b, string n, string p, string j, uint numberOfLucky7Numbers, uint generateTicketPrice, uint purchaseTicketPrice);
  constructor(address _lucky7Lighthouse, bool _isRhombusAvailable, bool _isLocalBlockchain)
  payable
  public
  Lucky7Raffle(_lucky7Lighthouse, _isRhombusAvailable, _isLocalBlockchain) { // To initialize Lucky7TicketFactory constructor with Rhombus lighthouse
    emit GameParameters(b, n, p, j, numberOfLucky7Numbers, generateTicketPrice, purchaseTicketPrice);
  }

  /** @dev userBoughtTicket is a modifier to check if the user paid the necessary amount to buy a ticket.
   */
  modifier userBoughtTicket(address _ticketOwner) {
    require(msg.value >= purchaseTicketPrice);
    userValues[_ticketOwner].userPaidTicket = true;
    _;
  }

  /** @dev userBoughtParameters is a modifier to check if the user paid the necessary amount to buy parameters, i.e. generate a ticket without buying it.
   */
  modifier userBoughtParameters(address _ticketOwner) {
    require(msg.value >= generateTicketPrice);
    _;
  }

  /** @dev setParametersToReady is a modifier to set the muReady and iReady booleans of the UserParametersValue of the Lucky7TicketFactory to false.
   * This way, the user can call for new parameters or buy ticket without being rejected by teh oraclize's callback function of the Lucky7TicketFactory contract.
   */
  modifier setParametersToReady(address _ticketOwner) {
    userValues[_ticketOwner].muReady = false;
    userValues[_ticketOwner].iReady = false;
    _;
  }

  /** @dev sellingIsActive is a modifier which acts as a circuit breaker. If the settingLucky7Number is true, i.e. the game is in setting Lucky7Numbers phase, then
   * the users aren't allowed to buy tickets because the Lucky7Number are getting setted. Once the last Lucky7Number is setted and all them are ordered through the
   * _orderLucky7Numbers function of the Lucky7Raffle contract, the settingLucky7Numbers is setted to false, which means that users are then allowed to buy tickets.
   */
  modifier sellingIsActive {
    require(settingLucky7Numbers == false);
    _;
  }

  /** @dev notEmptyParameters checks if the user have mu and i parameters
   */
  modifier notEmptyParameters(address ticketRequester) {
    bytes memory userMu = bytes(userValues[ticketRequester].mu);
    bytes memory userI = bytes(userValues[ticketRequester].i);
    require(userMu.length != 0 && userI.length != 0);
    _;
  }
  //------------------------
  /** @dev events used on front-end to count the amount of tickets selled, i.e. the amount of events are equal to the amount
   * of events emitted
   */
  event RandomTicketSelled(uint indexed gameID);
  event GeneratedTicket(uint indexed gameID);
  event GeneratedTicketSelled(uint indexed gameID);

  /** @dev sellRandomTicket is a function used to sell a random ticket to the user. It checks if the user sent the correct amount and if the game is not
    * in the setting Lucky7Numbers phase. If so, then sets the user muReady and iReady of the UserParameters value of the Lucky7TicketFactory contract to false and 
    calls the _generateTicket function of the Lucky7TicketFactory contract with the msg.sender as the owner.
    */
  function sellRandomTicket()
  public
  payable
  userBoughtTicket(msg.sender)
  setParametersToReady(msg.sender)
  sellingIsActive {
    ticketsPurchased++;
    emit RandomTicketSelled(gameID);
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
  sellingIsActive {
    ticketsGenerated++;
    emit GeneratedTicket(gameID);
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
  notEmptyParameters(msg.sender) {
    ticketsPurchased++;
    emit GeneratedTicketSelled(gameID);
    _askForTicket(msg.sender);
  }

  function () external payable {

  }
/** @dev This two functions are purely designed for testing purposes and are not going to be deployed with the contracts
   * to test or main net. They're straight forward and don't need any explanaiton.
   * They're setted to onlyOwner to be sure that, in case of forgetting to erase them, no user is capable to use them
   * maliciously.
   */
   
  event Lucky7NumberInserted(uint value, uint index);

  function insertLucky7Numbers(uint[] memory values) public onlyOwner {
    for (uint i = 0; i < 7; i++) {
      lucky7NumbersArray[i] = Lucky7Number("mu", "i", values[i], gameID);
      emit Lucky7NumberInserted(values[i], i);
    }
    indexForLucky7Array = 7;
    _generateLucky7Number();
  }

  function setIndexForLucky7Array(uint _newValue) public onlyOwner {
    indexForLucky7Array = _newValue;
  }

}
