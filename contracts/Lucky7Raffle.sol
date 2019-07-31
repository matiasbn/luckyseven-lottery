/**
 * @author Matias Barrios
 * @version 1.0
 */

/** @title Lucky7Raffle. 
 * This contract contains all the functions to start a new game and deliver prizes.
 * Particularly contains function that have the business logic for generating Lucky7Numbers and Lucky7Tickets, order them, deliver prizes and clean necessary arrays.
 */

pragma solidity ^ 0.5 .0;

import "./Lucky7TicketFactory.sol";

contract Lucky7Raffle is Lucky7TicketFactory {
  bool isLocalBlockchain;
  constructor(address _lucky7Lighthouse, bool _isRhombusAvailable, bool _isLocalBlockchain)
  public
  payable
  Lucky7TicketFactory(_lucky7Lighthouse, _isRhombusAvailable) { // To initialize Lucky7TicketFactory constructor with Rhombus lighthouse
    isLocalBlockchain = _isLocalBlockchain;
  }

  /**
   * @dev To communicate front end that a new game was stablished
   */
  event NewGameStarted(uint gameID);
  event Lucky7TicketStored(uint difference, address indexed owner, uint ticketID, uint ticketValue, uint lucky7Number, uint lucky7NumberID, uint gameID, uint prize, string mu, string i);
  event PrizeClaimed(address indexed owner, uint gameID, uint amount);
  /** @dev This modifier is meant to block the Lucky7Number generation when the game is on course
   * Is used to block the action of the _generateLucky7Number function of this contract if the circuit breaker
   * is not 
   */
  modifier gameNotInCourse() {
    require(settingLucky7Numbers == true);
    _;
  }

  modifier prizesDeliveryEnabled() {
    bool potReached;
    bool timeReached;
    (, potReached, timeReached) = validateDelivery();
    if(isLocalBlockchain == true){
      require((potReached == true && timeReached == true) || isOwner());
    }
    else{
      require(potReached == true && timeReached == true);
    }
    _;
  }
  /** @param initialLucky7TicketPosition is a uint used for the _orderLucky7Tickets function of this contract. 
    * Because is necessary to store the information of previous games permanently is necessary then to know what it the starting point to store in the 
    * lucky7TicketsArray array of the Lucky77TicketFactory.sol contract. 
    * This way, the _orderLucky7Tickets function starts storing in the "initialLucky7TicketPosition" and finish storing in the 
    * "numberOfLucky7Numbers+initialLucky7TicketPosition" position of the lucky7TicketsArray array. 
    * Defaults to 0, and is getting incremented by "numberOfLucky7Numbers" value every time the setNewGame function of this contract is called.
    * @param currentTicketID is a uint which points to the position in the ticketsArray array of the Lucky7TicketFactory contract where was pushed the last ticket
    * inserted by the insertCustomizedTicket function of this contract. That function and this parameter are used for testing purposes only.
    * @param prizeWinner1 is and address which stores the address of the last first prize winner. Is setted on the _deliverPrizes function of this contract 
    * and is used to set to 0 the amount of the prize for the last first prize winner before start delivering prizes for security reasons.
    * @param prizeWinner2 is and address which stores the address of the last second prize winner. Is setted on the _deliverPrizes function of this contract 
    * and is used to set to 0 the amount of the prize for the last second prize winner before start delivering prizes for security reasons.
    * @param prizeWinner3 is and address which stores the address of the last third prize winner. Is setted on the _deliverPrizes function of this contract 
    * and is used to set to 0 the amount of the prize for the last third prize winner before start delivering prizes for security reasons.
    * @param prizeAmount1 is and uint which stores the amount of the last first prize. Is setted on the _deliverPrizes function of this contract.
    * @param prizeAmount2 is and uint which stores the uint of the last second prize winner. Is setted on the _deliverPrizes function of this contract.
    * @param prizeAmount3 is and uint which stores the uint of the last third prize winner. Is setted on the _deliverPrizes function of this contract.
    * @param pendingWithdrawals is a mapping that points from an address to an uint. Is used for the _deliverPrizes function of this contract to store the 
    * the correspondent prize with the correspondent winner. The prizes are setted to 0 every time the _deliverPrizes function is called for security reasons.
    * To claim a prize, user have to call the withdraw function of this contract, so the prize is delivered and the amount for him prize is setted to 0 again.
    
    */
  uint public initialLucky7TicketPosition = 0;
  uint public currentTicketID = 0;
  struct PrizeInfo {
    uint amount;
    uint gameID;
  }
  mapping(address => PrizeInfo) public pendingWithdrawals;

  /** @dev setNewGame is a function designed to call all the functions necessary to start a new game. First, it activate the settingLucky7Numbers circuit breaker.
   * Then it stores and order the Lucky7Tickets in ascendante order depending on them difference values through the _orderLucky7Tickets. 
   * Then it set the prizes for the last winners to 0 (for security reasons), look up for Lucky7Tickets with owners different than 0 and update the 
   * pendingWithdrawals for the first, second and third winnner, deliver the prize for the enterprise, clean the necessary mappings and arrays (lucky7NumbersArray), 
   * increase the gameID parameter to differentiate the Lucky7Tickets and Tickets from each different game in the future, and update the value
   * of the initialLucky7TicketPosition to store the Lucky7Tickets for every game correctly.
   */
  function setNewGame()
  public
  prizesDeliveryEnabled {
    require(ticketsArray.length != 0);
    toggleLucky7Setting();
    _orderLucky7Tickets();
    _deliverPrizes();
    _cleanMappings();
    gameID++;
    pendingWithdrawals[msg.sender].amount += newGameSettedPrize;
    pendingWithdrawals[msg.sender].gameID = gameID;
    ticketsGenerated = 0;
    ticketsPurchased = 0;
    lastDelivery = now;
    initialLucky7TicketPosition = gameID * numberOfLucky7Numbers;
  }

  /** @dev _generateLucky7Number is the function that is actually used to generate the Lucky7Numbers. It have the business logic for generating the Lucky7Numbers, i.e. if 
   * the indexForLucky7Array is different than the numberOfLucky7Numbers, then sets the muReady and iReady booleans of the UserParametersValue struct of the 
   * Lucky7TicketFactory contract to true and calls for the _askForMuParameter and _askForIParameter function of the Lucky7TicketFactory contract. This way it can ask for both mu and i parameters
   * to oraclize and when the oraclize respond with both, ask for a ticket which is going to be a Lucky7Number.
   * If the indexForLucky7Array is equal to the numberOfLucky7Numbers, then proceed to order the Lucky7Numbers through the _orderLucky7Numbers function of this contract.
   * Then it sets the indexForLucky7Array to 0 so the next time a new game is setted, this function starts storing the Lucky7Numbers from the position 0, to finally shut off
   * the settingLucky7Numbers circuit breaker to allow users to start buying tickets.
   */
  function _generateLucky7Number() public gameNotInCourse {
    require(waitingForLucky7Number == false);
    if (indexForLucky7Array == numberOfLucky7Numbers) {
      waitingForLucky7Number = true;
      _orderLucky7Numbers();
      indexForLucky7Array = 0;
      toggleLucky7Setting();
      waitingForLucky7Number = false;
      pendingWithdrawals[msg.sender].amount += newLucky7NumberPrize;
      pendingWithdrawals[msg.sender].gameID = gameID;
    } else {
      waitingForLucky7Number = true;
      userValues[address(this)].muReady = false;
      userValues[address(this)].iReady = false;
      _generateTicket(address(this));
      pendingWithdrawals[msg.sender].amount += newLucky7NumberPrize;
      pendingWithdrawals[msg.sender].gameID = gameID;
    }
  }

  /** @dev _orderLucky7Numbers is a function designed to order the Lucky7Numbers. It is called from the _generateLucky7Number function of this contract (above function).
   * First, it generates 4 auxiliary parameters; a Lucky7Number struct called smallest, and aux, j and i which are uint initiated to 0.
   * Then it loops over the Lucky7Numbers array, comparing the i Lucky7Number value with the i+1, i+2, i+3 until reachs the numberOfLucky7Numbers-1 value. 
   * If none of them is smaller than it, then jumps to the next Lucky7Number. It then starts comparing it (the i+1 for this case) with the subsequents number. If one of 
   * them is smaller, changes positions and starts comparing the new one with the subsequents. 
   */
  function _orderLucky7Numbers() public onlyOwner {
    Lucky7Number memory smallest;
    uint aux;
    uint j;
    uint i;
    for (i = 0; i < numberOfLucky7Numbers; i++) {
      /** @dev At this point, aux is going to be ever equal to i and smallest is the Lucky7Number which is going to be compared with the next.
       */
      aux = i;
      smallest = lucky7NumbersArray[i];
      for (j = i + 1; j < numberOfLucky7Numbers; j++) {
        /** @dev At this point, the function starts comparing "smallest" with the next to it, j+1 in this case.
         * If "smallest" is not smaller than the next ticketValue (or Lucky7Number[j] value), then it saves the value of the new "smallest" value, 
         * and saves aux as the j value.
         */
        if (smallest.ticketValue > lucky7NumbersArray[j].ticketValue) {
          smallest = lucky7NumbersArray[j];
          aux = j;
        }
      }

      /** @dev Once the previous loop is finished, i.e. the comparison of "smallest" with all the other above it, it checks if aux changed.
       * If it changed, it means that there was one Lucky7Number which value was lower than "smallest", and change the position of "smallest" with the Lucky7Number[j]
       * which is actually smalller than "smallest". This way, in next hopes former "smallest" Lucky7Number is going to be compared again until it fits the state of
       * "smallest than every Lucky7Number above itself"
       */
      if (aux != i) {
        lucky7NumbersArray[aux] = lucky7NumbersArray[i];
        lucky7NumbersArray[i] = smallest;
      }
    }
  }
  /** @dev _orderLucky7Tickets is a function designed to store and order the Lucky7Tickets according to its difference in asceding order.
   * First, it stores all the current Lucky7Ticket values, i.e. lucky7TicketDifference, lucky7TicketOwner and lucky7TicketID mappings from the Lucky7TicketFactory contract,
   * the ticketValue associated to it, the Lucky7Number and Lucky7NumberID (first, second, third) associated to it, and the gameID. This is thought to be capable of verify
   * in the future possible problems delivering prizes.
   * Then, it order the Lucky7Tickets depending on them difference value of the Lucky7Ticket struct of the Lucky7TicketFactory contract. The order logic is the same defined
   * in the _orderLucky7Numbers function of this contract (the above function).
   */
  function _orderLucky7Tickets() public onlyOwner {
    Lucky7Ticket memory smallest;
    uint aux;
    uint i;
    uint j;
    uint k;
    for (i = 0; i < numberOfLucky7Numbers; i++) {
      uint lucky7TicketValue = lucky7TicketOwner[i] != address(0x0) ? ticketsArray[lucky7TicketID[i]].ticketValue : 0;
      lucky7TicketsArray.push(Lucky7Ticket(lucky7TicketDifference[i], lucky7TicketOwner[i], lucky7TicketID[i], lucky7TicketValue, lucky7NumbersArray[i].ticketValue, i, gameID, 0));
    }
    for (j = initialLucky7TicketPosition; j < numberOfLucky7Numbers + initialLucky7TicketPosition; j++) {
      aux = j;
      smallest = lucky7TicketsArray[j];
      for (k = j + 1; k < numberOfLucky7Numbers + initialLucky7TicketPosition; k++) {
        if (smallest.difference > lucky7TicketsArray[k].difference) {
          smallest = lucky7TicketsArray[k];
          aux = k;
        }
      }
      if (aux != j) {
        lucky7TicketsArray[aux] = lucky7TicketsArray[j];
        lucky7TicketsArray[j] = smallest;

      }
    }
  }
  /** @dev _deliverPrizes is a function designed to complete the business logic of the deliver prizes phase.
   * First, it takes the balance of prizes of the previous winners to 0 for security reasons (explained in the paper of the project).
   * Then it proceeds to calculate the amount of the prizes. The winners lot is 70% of the accumulated earnings,i.e. 70% of the contract balance.
   * Of that amount, 60% is for the first prize, 30% is for the second prize and 10% for the third prize.
   * The function then proceeds to check if, starting in the initialLucky7TicketPosition (the first Lucky7Ticket of the current game ordered by difference in ascending order)
   * belongs to a user, i.e. it address is not 0. If it's different than 0, then sets the prize for that address to the first prize amount on the pendingWithdrawals mapping, 
   * saves it adddress in prizeWinner1 to set it prize to 0 in the next new game setting and breaks the loop to deliver the second place prize.
   * It is not automatically delivered to the first prize winner to avoid DoS with (Unexpected) revert attack, i.e. one or more of the winners address isn't
   * capable of receiving ether and cut the transaction, stucking the contract function to deliver prizes to real winners.
   * After update the pendingWithdrawals mapping for payment for the first prize winner, it proceeds the same way with the second and third winner, to finally deliver the
   * enterprise prize automatically, because is a known address and is first setted as the owner of the contract. 
   */
  function _deliverPrizes() public onlyOwner {
    uint winnersPrize = address(this).balance.mul(7);
    winnersPrize = winnersPrize.div(280);
    uint i;
    uint prizeCounter = 7;
    for (i = initialLucky7TicketPosition; i < numberOfLucky7Numbers + initialLucky7TicketPosition; i++) {
      if (lucky7TicketsArray[i].owner != address(0x0)) {
        if (pendingWithdrawals[lucky7TicketsArray[i].owner].gameID != gameID + 1) {
          pendingWithdrawals[lucky7TicketsArray[i].owner].amount = winnersPrize.mul(prizeCounter);
        } else {
          pendingWithdrawals[lucky7TicketsArray[i].owner].amount += winnersPrize.mul(prizeCounter);
        }
        pendingWithdrawals[lucky7TicketsArray[i].owner].gameID = gameID + 1;
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
    uint enterprisePrize = address(this).balance.mul(3);
    enterprisePrize = enterprisePrize.div(10);
    lucky7Wallet.transfer(enterprisePrize);
  }

  /** @dev _cleanMappings is a function used by the setNewGame function of this contract to clean the necessary mappings, 
   * i.e. lucky7TicketDifference, lucky7TicketOwner, lucky7TicketID, lucky7NumbersArray, ExactLucky7TicketValue, ExactLucky7TicketOwner and
   * ExactLucky7TicketID. This, because for new games the old winners needs to been cleaned up.
   */
  //Should clean 
  function _cleanMappings() public {
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
  /** @dev withdraw is a function used for winners to claim them prices. It is updated in the _deliverPrizesFunction of this contract to
   * state the owners of the first, second and third prize. It is used to avoid DoS with (Unexpected) revert attack.
   */
  function withdraw() public {
    PrizeInfo memory prize = pendingWithdrawals[msg.sender];
    uint amount = prize.amount;
    require(prize.gameID == gameID && (prize.amount != 0));
    pendingWithdrawals[msg.sender].amount = 0;
    msg.sender.transfer(amount);
    emit PrizeClaimed(msg.sender, gameID, amount);
  }

  /** @dev Fallback function to make this contract payable.
   */
  function () external payable {

  }
}
