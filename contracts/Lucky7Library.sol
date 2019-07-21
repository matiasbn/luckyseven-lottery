pragma solidity ^ 0.5 .0;

library Lucky7Library {
  function uintToString(uint _data) public pure returns(string memory) {
    bytes32 data = bytes32(_data);
    bytes memory bytesString = new bytes(32);
    for (uint j = 0; j < 32; j++) {
      byte char = byte(bytes32(uint(data) * 2 ** (8 * j)));
      if (char != 0) {
        bytesString[j] = char;
      }
    }
    return string(bytesString);
  }

  function generateBadRandomNumber(uint nonce) public view returns(uint) {
    return uint(keccak256(abi.encodePacked(now, msg.sender, nonce))) % 9999;
  }
}
