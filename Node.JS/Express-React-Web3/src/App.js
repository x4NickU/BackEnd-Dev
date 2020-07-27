import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {isConnected: false};
	}
	render() {

	const descr_1  = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere sapien dapibus nunc mattis, eu viverra tortor sodales. Aenean tempus, ex in sollicitudin maximus, neque massa malesuada felis, venenatis porttitor."
	
	if (window.web3) {
		this.web3 = new Web3(window.web3.currentProvider);
		window.ethereum.enable();
		web3.eth.getAccounts((error,result) => {
			if (error) {
				console.log(error);
			} else {
				if (result == 0) {
					alert("Please accept the connection");
					window.history.back();
				} else {
					web3.eth.getBalance(web3.eth.accounts[0], (err, data) => {
						if (err) console.log(err)
						document.getElementById("eth_balance").innerText = "ETH Balance: " + web3.fromWei(data);
					})
				}
			}
		});
	}else {
		alert("Please enable metamask or some provider");
		window.history.back();
	}

    return (
      <div style={{textAlign:"center"}}>
		  <p style={{fontSize: "12px"}}>{web3.eth.accounts[0]}</p>
		  <p id="eth_balance">ETH Balance</p>
		  <a href="#" style={{padding: "5px 50px",marginRight: "2em",marginTop: "2em"}} title={descr_1} className="btn tm-btn tm-font-big" data-nav-link="#tmNavLink2">Function_1</a> 
		  <a href="#" style={{padding: "5px 50px",marginRight: "2em", marginTop: "2em"}} title={descr_1} className="btn tm-btn tm-font-big" data-nav-link="#tmNavLink2">Function_2</a> 
		  <a href="#" style={{padding: "5px 50px",marginRight: "2em", marginTop: "2em"}} title={descr_1} className="btn tm-btn tm-font-big" data-nav-link="#tmNavLink2">Function_3</a> 
		  <a href="#" style={{padding: "5px 50px",marginRight: "2em", marginTop: "2em"}} title={descr_1} className="btn tm-btn tm-font-big" data-nav-link="#tmNavLink2">Function_4</a> 
		  <a href="#" style={{padding: "5px 50px",marginRight: "2em",marginTop: "2em"}} title={descr_1} className="btn tm-btn tm-font-big" data-nav-link="#tmNavLink2">Function_5</a> 
		  <a href="#" style={{padding: "5px 50px",marginRight: "2em", marginTop: "2em"}} title={descr_1} className="btn tm-btn tm-font-big" data-nav-link="#tmNavLink2">Function_6</a> 
		  <a href="#" style={{padding: "5px 50px",marginRight: "2em", marginTop: "2em"}} title={descr_1} className="btn tm-btn tm-font-big" data-nav-link="#tmNavLink2">Function_7</a> 
		  <a href="#" style={{padding: "5px 50px",marginRight: "2em", marginTop: "2em"}} title={descr_1} className="btn tm-btn tm-font-big" data-nav-link="#tmNavLink2">Function_8</a> 
	  </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('login'));