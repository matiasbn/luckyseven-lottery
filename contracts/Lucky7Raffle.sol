/**
 * @author Matias Barrios
 * @version 1.0
 */

/** @title Lucky7Raffle. 
 * This contract contains all the functions to start a new game and deliver prizes.
 * Particularly contains function that have the business logic for generating Lucky7Numbers and Lucky7Tickets, order them, deliver prizes and clean necessary arrays.
 */

pragma solidity ^0.5.0;

import "./Lucky7Store.sol";
import "./Lucky7Storage.sol";
import "./Lucky7Structs.sol";
import "./Lucky7TicketFactory.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";


contract Lucky7Raffle is Lucky7Store, Ownable {
  using SafeMath
  for uint256;
  using Lucky7Structs
  for *;

  Lucky7Storage lucky7StorageContract;
  Lucky7TicketFactory lucky7TicketFactoryContract;

  constructor(address payable lucky7StorageContractAddress, address payable lucky7TicketFactoryContractAddress) internal payable {
    lucky7StorageContract = Lucky7Storage(lucky7StorageContractAddress);
    lucky7TicketFactoryContract = Lucky7TicketFactory(lucky7TicketFactoryContractAddress);
  }

  event NewGameStarted(uint gameID);
  // event Lucky7TicketStored(uint difference, address indexed owner, uint ticketID, uint ticketValue, uint lucky7Number, uint lucky7NumberID, uint gameID, uint prize, string mu, string i);
  event PrizeClaimed(address indexed owner, uint gameID, uint amount);
  /** @dev This modifier is meant to block the Lucky7Number generation when the game is on course
   * Is used to block the action of the generateLucky7Number function of this contract if the circuit breaker
   * is not 
   */
  modifier gameNotInCourse() {
    require(lucky7StorageContract.settingLucky7Numbers() == true);
    _;
  }

  /** @dev setNewGame is a function designed to call all the functions necessary to start a new game. First, it activate the settingLucky7Numbers circuit breaker.
   * Then it stores and order the Lucky7Tickets in ascendante order depending on them difference values through the orderLucky7Tickets. 
   * Then it set the prizes for the last winners to 0 (for security reasons), look up for Lucky7Tickets with owners different than 0 and update the 
   * pendingWithdrawals for the first, second and third winnner, deliver the prize for the lucky7Onwer, clean the necessary mappings and arrays (lucky7NumbersArray), 
   * increase the gameID parameter to differentiate the Lucky7Tickets and Tickets from each different game in the future, and update the value
   * of the initialLucky7TicketPosition to store the Lucky7Tickets for every game correctly.
   */
  function setNewGame()
  public
  onlyOwner {
    require(lucky7StorageContract.getTicketsArrayLength() != 0);
    lucky7StorageContract.toggleLucky7Setting();
    orderLucky7Tickets();
    deliverPrizes();
    cleanMappings();
    lucky7StorageContract.storageIncrementGameID();
    lucky7StorageContract.storageSetInitialLucky7TicketPosition();
    emit NewGameStarted(lucky7StorageContract.gameID());
  }

  /** @dev generateLucky7Number is the function that is actually used to generate the Lucky7Numbers. It have the business logic for generating the Lucky7Numbers, i.e. if 
   * the indexForLucky7Array is different than the numberOfLucky7Numbers, then sets the muReady and iReady booleans of the UserParametersValue struct of the 
   * Lucky7TicketFactory contract to true and calls for the _askForMuParameter and _askForIParameter function of the Lucky7TicketFactory contract. This way it can ask for both mu and i parameters
   * to oraclize and when the oraclize respond with both, ask for a ticket which is going to be a Lucky7Number.
   * If the indexForLucky7Array is equal to the numberOfLucky7Numbers, then proceed to order the Lucky7Numbers through the orderLucky7Numbers function of this contract.
   * Then it sets the indexForLucky7Array to 0 so the next time a new game is setted, this function starts storing the Lucky7Numbers from the position 0, to finally shut off
   * the settingLucky7Numbers circuit breaker to allow users to start buying tickets.
   */
  function generateLucky7Number() public onlyOwner gameNotInCourse {
    if (lucky7StorageContract.indexForLucky7Array() == lucky7StorageContract.numberOfLucky7Numbers()) {
      lucky7StorageContract.storageOrderLucky7Numbers();
      lucky7StorageContract.setIndexForLucky7Array(0);
      lucky7StorageContract.toggleLucky7Setting();
    } else {
      lucky7StorageContract.storageSetParametersReadyToFalse(address(this));
      lucky7TicketFactoryContract._generateTicket(address(this));
    }
  }

  /** @dev orderLucky7Tickets is a function designed to store and order the Lucky7Tickets according to its difference in asceding order.
   * First, it stores all the current Lucky7Ticket values, i.e. lucky7TicketDifference, lucky7TicketOwner and lucky7TicketID mappings from the Lucky7TicketFactory contract,
   * the ticketValue associated to it, the Lucky7Number and Lucky7NumberID (first, second, third) associated to it, and the gameID. This is thought to be capable of verify
   * in the future possible problems delivering prizes.
   * Then, it order the Lucky7Tickets depending on them difference value of the Lucky7Ticket struct of the Lucky7TicketFactory contract. The order logic is the same defined
   * in the orderLucky7Numbers function of this contract (the above function).
   */
  function orderLucky7Tickets() public onlyOwner {
    Lucky7Structs.Lucky7Ticket memory smallest;
    uint aux;
    uint i;
    uint k;
    uint numberOfLucky7Numbers = lucky7StorageContract.numberOfLucky7Numbers();
    uint[] memory lucky7Numbers = lucky7StorageContract.getLucky7NumbersValues();
    uint gameID = lucky7StorageContract.gameID();
    Lucky7Structs.Lucky7Ticket[] memory lucky7TicketsArray;
    // Prepare Lucky7Tickets
    for (i = 0; i < numberOfLucky7Numbers; i++) {
      address lucky7TicketOwner = lucky7StorageContract.lucky7TicketOwner(i);
      uint lucky7TicketID = lucky7StorageContract.lucky7TicketID(i);
      uint lucky7TicketDifference = lucky7StorageContract.lucky7TicketDifference(i);
      (, , uint ticketValue, , ) = lucky7StorageContract.ticketsArray(lucky7TicketID);
      uint lucky7TicketValue = lucky7TicketOwner != address(0x0) ? ticketValue : 0;
      Lucky7Structs.Lucky7Ticket memory lucky7Ticket = Lucky7Structs.Lucky7Ticket(lucky7TicketDifference, lucky7TicketOwner, lucky7TicketID, lucky7TicketValue, lucky7Numbers[i], i, gameID, 0);
      lucky7TicketsArray[i] = lucky7Ticket;
    }

    // Sort Lucky7Tickets
    for (i = 0; i < numberOfLucky7Numbers; i++) {
      aux = i;
      smallest = lucky7TicketsArray[i];
      for (k = i + 1; k < numberOfLucky7Numbers; k++) {
        if (smallest.difference > lucky7TicketsArray[k].difference) {
          smallest = lucky7TicketsArray[k];
          aux = k;
        }
      }
      if (aux != i) {
        lucky7TicketsArray[aux] = lucky7TicketsArray[i];
        lucky7TicketsArray[i] = smallest;
      }
      // Store it on Lucky7Storage
      lucky7StorageContract.storageStoreLucky7Ticket(lucky7TicketsArray[i]);
    }
  }
  /** @dev deliverPrizes is a function designed to complete the business logic of the deliver prizes phase.
   * First, it takes the balance of prizes of the previous winners to 0 for security reasons (explained in the paper of the project).
   * Then it proceeds to calculate the amount of the prizes. The winners lot is 70% of the accumulated earnings,i.e. 70% of the contract balance.
   * Of that amount, 60% is for the first prize, 30% is for the second prize and 10% for the third prize.
   * The function then proceeds to check if, starting in the initialLucky7TicketPosition (the first Lucky7Ticket of the current game ordered by difference in ascending order)
   * belongs to a user, i.e. it address is not 0. If it's different than 0, then sets the prize for that address to the first prize amount on the pendingWithdrawals mapping, 
   * saves it adddress in prizeWinner1 to set it prize to 0 in the next new game setting and breaks the loop to deliver the second place prize.
   * It is not automatically delivered to the first prize winner to avoid DoS with (Unexpected) revert attack, i.e. one or more of the winners address isn't
   * capable of receiving ether and cut the transaction, stucking the contract function to deliver prizes to real winners.
   * After update the pendingWithdrawals mapping for payment for the first prize winner, it proceeds the same way with the second and third winner, to finally deliver the
   * lucky7Onwer prize automatically, because is a known address and is first setted as the owner of the contract. 
   */
  function deliverPrizes() public onlyOwner {
    uint winnersPrize = address(this).balance.mul(7);
    winnersPrize = winnersPrize.div(280);
    lucky7StorageContract.storageDeliverPrizesInfo(winnersPrize);
    uint lucky7OwnerPrize = address(this).balance.mul(3);
    lucky7OwnerPrize = lucky7OwnerPrize.div(10);
    lucky7StorageContract.lucky7Wallet().transfer(lucky7OwnerPrize);
  }

  /** @dev cleanMappings is a function used by the setNewGame function of this contract to clean the necessary mappings, 
   * i.e. lucky7TicketDifference, lucky7TicketOwner, lucky7TicketID, lucky7NumbersArray, ExactLucky7TicketValue, ExactLucky7TicketOwner and
   * ExactLucky7TicketID. This, because for new games the old winners needs to been cleaned up.
   */
  function cleanMappings() public {
    lucky7StorageContract.storageCleanMappings();
  }
  /** @dev withdraw is a function used for winners to claim them prices. It is updated in the deliverPrizesFunction of this contract to
   * state the owners of the first, second and third prize. It is used to avoid DoS with (Unexpected) revert attack.
   */
  function withdraw() public {
    (uint amount, uint prizeGameID) = lucky7StorageContract.getPrizeInfo(msg.sender);
    require((prizeGameID == lucky7StorageContract.gameID() - 1) && (amount != 0));
    lucky7StorageContract.storagePendingWithdrawal(msg.sender, 0);
    msg.sender.transfer(amount);
    emit PrizeClaimed(msg.sender, prizeGameID, amount);
  }

  /** @dev Fallback function to make this contract payable.
   */
  function () external payable {

  }
}
