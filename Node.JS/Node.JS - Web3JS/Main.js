/*
    File : Questo .js serve per prendere informazioni direttamente da index.html
    per poi spararlo dentro un file sol
    Desc : Ci sono due player (Player 1 e Player 2), Player1 Crea la lobby, Player 2 Joina 
    Info Player 1 : 
        - SelezionaTempo(Label Player 1)
        - SelezionaSoldi_Player1(Label Player 1)
        - SelezionaPlayer(Label Player 1)

    Info Player 2 :
        - SelezionaSoldi_Player2(Label Player 1)
*/

/* Initialize */
var web3;
var user = web3.eth.defaultAccount;
abiFileContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "pin",
				"type": "uint256"
			}
		],
		"name": "addUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "close",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cap",
				"type": "uint256"
			},
			{
				"name": "timer",
				"type": "uint256"
			}
		],
		"name": "createRoom",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "pin",
				"type": "uint256"
			},
			{
				"name": "newPin",
				"type": "uint256"
			}
		],
		"name": "editUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "joinRoom",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "prn",
				"type": "uint256"
			},
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "sendPRN",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "percent",
				"type": "uint8"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "pin",
				"type": "uint256"
			}
		],
		"name": "askPIN",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getAccs",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMyRoom",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getOpen",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getRoom",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);
fileContract = abiFileContract.at('0xADA5B884dFC08E9D09F35D5ec76F9A73367b7379');
contractAddress = "0xADA5B884dFC08E9D09F35D5ec76F9A73367b7379";

function init() {
}

