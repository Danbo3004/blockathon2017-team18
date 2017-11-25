import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
const Web3 = require('web3');
const contract = require('truffle-contract');
const ballotArtifacts = require('../../build/contracts/Ballot.json');
import { canBeNumber } from '../util/validation';

declare var window: any;
@Injectable()
export class BallotService {
  Ballot = contract(ballotArtifacts);
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
  constructor() {
    // this.Ballot = contract(ballotArtifacts);
    this.Ballot.setProvider(this.web3.currentProvider);
   }
  getAccounts(): any {
    this.Ballot.setProvider(this.web3.currentProvider);
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
      return of(accs);
    });
  }
  getActors(): Observable<any> {
    return of([
      { id: 1, name: 'Actor 1' },
      { id: 1, name: 'Actor 1' },
      { id: 2, name: 'Actor 2' },
      { id: 3, name: 'Actor 3' },
      { id: 4, name: 'Actor 4' },
      { id: 5, name: 'Actor 5' },
    ]);
  }
  authenPrivatekey(): any {
    console.log(this.web3.eth.accounts.sign('abcd', '8a7a13d46362744045661c92b3004648399a3bdfc278a8fcb7b2faaa78b459ce'));
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
  sendCoin = () => {
  };
}
