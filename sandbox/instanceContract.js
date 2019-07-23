// Instance contract 
let lucky7Instance = await Lucky7Store.deployed()

//Buying tickets
const purchaseTicketPrice = await lucky7Instance.purchaseTicketPrice()
const account = (await web3.eth.getAccounts())[0]
lucky7Instance.sellRandomTicket({from: account, value: purchaseTicketPrice});
// web3.eth.getAccounts(function(error, accounts){account = accounts[0];})

//Retrieve user values 
await lucky7Instance.userValues(account)

// Get past 'Lucky7TicketStored' events
lucky7Instance.getPastEvents('Lucky7TicketStored',{filter:{owner:account}})

web3.eth.subscribe('logs',{},function(error, result){if (!error)console.log(result);});