// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import * as $ from "./lib/jquery.min.js";

// Import our contract artifacts and turn them into usable abstractions.
import ballot_artifacts from '../../build/contracts/Ballot.json';
console.log(ballot_artifacts);

// Ballot is our usable abstraction, which we'll use through the code below.
var Ballot = contract(ballot_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var myBallot;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the Ballot abstraction for Use.
    Ballot.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      console.log(account);
      self.refreshBalance();
      
      Ballot.deployed().then(function(instance) {
        myBallot = instance;
      });
      
    });
   
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  refreshBalance: function() {
    var self = this;

    var ballot;
    Ballot.deployed().then(function(instance) {
      ballot = instance;
      console.log(instance.address);
      return ballot.getBalance.call(account);
    }).then(function(value) {
      console.log(value);
      $("#balance").text(value.valueOf());
      console.log(typeof value.valueOf());
    }).catch(function(e) {
      console.log("error");
      self.setStatus("Error getting balance; see log.");
    });
  },

  sendCoin: function() {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");
    Ballot.deployed().then(function(instance) {
      var ballot = instance;
      console.log(instance.address);
      return ballot.sendCoin(receiver, amount, {from: account})
    }).then(function(result) {
      console.log(result);
      self.setStatus("Transaction complete!");
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  }
};

window.addEventListener('load', function() {
  window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  // Checking if Web3 has been injected by the browser (Mist/ballotMask)
  // if (typeof web3 !== 'undefined') {
  //   console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 Ballot, ensure you've configured that source properly. If using ballotMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-ballotmask")
  //   // Use Mist/ballotMask's provider
  //   window.web3 = new Web3(web3.currentProvider);
  // } else {
  //   console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to ballotmask for development. More info here: http://truffleframework.com/tutorials/truffle-and-ballotmask");
  //   // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  //   window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  // }

  App.start();
  var Transfer = myBallot.Transfer({}, {fromBlock: 0, toBlock: 'latest'});
  Transfer.watch(function(error, result){
    console.log("dfjaldsfsssssfdaljfldajslfjaldfjasd");
    if (!error) {
        console.log(result);
    } else {
        console.log(error);  
    }
});
});

