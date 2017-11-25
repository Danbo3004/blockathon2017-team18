import { Component, OnInit, HostListener, NgZone  } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const metaArtifacts = require('../../../build/contracts/MetaCoin.json');
const ballotArtifacts = require('../../../build/contracts/Ballot.json');
import { canBeNumber } from '../../util/validation';
import { BallotService } from '../ballot.service';
declare var window: any;
@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  Ballot = contract(ballotArtifacts);
  MetaCoin = contract(metaArtifacts);
  account: any;
  accounts: any;
  web3: any;
  actors: any;
  balance: number;
  sendingAmount: number;
  recipientAddress: string;
  status: string;
  canBeNumber = canBeNumber;
  publicKey: string;
  votes: any;
  voteCount = 0;
  constructor(private _ngZone: NgZone) {

  }
  @HostListener('window:load')
  windowLoaded() {
    this.checkAndInstantiateWeb3();
    this.onReady();
  }
  checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      /* console.warn(
        'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      ); */
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
    }
  };
  onReady = () => {
  /*   this.actors = [
      { id: 1, name: 'Actor 1' },
      { id: 1, name: 'Actor 1' },
      { id: 2, name: 'Actor 2' },
      { id: 3, name: 'Actor 3' },
      { id: 4, name: 'Actor 4' },
      { id: 5, name: 'Actor 5' },
    ] */
    // Bootstrap the MetaCoin abstraction for Use.
    this.MetaCoin.setProvider(this.web3.currentProvider);
    // this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  };
  ngOnInit() {
    this.actors = [
      { id: 1, name: 'actor1' },
      { id: 2, name: 'actor2' },
      { id: 3, name: 'actor3' },
      { id: 4, name: 'actor4' },
      { id: 5, name: 'actor5' },
      { id: 6, name: 'actor6' }
    ];
    this.votes = [];
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
      // this.Ballot.setProvider(this.web3.currentProvider);
      this.MetaCoin.setProvider(this.web3.currentProvider);
      // console.log(this.web3.eth.accounts.sign('ad', 'privateKey'));
    }
  }
  submitVote = (f) => {
    console.log(f);
    const amount = this.sendingAmount;
    const receiver = this.recipientAddress;
    let meta;
    // this.setStatus('Initiating transaction... (please wait)');

    this.MetaCoin
      .deployed()
      .then(instance => {
        meta = instance;
        this.web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            alert('There was an error fetching your accounts.');
            return;
          }

          if (accs.length === 0) {
            alert(
              'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
            );
            return;
          }
          this.accounts = accs;
          this.account = this.accounts[0];
          return meta.sendCoin(this.account, 10, {
            from: this.account
          });
        })
      })
      .then(() => {
        console.log('ok');
        // this.refreshBalance();
      })
      .catch(e => {
        console.log(e);
        // this.setStatus('Error sending coin; see log.');
      });
  };

  addVotes = (vote) => {
    const index = this.votes.findIndex(d => d === vote);
    if (index >= 0) {
      console.log(index);
      this.votes.splice(index, 1);
    }else {
      console.log(index);
      this.votes[this.voteCount++] = vote;
    }
    console.log(this.votes);
  }

}
