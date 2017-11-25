import { Component, OnInit, HostListener, NgZone  } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
// const metaArtifacts = require('../../../build/contracts/MetaCoin.json');
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
  // MetaCoin = contract(metaArtifacts);
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
  id_program = 0;
  current_coin;
  constructor(private _ngZone: NgZone) {

  }
  @HostListener('window:load')
  windowLoaded() {
    this.checkAndInstantiateWeb3();
    this.onReady();
    this.loadCoin();
  }
  checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        // tslint:disable-next-line:max-line-length
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        // tslint:disable-next-line:max-line-length
        'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
    }
  };
  onReady = () => {
    // Bootstrap the MetaCoin abstraction for Use.
    // this.MetaCoin.setProvider(this.web3.currentProvider);
    const self = this;
    let actor_arr = [];
    let number_actor;
    this.Ballot.setProvider(this.web3.currentProvider);
    const id_program = 0;
      let ballot;
      console.log(this.Ballot);
      this.Ballot.deployed().then(function (instance) {
        ballot = instance;
        return ballot.getProgram.call(id_program);
      }).then(function (value) {
        console.log(value);
        console.log(value[0]);
        console.log(self.web3.toAscii(value[0]));
        console.log(value[1]);
        console.log(value[2]);
        number_actor = value[3];
        self.actors = [];
        for (let i = 0; i < number_actor; i++) {
          getActor(id_program, i);
        }
      }).catch(function (e) {
        console.log('error');
        console.log(e);
      });

    function getActor(id_prg, id_actor) {
      let bl;
      self.Ballot.deployed().then(function (instance) {
        bl = instance;
        return ballot.getActor.call(id_prg, id_actor);
      }).then(function (value) {
        const actor = {
          'name': self.web3.toAscii(value[0]) + '\0',
          'vote_count': value[1].valueOf()
        }
        actor_arr.push(actor);
        console.log(actor_arr);
        if(actor_arr.length == number_actor){
          self.actors = actor_arr;
        }
      }).catch(function (e) {
        console.log(e);
      });
    }
    this.web3.eth.getAccounts(function (err, accs) {
      if (accs.length > 0) {
        self.account = accs[0];
        // self.loadCoin();
        // console.log(self.current_coin);
      }
    });

  };
  loadCoin = () => {
    let self = this;
        this.Ballot.deployed().then(function (instance) {
          const bl = instance;
          bl.getBalance.call(self.account).then(function (value) {
            debugger;
            self.current_coin = value.valueOf();
            console.log(self.current_coin);
          });
    });
  }
  ngOnInit() {
    this.votes = [];
  }
  submitVote = (f) => {
    let ballot;
    const self = this;
    this.Ballot.deployed().then(function (instance) {
      ballot = instance;
      const id_program = self.id_program;
      for (let i = 0; i < self.votes.length; i++) {
        const id_actor = self.votes[i].actor_id;
        // const weight = this.votes[i].wei;
        const weight = 10;
        console.log(self.account);
        ballot.voteUpdate(id_program, id_actor, weight, { from: self.account, gas: 3000000 }).then(function (value) {
          console.log(value);
        }).catch(function (e) {
          console.log("error");
          console.log(e);
        });
      }
      // console.log(id_program);
      // console.log(id_actor);
    }).catch(function (e) {
      console.log("error");
      console.log(e);
    });
  };

  addVotes = (vote, wei) => {
    // const index = this.votes.findIndex(d => d === vote);
    const index = vote;
    if (index < this.votes.length) {
      console.log(index);
      this.votes.splice(index, 1);
    }else {
      console.log(index);
      this.votes[this.voteCount++] = {
        actor_id: vote,
        wei: wei
      };
    }
    console.log(this.votes);
  }

}
