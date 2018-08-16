const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const provider = ganache.provider();
const web3 = new Web3(provider);  // A web3 instance

let accounts;
let inbox;
beforeEach(async () => {
    // Get a list of accounts
    accounts = await web3.eth.getAccounts();

    // Use one to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))  //tells web3 what methods Inbox contract has
        .deploy({ data: bytecode, arguments: ['Hi there!'] })   //tells web3 to deploy a new copy of the contract
        .send({ from: accounts[0], gas: '1000000' });           //tells web3 to send a transaction and create the contract

    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
});