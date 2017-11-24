pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Ballot.sol";

contract TestBallot {

  function testInitialBalanceUsingDeployedContract() {
    Ballot ballot = Ballot(DeployedAddresses.Ballot());

    uint expected = 10000;

    Assert.equal(ballot.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

  function testGetBalance() {
    Ballot ballot = Ballot(DeployedAddresses.Ballot());
    uint expected = 10000;
    address account = 0x8a02c171e3431f464be91d27cd66ed96c9534e86;
    Assert.equal(ballot.getBalance(account), expected, "Owner should have 10000 MetaCoin initially");
  }

  function testSendCoin() {
    Ballot ballot = Ballot(DeployedAddresses.Ballot());
    uint expected = 10000 - 1;
    address to = 0x9d5045488d841545b805165a5b138e421cf6f29f;
    address account = 0x8a02c171e3431f464be91d27cd66ed96c9534e86;
    ballot.sendCoin(to, 1);
    Assert.equal(ballot.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }
}
