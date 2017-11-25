pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Ballot.sol";

contract TestBallot {

<<<<<<< HEAD
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
=======
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

  // function testSendCoin() {
  //   Ballot ballot = Ballot(DeployedAddresses.Ballot());
  //   uint expected = 9900;
  //   address to = 0x6cd079040c83dc06598050112fee2f7ee82a1547;
  //   ballot.sendCoin(to, 100);
  //   Assert.equal(ballot.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  // }

  // function testVote() {
  //    Ballot ballot = Ballot(DeployedAddresses.Ballot());
  //    bytes32 phone = "012345678"; 
  //    Assert.equal(ballot.getVoteCount(0,0),0, "Error");
  //    Assert.equal(ballot.getVoteCount(0,1),0, "Error");
  //    ballot.vote(
  //      tx.origin,
  //      sha3(phone),
  //      0,
  //      0
  //    );
  //    ballot.vote(
  //      tx.origin,
  //      sha3(phone),
  //      0,
  //      0
  //    );
  //    ballot.vote(
  //      tx.origin,
  //      sha3(phone),
  //      0,
  //      1
  //    );
  //    Assert.equal(ballot.getVoteCount(0,0),1, "Error");     
  //    Assert.equal(ballot.getVoteCount(0,1),1, "Error");
  // }


  // function testVoteUpdate() {
  //    Ballot ballot = Ballot(DeployedAddresses.Ballot());
  //    Assert.equal(ballot.getVoteCount(0,0),0, "Error");
  //    ballot.voteUpdate(
  //      0,
  //      0,
  //      3
  //    );
  //    Assert.equal(ballot.getVoteCount(0,0),3, "Error");     
  //    Assert.equal(ballot.getBalance(tx.origin),100000, "Error");
  // }

  // function testGetProgram() {
  //    Ballot ballot = Ballot(DeployedAddresses.Ballot());
  //    bytes32 name;
  //     uint start;
  //     uint end;
  //     uint number_actors;
  //    (name, start, end, number_actors ) = ballot.getProgram(0);
  //   Assert.equal(name, "Chuong trinh 1", "Error");
  // }

  // function testGetActor() {
  //   Ballot ballot = Ballot(DeployedAddresses.Ballot());
  //    bytes32 name;
  //     uint vote_count;
  //    (name, vote_count ) = ballot.getActor(0,0);
  //   Assert.equal(name, "Manhd", "Error");
  // }

  function testGetBalances() {
    Ballot ballot = Ballot(DeployedAddresses.Ballot());
    Assert.equal(ballot.getBalance(tx.origin), 100000, "Error");
    address addr = 0xda0677d2d5c02eca1ef90d99ce3fb96eb60855cd;
    Assert.equal(ballot.isChair(addr), true, "Error");
    
>>>>>>> b15f1e3d80c79997d3af07a2b321202447a81933
  }
}
