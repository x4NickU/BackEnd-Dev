import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {isConnected: false, value: ''};
		this.metamask = false;
		this.sendMoney = this._sendMoney.bind(this);
		this.addMoney = this._addMoney.bind(this);
		this.getLastVersion = this._getLastVersion.bind(this);
		//this.handleClick = this.handleClick.bind(this);
		this.setupWeb3 = this.setupWeb3.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.smartContract;
	}

	setupWeb3() {
		if(window.web3) {
			this.web3 = new Web3(window.web3.currentProvider);
			window.ethereum.enable();
			web3.eth.getAccounts((error,result) => {
				if (error) return;
				if (result == 0) {alert("Please accept the connection");window.history.back();return}
				web3.eth.defaultAccount = web3.eth.accounts[0];
				let abiFileContract = web3.eth.contract([
					{
				
					"inputs": [
						{
							"components": [
								{
									"internalType": "address payable",
									"name": "_address",
									"type": "address"
								},
								{
									"internalType": "uint256",
									"name": "_percentage",
									"type": "uint256"
								}
							],
							"internalType": "struct SimpleSol.Worker[]",
							"name": "_workers",
							"type": "tuple[]"
						},
						{
							"internalType": "address",
							"name": "_financer",
							"type": "address"
						}
					],
					"stateMutability": "nonpayable",
					"type": "constructor"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": false,
							"internalType": "bytes32",
							"name": "dagCid",
							"type": "bytes32"
						},
						{
							"indexed": false,
							"internalType": "uint256",
							"name": "timeStamp",
							"type": "uint256"
						},
						{
							"indexed": false,
							"internalType": "enum SimpleSol.Version",
							"name": "release",
							"type": "uint8"
						}
					],
					"name": "versionData",
					"type": "event"
				},
				{
					"inputs": [],
					"name": "addMoney",
					"outputs": [],
					"stateMutability": "payable",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "canAccess",
					"outputs": [
						{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "checkFinancier",
					"outputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "checkMoney",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "bytes32",
							"name": "_dagCid",
							"type": "bytes32"
						},
						{
							"internalType": "uint256",
							"name": "_timeStamp",
							"type": "uint256"
						},
						{
							"internalType": "enum SimpleSol.Version",
							"name": "_version",
							"type": "uint8"
						}
					],
					"name": "releaseNewVersion",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						}
					],
					"name": "sendMoney",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				}
				]);
				this.smartContract = abiFileContract.at("0x49c8a843Ef673fca098735eC720b72ac6FA6C6C5");
				this.smartContract.canAccess((err,result)=> {
					if (err) {console.log(err); return};
					if (!result) {alert("You can't access");window.history.back();return};
					this.metamask = true;
					web3.eth.getBalance(web3.eth.accounts[0], (err, data) => {
						if (err) {
							document.getElementById("eth_balance").innerText = "ETH Balance: " + "Please Refresh";
						}else{
							document.getElementById("eth_balance").innerText = "ETH Balance: " + web3.fromWei(data);
						}
						this.smartContract.checkMoney((err, result) => {
							if (err) {
								document.getElementById("smart_balance").innerText = "SmartContract Balance: " + "Error";
							}else{
								document.getElementById("smart_balance").innerText = "SmartContract Balance: " + web3.fromWei(result);
							}
						})
					});
				});
			});
		}else {
			alert("Please enable metamask or some provider");
			window.history.back();
		}
	}

	_sendMoney() {
		window.ethereum.enable();
		this.smartContract.sendMoney({value: web3.toWei(1, 'ether')}, (err,result) => {
			if (err) console.log(err);
			console.log(result);
		});
	}


	handleChange(event) {
		this.setState({value: event.target.value});
	  }

	_addMoney(event) {
		alert(this.state.value);
		window.ethereum.enable();
		this.smartContract.addMoney({value: web3.toWei(1, 'ether')}, (err,result) => {
			if (err) console.log(err);
			console.log(result);
		});
		console.log(this.state.money);
		event.preventDefault();
	}
	_getLastVersion() {
		console.log();
	}

	render() {
	this.setupWeb3();
	if (this.metamask = false) {
		
		alert("You arent allowed");
		window.history.back();
	}
	const descr_1  = "Send the money to the smart contract and then pay the workers."
	const descr_2 = "Send the money to the workers";
	const descr_3 = "Get last version of project";



    return (
      	<div style={{textAlign:"center"}}>
		  	<p style={{fontSize: "12px"}}>{web3.eth.accounts[0]}</p>
		  	<p id="eth_balance">ETH Balance : Wait...</p>
		  	<p id="smart_balance">SmartContract Balance: Wait....</p>
		  	<p id="Status"></p>
		  	<div class="form__group field">
  				<input type="input" class="form__field" placeholder="Money to send" name="name" id='name' required />
  				<label for="name" class="form__label">Money to send</label>
			</div>
		  	<button onClick={this.addMoney} className="nickBtn btn tm-btn tm-font-big"> Add Money </button>
		  	<a href="#" onClick={this.sendMoney} title={descr_2} className="nickBtn btn tm-btn tm-font-big" data-nav-link="#tmNavLink2">Pay Workers</a> 
		  	<a href="#" onClick={this.getLastVersion} style={{padding: "5px 30px", marginTop: "2em"}} title={descr_3} className="btn tm-btn tm-font-big" data-nav-link="#tmNavLink2">Get last Version</a> 
	  	</div>
    );
}
}
ReactDOM.render(<App />, document.getElementById('login'));
//<input type='text' className="inputNick" placeholder="add money/pay workers" value={this.state.value} onChange={this.handleChange}/>