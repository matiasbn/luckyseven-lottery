pragma solidity ^ 0.5 .0;

import "../Lucky7Store.sol";

contract Lucky7StoreHelper is Lucky7Store {

  constructor(address _lucky7Lighthouse, bool _isRhombusAvailable, bool _isLocalBlockchain)
  public
  payable
  Lucky7Store(_lucky7Lighthouse, _isRhombusAvailable, _isLocalBlockchain) {

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
