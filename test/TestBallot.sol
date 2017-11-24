pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Ballot.sol";

contract TestBallot {

  // function testInitialBalanceUsingDeployedContract() {
  //   Ballot ballot = Ballot(DeployedAddresses.Ballot());

  //   uint expected = 10000;

  //   Assert.equal(ballot.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  // }

  // function testGetBalance() {
  //   Ballot ballot = Ballot(DeployedAddresses.Ballot());
  //   uint expected = 10000;
  //   address account = 0x8a02c171e3431f464be91d27cd66ed96c9534e86;
  //   Assert.equal(ballot.getBalance(account), expected, "Owner should have 10000 MetaCoin initially");
  // }

  function testSendCoin() {
    Ballot ballot = Ballot(DeployedAddresses.Ballot());
    uint expected = 9900;
    address to = 0x6cd079040c83dc06598050112fee2f7ee82a1547;
    ballot.sendCoin(to, 100);
    Assert.equal(ballot.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

  function testVote() {
     Ballot ballot = Ballot(DeployedAddresses.Ballot());
     bytes32 phone = "012345678"; 
     ballot.vote(
       tx.origin,
       sha3(phone),
       1,
       1
     );
  }
}
