/**
 * @author Matias Barrios
 * @version 1.0
 */


/** @title Lucky7Admin. 
 * This contract contains all the functions to manage the game. 
 * All the functions inside this contract are setted with the onlyOwner modifier.
 */

pragma solidity ^ 0.5 .0;
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

// import "./Ownable.sol";
// import "./SafeMath.sol";

contract Lucky7Admin is Ownable {

  uint public lastDelivery;
  constructor() public {
    lastDelivery = now;
  }

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
   * @param ticketsGenerated amount of tickets generated during currentGame
   * @param ticketsPurchased amount of tickets purchased during currentGame
   * @param expectedPrize amount of expected prize before users can set new game
   * @param expectedGameTime amount of expected time elapsed before users can set new game
   * @param newGameSettedPrize prize for setting a new game.
   * @param newLucky7NumberPrize prize for setting a new Lucky7Number.
   */
   
  uint public generateTicketPrice = 0.005 ether;
  uint public purchaseTicketPrice = 0.01 ether;
  uint public oraclizeGasLimit = 3000000 wei;
  uint public oraclizeCustomGasPrice = 400000000 wei;
  uint public ticketsGenerated = 0;
  uint public ticketsPurchased = 0;
  uint public expectedPrize = 100 ether;
  uint public expectedGameTime = 28 days;
  uint public newGameSettedPrize = 0.1 ether;
  uint public newLucky7NumberPrize = 0.05 ether;

/**
  * @notice function to determine if users are able to deliver prizes or not.
 */
  function validateDelivery() public view returns(uint, bool, bool) {
    uint oraclizePrice = oraclizeGasLimit * oraclizeCustomGasPrice;
    uint generateDelta = generateTicketPrice - oraclizePrice;
    uint purchaseDelta = purchaseTicketPrice - oraclizePrice;
    uint currentPot = ticketsPurchased * purchaseDelta + ticketsGenerated * generateDelta;
    return (currentPot, currentPot >= expectedPrize, now >= lastDelivery + expectedGameTime);
  }

  /**
   * @param lucky7Wallet is the address of the wallet which will recieve 30% of the balance of this contract when the prizes are delivered
   */

  address payable lucky7Wallet = address(uint160(owner()));

  function () external payable {}
}
