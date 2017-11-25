import { Component, OnInit, HostListener, NgZone } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
// const metaArtifacts = require('../../../build/contracts/MetaCoin.json');
const ballotArtifacts = require('../../../build/contracts/Ballot.json');
import { canBeNumber } from '../../util/validation';
import { BallotService } from '../ballot.service';
declare var window: any;
@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

  Ballot = contract(ballotArtifacts);
  wei: number;
  // MetaCoin = contract(metaArtifacts);
  account: any;
  accounts: any;
  web3: any;
  tmp: number;
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
  receiver: any;
  amount: number;
  /* for create NSP */
  nspAddress: string;
  name: string;
  init_balance: number;
  password: string;
  /* For  */
  to_user: string
  total_amount: number
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

  ngOnInit() {
  }
  onReady = () => {
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
      this.account = this.accounts[0];
  })
}
  sendCoin = () => {
    const self = this;
    this.Ballot.deployed().then(function (instance) {
      const ballot = instance;
      // console.log(instance.address);

      return ballot.sendCoin(self.receiver, self.amount, { from: self.account });
    }).then(function (result) {
      console.log(result);
    }).catch(function (e) {
      console.log(e);
    });
  }
  createNSP = () => {
    const self = this;
    const nspAddress = this.nspAddress;
    const name = this.name;
    const init_balance = Number(this.init_balance);
    const hass_password = this.web3.sha3(this.password);
    console.log(name);
    console.log(init_balance);
    console.log(hass_password);
    console.log(nspAddress);

    this.Ballot.deployed().then(function (instance) {
      const ballot = instance;

      return ballot.createNSP(nspAddress, name, hass_password, init_balance, { from: self.account });
    }).then(function (value) {
      console.log(value);
    }).catch(function (e) {
      console.log(e);
    });
  }

  nspSendCoinToUser = () => {
    const self = this;
    const hass_password = this.web3.sha3(this.password);
    const to_user = this.to_user;
    const total_amount = Number(this.total_amount);
    this.Ballot.deployed().then(function (instance) {
      const ballot = instance;
      return ballot.requestSendCoinByNSP(hass_password, to_user, total_amount, { from: self.account });
    }).then(function (value) {
      console.log(value);
    }).catch(function (e) {
      console.log(e);
    });
  }
}
