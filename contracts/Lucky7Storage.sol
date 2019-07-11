/**
 * @author Matias Barrios
 * @version 1.0
 */


/** @title Lucky7Storage. 
 * This contract is meant to storage all the important information of the game, 
 * i.e. Tickets, Lucky7Numbers and Lucky7Tickets related info.
 */

pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Roles.sol";
import "./Lucky7Structs.sol";

contract Lucky7Storage {
  using Roles for Roles.Role;
  using Lucky7Structs for *;
  using SafeMath for uint256;

  Roles.Role private lucky7AdminRole;
  Roles.Role private lucky7TicketFactoryRole;
  Roles.Role private lucky7RaffleRole;

  /**
   * @param lucky7Wallet is the address of the wallet which will recieve 30% of the final balance of tickets generated and selled
   */

  address payable public lucky7Wallet;

  // To state game parameters and retrieve them from logs
  event GameParameters(string b, string n, string p, string j, uint numberOfLucky7Numbers, uint generateTicketPrice, uint purchaseTicketPrice);

  //---------------------------------------- CONSTRUCTOR ----------------------------------------
  
  constructor() internal {
    lucky7AdminRole.add(msg.sender);
    lucky7Wallet = msg.sender;
    emit GameParameters(b, n, p, j, numberOfLucky7Numbers, generateTicketPrice, purchaseTicketPrice);
  }

  //---------------------------------------- ROLES MODIFIERS ----------------------------------------

  modifier onlyLucky7AdminRole() {
    require(lucky7AdminRole.has(msg.sender), "Not registered as lucky7AdminRole");
    _;
  }

  modifier onlyLucky7TicketFactoryRole() {
    require(lucky7TicketFactoryRole.has(msg.sender), "Not registered as lucky7TicketFactoryRole");
    _;
  }

  modifier onlyLucky7RaffleRole() {
    require(lucky7RaffleRole.has(msg.sender), "Not registered as lucky7RaffleRole");
    _;
  }

  //---------------------------------------- ROLES FUNCTIONS ----------------------------------------

  function addLucky7AdminRole(address _newAdmin) public onlyLucky7AdminRole returns(bool) {
    lucky7AdminRole.add(_newAdmin);
  }

  function addLucky7FactoryRole(address _newLucky7TicketFactory) public onlyLucky7AdminRole returns(bool) {
    lucky7TicketFactoryRole.add(_newLucky7TicketFactory);
  }

  function addlucky7RaffleRole(address _newlucky7Raffle) public onlyLucky7AdminRole returns(bool) {
    lucky7RaffleRole.add(_newlucky7Raffle);
  }

  //---------------------------------------- GAME PARAMETERS ----------------------------------------
  /** @param b Pseudo-random number generator parameter
   * @param n Pseudo-random number generator parameter
   * @param p Pseudo-random number generator parameter
   * @param j Pseudo-random number generator parameter
   */
  string public b = "1";
  string public n = "8";
  string public p = "10000";
  string public j = "10";

  /** @param numberOfLucky7Numbers is the parameter that indicates the number of Lucky7Numbers which are going to be generated
   * before letting users start buying a ticket. Is used for other functions to shutdown a circuit breaker, lookup in arrays and
   * order the Lucky7Numbers
   */
  uint public numberOfLucky7Numbers = 7;

  /**
   * @dev This parameters control the prices of the system
   *    
   * The user can generate as many tickets as want, but none of them are going to be selectible
   * for prices if he don't buy it
   *
   * @param generateTicketPrice is the price that users pays to generate a ticket without buying it
   * @param purchaseTicketPrice is the price that users pays to actually buy a ticket to participate in the game
   * @param oraclizeGasLimit is the limit of gas for every oraclize query. Is important to have a good idea of the price of the query
   * because oraclize don't send back the remaining gas
   * @param oraclizeCustomGasPrice is the price of the gas for the oraclize querys
   */
  uint public generateTicketPrice = 0.02 ether;
  uint public purchaseTicketPrice = 0.019 ether;
  uint public oraclizeGasLimit = 3000000 wei;
  uint public oraclizeCustomGasPrice = 4000000000 wei;


  /** @param settingLucky7Numbers is a circuit breaker to stop users of buying tickets while the game is getting setted
   *i.e. when a new game is started, previous winners are erased, the Lucky7Numbers are getting setted and prizes are delivered.
   */
  bool public settingLucky7Numbers = true;
  event SettingNumbersChanged(bool settingLucky7Numbers);

  /** @dev Function to toggle the settingLucky7Numbers to stop users to buy tickets.
   */
  function toggleLucky7Setting() public onlyLucky7AdminRole {
    settingLucky7Numbers = !settingLucky7Numbers;
    emit SettingNumbersChanged(settingLucky7Numbers);
  }

  /** @param gameID is the number of the current draw. Is used to help storage Lucky7Tickets, look up for current game winners and others functions.
   * Is incremented by 1 everytime a new game is setted.
   * @param indexForLucky7Array is a uint used to count the number of Lucky7Numbers generated everytime a new game is setted. Is used to know if all the Lucky7Numbers
   * were setted, and if they did, order them by them values in ascendant order and let users start buying tickets. Is setted to 0 after all this process.
   */
  uint public gameID = 0;
  uint public indexForLucky7Array = 0;


  /** @param initialLucky7TicketPosition is a uint used for the _orderLucky7Tickets function of this contract. 
   * Because is necessary to store the information of previous games permanently is necessary then to know what it the starting point to store in the 
   * lucky7TicketsArray array of the Lucky77TicketFactory.sol contract. 
   * This way, the _orderLucky7Tickets function starts storing in the "initialLucky7TicketPosition" and finish storing in the 
   * "numberOfLucky7Numbers+initialLucky7TicketPosition" position of the lucky7TicketsArray array. 
   * Defaults to 0, and is getting incremented by "numberOfLucky7Numbers" value every time the setNewGame function of this contract is called.
   */
  uint public initialLucky7TicketPosition = 0;

  //---------------------------------------- ARRAYS ----------------------------------------    

  /** @dev The next two arrays are used to store information of the game permanently.
   * @param lucky7TicketsArray stores the Lucky7Tickets once a new game is setted.
   * @param ticketsArray stores the tickets everytime a user buys a ticket.
   * @param lucky7NumbersArray stores the Lucky7Numbers for the current draw. Once a new game is called, it is cleand to 0 to be reused.
   */
  Lucky7Structs.Lucky7Ticket[] public lucky7TicketsArray;
  Lucky7Structs.Ticket[] public ticketsArray;
  Lucky7Structs.Lucky7Number[7] public lucky7NumbersArray;


  //---------------------------------------- MAPPINGS ----------------------------------------

  /** @dev The next three mapping are used to state the Lucky7Ticket values while a game is on course. This is because is expensive to look up on the Lucky7Ticket
   * struct everytime a new ticket is inserted in the tickets array.
   * They all maps from the lucky7NumberID, i.e. the id of the Lucky7Number of the current game.
   * @param lucky7TicketDifference points to an uint which is the difference between the Lucky7Number of it _KeyType and the ticket selected as Lucky7Ticket,
   * e.g. lucky7TicketDifference[0] is the difference between the first Lucky7Number with the ticket which was selected as his Lucky7Ticket.
   * @param lucky7TicketOwner points to the address of the owner of the Lucky7Ticket associated to the Lucky7Number of it _KeyType,
   * e.g. lucky7TicketOwner[0] is the owner of the Lucky7Ticket associated to the first Lucky7Number.
   * @param lucky7TicketID points to the id of the ticket which was selected as Lucky7Ticket for the Lucky7Number of it _KeyType,
   * e.g. lucky7TicketID[0] is the ticketID of the ticket owned by lucky7TicketOwner[0], with a difference of lucky7TicketDiffference[0] with the Lucky7Number[0].
   */
  mapping(uint => uint) public lucky7TicketDifference;
  mapping(uint => address) public lucky7TicketOwner;
  mapping(uint => uint) public lucky7TicketValue;
  mapping(uint => uint) public lucky7TicketID;
  mapping(address => Lucky7Structs.PrizeInfo) public pendingWithdrawals;

  /** @dev Because addresses are not correlatives, is better to use a mapping.
   * @param userValues maps from the user address to it UserParametersValue struct.
   */
  mapping(address => Lucky7Structs.UserParametersValue) public userValues;

  //---------------------------------------- STORAGE FUNCTIONS ----------------------------------------

  function storageTicket(string memory _mu, string memory _i, uint _ticketValue, address _owner)
  public
  onlyLucky7TicketFactoryRole
  returns(uint) {
    uint id = ticketsArray.push(Lucky7Structs.Ticket(_mu, _i, _ticketValue, _owner, gameID)) - 1;
    return id;
  }

  function storageLucky7Number(string memory _mu, string memory _i, uint _ticketValue)
  public
  onlyLucky7TicketFactoryRole {
    lucky7NumbersArray[indexForLucky7Array] = Lucky7Structs.Lucky7Number(_mu, _i, _ticketValue, gameID);
    indexForLucky7Array++;
  }

  function storageNewLucky7Ticket(uint _ticketID, uint _difference, uint positiion)
  public
  onlyLucky7TicketFactoryRole {
    lucky7TicketOwner[positiion] = ticketsArray[_ticketID].owner;
    lucky7TicketDifference[positiion] = _difference;
    lucky7TicketID[positiion] = _ticketID;
    lucky7TicketValue[positiion] = ticketsArray[_ticketID].ticketValue;
  }

  function storageMuParameterReceived(address parameterOwner, string memory mu)
  public
  onlyLucky7TicketFactoryRole {
    userValues[parameterOwner].mu = mu;
    userValues[parameterOwner].muReady = true;
  }

  function storageIParameterReceived(address parameterOwner, string memory i)
  public
  onlyLucky7TicketFactoryRole {
    userValues[parameterOwner].i = i;
    userValues[parameterOwner].muReady = true;
  }

  function storageNewTicketReceived(address parameterOwner, uint ticketValue)
  public
  onlyLucky7TicketFactoryRole {
    userValues[parameterOwner].ticketValue = ticketValue;
    userValues[parameterOwner].userPaidTicket = false;
  }

  function storageUserPaidTicket(address _ticketOwner)
  public
  onlyLucky7RaffleRole {
    userValues[_ticketOwner].userPaidTicket = true;
  }

  function storageSetParametersToReady(address _ticketOwner)
  public
  onlyLucky7RaffleRole {
    userValues[_ticketOwner].muReady = true;
    userValues[_ticketOwner].iReady = true;
  }

  function storageIncrementGameID()
  public
  onlyLucky7RaffleRole {
    gameID++;
  }

  function storageSetInitialLucky7TicketPosition()
  public
  onlyLucky7RaffleRole {
    initialLucky7TicketPosition = gameID * numberOfLucky7Numbers;
  }

  function storageSetIndexForLucky7Array(uint _indexForLucky7Array)
  public
  onlyLucky7RaffleRole {
    indexForLucky7Array = _indexForLucky7Array;
  }
  // Join with storageSetParametersToReady
  function storageSetParametersReadyToFalse(address _owner)
  public
  onlyLucky7RaffleRole {
    userValues[_owner].muReady = false;
    userValues[_owner].iReady = false;
  }

  function storageSortedLucky7Number(Lucky7Structs.Lucky7Number[7] memory lucky7Numbers)
  public
  onlyLucky7RaffleRole {
    lucky7NumbersArray = lucky7Numbers;
  }

  function storageStoreLucky7Ticket(Lucky7Structs.Lucky7Ticket memory lucky7Ticket)
  public
  onlyLucky7RaffleRole {
    lucky7TicketsArray.push(lucky7Ticket);
  }

  event Lucky7TicketStored(uint difference, address indexed owner, uint ticketID, uint ticketValue, uint lucky7Number, uint lucky7NumberID, uint gameID, uint prize, string mu, string i);

  function storageDeliverPrizesInfo(uint winnersPrize) public onlyLucky7RaffleRole {
    uint i;
    uint prizeCounter = numberOfLucky7Numbers;
    for (i = initialLucky7TicketPosition; i < numberOfLucky7Numbers + initialLucky7TicketPosition; i++) {
      if (lucky7TicketsArray[i].owner != address(0x0)) {
        if (pendingWithdrawals[lucky7TicketsArray[i].owner].gameID != gameID) {
          pendingWithdrawals[lucky7TicketsArray[i].owner].amount = winnersPrize.mul(prizeCounter);
        } else {
          pendingWithdrawals[lucky7TicketsArray[i].owner].amount += winnersPrize.mul(prizeCounter);
        }
        pendingWithdrawals[lucky7TicketsArray[i].owner].gameID = gameID;
        lucky7TicketsArray[i].prize = winnersPrize.mul(prizeCounter);
        prizeCounter -= 1;
      }
      string memory userMu = lucky7TicketsArray[i].owner != address(0x0) ? ticketsArray[lucky7TicketsArray[i].ticketID].mu : "0";
      string memory userI = lucky7TicketsArray[i].owner != address(0x0) ? ticketsArray[lucky7TicketsArray[i].ticketID].i : "0";
      emit Lucky7TicketStored(
        lucky7TicketsArray[i].difference,
        lucky7TicketsArray[i].owner,
        lucky7TicketsArray[i].ticketID,
        lucky7TicketsArray[i].ticketValue,
        lucky7TicketsArray[i].lucky7Number,
        lucky7TicketsArray[i].lucky7NumberID,
        lucky7TicketsArray[i].gameID,
        lucky7TicketsArray[i].prize,
        userMu,
        userI);
    }
  }

  function storageCleanMappings() public onlyLucky7RaffleRole {
    for (uint i = 0; i < numberOfLucky7Numbers; i++) {
      lucky7TicketDifference[i] = 0;
      lucky7TicketOwner[i] = address(0x0);
      lucky7TicketID[i] = 0;
      lucky7TicketValue[i] = 0;
      lucky7NumbersArray[i].mu = "0";
      lucky7NumbersArray[i].i = "0";
      lucky7NumbersArray[i].ticketValue = 0;
      lucky7NumbersArray[i].gameID = gameID;
    }
  }

  function storagePendingWithdrawal(address _withdrawalOwner, uint _value)
  public
  onlyLucky7RaffleRole {
    pendingWithdrawals[_withdrawalOwner].amount = _value;
  }

  function storageOrderLucky7Numbers()
  public
  onlyLucky7RaffleRole {
    Lucky7Structs.Lucky7Number memory smallest;
    uint aux;
    uint x;
    uint y;
    for (y = 0; y < numberOfLucky7Numbers; y++) {
      /** @dev At this point, aux is going to be ever equal to y and smallest is the Lucky7Number which is going to be compared with the next.
       */
      aux = y;
      smallest = lucky7NumbersArray[y];
      for (x = y + 1; x < numberOfLucky7Numbers; x++) {
        /** @dev At this point, the function starts comparing "smallest" with the next to it, x+1 in this case.
         * If "smallest" is not smaller than the next ticketValue (or Lucky7Number[x] value), then it saves the value of the new "smallest" value, 
         * and saves aux as the x value.
         */
        if (smallest.ticketValue > lucky7NumbersArray[x].ticketValue) {
          smallest = lucky7NumbersArray[x];
          aux = x;
        }
      }

      /** @dev Once the previous loop is finished, i.e. the comparison of "smallest" with all the other above it, it checks if aux changed.
       * If it changed, it means that there was one Lucky7Number which value was lower than "smallest", and change the position of "smallest" with the Lucky7Number[j]
       * which is actually smalller than "smallest". This way, in next hopes former "smallest" Lucky7Number is going to be compared again until it fits the state of
       * "smallest than every Lucky7Number above itself"
       */
      if (aux != y) {
        lucky7NumbersArray[aux] = lucky7NumbersArray[y];
        lucky7NumbersArray[y] = smallest;
      }
    }

  }
  //---------------------------------------- HELPERS ----------------------------------------

  function getLucky7NumbersValues() public view returns(uint[] memory) {
    uint[] memory lucky7Numbers;
    for (uint i = 0; i < 7; i++) {
      lucky7Numbers[i] = lucky7NumbersArray[i].ticketValue;
    }
    return lucky7Numbers;
  }

  function getPrizeInfo(address owner) public view returns(uint, uint) {
    return (pendingWithdrawals[owner].amount, pendingWithdrawals[owner].gameID);
  }

  function getTicketsArrayLength() public view returns(uint) {
    return ticketsArray.length;
  }

  //---------------------------------------- TEST FUNCTIONS ----------------------------------------

  /** @dev This four functions are purely designed for testing purposes and are going to be erased when the contract
   * is deployed to test or main net. They're straight forward and don't need any explanaiton.
   * They're setted to onlyLucky7AdminRole to be sure that, in case of forgetting to erase them, no user is capable to use them
   * maliciously.
   */

  event Lucky7NumberInserted(uint value, uint index);

  function insertLucky7Numbers(uint[] memory values) public onlyLucky7AdminRole {
    for (uint i = 0; i < 7; i++) {
      lucky7NumbersArray[i] = Lucky7Structs.Lucky7Number("mu", "i", values[i], gameID);
      emit Lucky7NumberInserted(values[i], i);
    }
    indexForLucky7Array = 7;
  }

  function setIndexForLucky7Array(uint _newValue) public onlyLucky7AdminRole {
    indexForLucky7Array = _newValue;
  }
}