function takeDataLobby() {

	var selectTime = document.getElementById("Time").value;
	var selectBet = document.getElementById("Bet").value;
	var selectPlayer = document.getElementById("selectPlayer");
	var Players = selectPlayer.options[selectPlayer.selectedIndex].value;
	var checkData = true;

	if (selectTime.match(/^[0-9]+$/) != null) {
		document.getElementById("Check3").innerHTML = selectTime;
	} else {
		document.getElementById("Check3").innerHTML = "BadA$$Time";
		checkData = false;
	};

	document.getElementById("Check4").innerHTML = selectBet;
	document.getElementById("Check9").innerHTML = Players;
	var returnData = dataCheck(checkData);

	if (returnData == true) {
		createLobby(selectTime, selectBet, Players);
	};

};
function dataCheck(checkData) {
	if (checkData == false) {
		alert("I dati sono sbagliati!");
	} else {
		return true;
	};
};
function createLobby(selectTime, selectBet, Players) {
	fileContract.createRoom(Players, selectTime, {
		from: user,
		gas: "300000",
		to: contractAddress,
		value: web3.toWei(selectBet, 'ether'),
		data: ""
	},
		function (err, transactionHash) {
			if (!err) {
				setTimeout(20);
				//window.open("lobby.html", '_self');
			} else {
				alert("Devi accettare metamask! per continuare");
			};
		}
	);
};
function lobbyJoinTakeData() {
	var selectBet = document.getElementById("BetJoin").value;
	if (selectBet.match(/^[0-9]+$/) != null && selectBet < 256) {
		document.getElementById("Check6").innerHTML = selectBet;
	} else {
		document.getElementById("Check6").innerHTML = "BadA$$Bet";
	};
	lobbyJoin(selectBet);
};
async function addUser() {
	var select_nickName = document.getElementById("nickName").value;
	var select_pin = document.getElementById("PinUser").value;
	if (select_nickName.match(/^[0-9]+$/) == null && select_nickName.length <= 16) {
		if (select_pin.match(/^[0-9]+$/) != null && select_pin.length <= 4) {
			if (user != null) {
				var tx = fileContract.addUser(select_nickName, select_pin, {
					from: user,
					gas: "112070",
					to: contractAddress,
					value: "0",
					data: ""
				},
					function (err, transactionHash) {
						if (!err) {} else {alert("Devi accettare metamask! per continuare");};
					});	
			} else {alert("Devi connettere il sito a metamask per continuare!");};
		};
	};
};
async function lobbyJoin(selectBet) {
	fileContract.getOpen.call(function (err, res) {
		var roomTime = res;
		var stanze = roomTime.length;
		if (roomTime > 0) {
			roomTime.forEach(xRoom => {
				fileContract.getRoom.call(xRoom, function (err, res) {
					var roomCost = web3.fromWei(res[0], 'ether');
					var roomSet = res[5];
					var playerOn = res[1];
					var playerLimit = res[2];
					if (playerOn == playerLimit) {
						console.log("Player Max Reached");
						return;
					} else {
						console.log("Check Room Set: " + roomSet);
						var roomTimeStamp = res[3];
						var TimeStamp = Math.floor(Date.now() / 1000)
						var roomTime = ((+res[4] - 13) + 50);
						console.log(roomTime);
						if (roomSet == true) {
							if (selectBet == roomCost) {
								if ((TimeStamp - roomTimeStamp) < roomTime) {
									var roomID = xRoom;
									var tx = fileContract.joinRoom(roomID, {
										from: user,
										gas: "300000",
										to: contractAddress,
										value: web3.toWei(roomCost, 'ether'),
										data: ""
									},
										function (err, res) {
											console.log(err);
											if (!err) {
												console.log(res);
												setTimeout(20);
												document.getElementById("Check5").innerHTML = roomID;
											} else {
												console.log("Devi accettare metamask! per continuare");
											};
										}
									)
									return;
								} else {
                                    console.log("Stanza Chiusa " + xRoom);
                                    var Tx = require('ethereumjs-tx');
                                    var privateKey = new Buffer('3505215352CE3C35FE74914EB5EFBFF21BB8E2DAD50E60CB67C6C3997697070A', 'hex')
                                    var rawTx = {
                                     nonce: "",
                                     gasPrice: "3", 
                                     gasLimit: "300000",
                                     to: contractAddress, 
                                     value: 0, 
                                     data: ""
                                    }
                                    var tx = new Tx(rawTx);
                                    tx.sign(privateKey);
                                    var serializedTx = tx.serialize();
                                    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
                                     if (!err)
                                       console.log(hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
                                    });
                                    /*
                                    fileContract.close.call(xRoom, function (err, res) {
                                    });
                                    */
									return;
								}
							} else {
								return;
							}
						} else {
							console.log(xRoom);
							if (xRoom >= stanze) {
								createRoom();
							}else{};
							return;
						}
					};
				});
			});
		} else {
			createRoom(abiFileContract, fileContract, contractAddress, user);
		}
	});
}
async function createRoom() {
	var element,
		html,
		template;

	element = document.getElementById("Buh");
	template = document.getElementById("creaLobbyIframe");
	html = template.innerHTML;

	element.innerHTML = html;
}
async function lobbyWindow() {
	/* Contract Data */
	fileContract.getMyRoom({ from: user },
		function (err, res) {
			var myRooms = res;
				myRooms.forEach(roomID => {
				fileContract.getRoom.call(roomID, function (err, res) {
					var roomTimeStamp = res[3];
					var TimeStamp = Math.floor(Date.now() / 1000)
					var roomTime = ((+res[4] - 13) + 50);
					var realTime = (+res[4] + 50);
					var time = 0;
					var timeToCloseRoom = TimeStamp - roomTimeStamp;
					console.log(timeToCloseRoom)
					if ((TimeStamp - roomTimeStamp) < roomTime) {
					res.forEach(key => {
						switch (time) {
							case 0:
								var roomCost = web3.fromWei(key, 'ether');
								var para = document.createElement("p");
								para.innerText = "Costo stanza: " + roomCost;
								document.body.appendChild(para);
								time++;
								break;
							case 1:
								var para = document.createElement("p");
								para.innerText = "Player presenti: " + key;
								document.body.appendChild(para);
								time++;
								break;
							case 2:
								var para = document.createElement("p");
								para.innerText = "Player Massimi: " + key;
								document.body.appendChild(para);
								time++;
								break;
							case 3:
								time++;
								break;
							case 4:
								var para = document.createElement("p");
								para.innerText = "Timer Stanza: " + key;
								document.body.appendChild(para);
								time++;
								break;
							case 5:
								if (key == true) {
									var para = document.createElement("p");
									para.innerText = "Stanza Aperta";
									document.body.appendChild(para);
								} else {
									var para = document.createElement("p");
									para.innerText = "Stanza Chiusa";
									document.body.appendChild(para);
								}
								var para = document.createElement("p");
								para.innerText = "Tempo trascorso: " + timeToCloseRoom + "/" + realTime;
								document.body.appendChild(para);
								time++;
								break;
						};
					});
						fileContract.getAccs(roomID, { from: "0xbb101a5EEA6973693c475b4eF925dcad69373b90" },
						function (err, res) {
							res.forEach(userAddress => {
								fileContract.getName({ from: userAddress },
									function (err, res) {
										var para = document.createElement("p");
										para.innerText = "Giocatori room: " + roomID + "\n" + "Giocatore: " + res;
										document.body.appendChild(para);
									}
								);
							});
						}
					);
				}else{
					console.log("Stanza nr: " + roomID + " stato: " + res[5]);
					if (res[5] == true) {
                    console.log("Stanza nr: " + roomID + " da chiudere");
					fileContract.close(roomID,{from: user}, function (err, res) {
						if (!err) {
							console.log("Room closed: " + roomID);
						};
					});
				}else{console.log("Stanza: "+ roomID +" già chiusa");return;}
				};
			});
		});
	});
};
async function closeLobby() {
    fileContract.getMyRoom({ from: user },
	function (err, res) {
        res.forEach(myRooms => {
            console.log(myRooms);
            fileContract.getRoom.call(myRooms, function (err, res) {
                var roomSet = res[5];
                var roomTimeStamp = res[3];
				var TimeStamp = Math.floor(Date.now() / 1000)
                var roomTime = ((+res[4] - 13) + 50);
                if ((TimeStamp - roomTimeStamp) > roomTime) {
                    if (roomSet == true) {
                    console.log("My Rooms: " + myRooms);
                    fileContract.close(myRooms, { from: user },
                    function (err, transactionHash) {
                    if (!err)
                        console.log(transactionHash);
                    });
                }else{return;};
                }else{return;};
            });
        });
    });
};
async function initName() {
    fileContract.getName({ from: user },
	function (err, res) {
		console.log(res);
		if (res == "") {
			document.getElementById("introName").innerHTML = "Crea un account per poter giocare!";
		}else{
			document.getElementById("introName").innerHTML = "Benvenuto " + res;
	}
    });
};
/*
this.closeLobby = function () {

}
*/