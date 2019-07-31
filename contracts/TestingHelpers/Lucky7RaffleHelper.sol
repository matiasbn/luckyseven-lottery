pragma solidity ^ 0.5 .0;

import '../Lucky7Raffle.sol';

contract Lucky7RaffleHelper is Lucky7Raffle {
  /** @dev This four functions are purely designed for testing purposes and are going to be erased when the contract
   * is deployed to test or main net. They're straight forward and don't need any explanaiton.
   * They're setted to to be sure that, in case of forgetting to erase them, no user is capable to use them
   * maliciously.
   */

  constructor(address _lucky7Lighthouse, bool _isRhombusAvailable, bool _isLocalBlockchain)
  public
  payable
  Lucky7Raffle(_lucky7Lighthouse, _isRhombusAvailable, _isLocalBlockchain) {

  }

  function insertCustomizedLucky7Number(uint _id, string memory _mu, string memory _i, uint _ticketValue, uint _drawNumber) public {
    lucky7NumbersArray[_id] = Lucky7Number(_mu, _i, _ticketValue, _drawNumber);
  }

  function insertCustomizedTicket(string memory _mu, string memory _i, uint _ticketValue, address _ticketOwner, uint _drawNumber)
  public
  returns(uint) {
    uint id = ticketsArray.push(Ticket(_mu, _i, _ticketValue, _ticketOwner, _drawNumber)) - 1;
    currentTicketID = id;
  }

  function setIndexForLucky7Array(uint _newValue) public {
    indexForLucky7Array = _newValue;
  }

  function setInitialLucky7TicketPosition(uint _newValue) public {
    initialLucky7TicketPosition = _newValue;
  }
}
