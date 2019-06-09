deploy --force
Lucky7FrontEndFunctions.deployed()
var lucky7Instance = Lucky7FrontEndFunctions.at(Lucky7FrontEndFunctions.address)
lucky7Instance.settingLucky7Numbers().then(setting=>{console.log(setting)})
lucky7Instance.settingLucky7Numbers().then(setting=>{if(!setting)lucky7Instance.toggleLucky7Setting()})
lucky7Instance.insertCustomizedLucky7Number(0, 'mu', 'i', 1293812983, 0)
lucky7Instance.insertCustomizedLucky7Number(1, 'mu', 'i', 2139812893, 0)
lucky7Instance.insertCustomizedLucky7Number(2, 'mu', 'i', 3237182731, 0)
lucky7Instance.insertCustomizedLucky7Number(3, 'mu', 'i', 4224567890, 0)
lucky7Instance.insertCustomizedLucky7Number(4, 'mu', 'i', 5224567890, 0)
lucky7Instance.insertCustomizedLucky7Number(5, 'mu', 'i', 6123819273, 0)
lucky7Instance.insertCustomizedLucky7Number(6, 'mu', 'i', 7939871237, 0)
lucky7Instance.setIndexForLucky7Array(7)
lucky7Instance._generateLucky7Number()
lucky7Instance.insertCustomizedTicket('mu', 'i', 1293812983 - 1, web3.eth.accounts[0], 0)
lucky7Instance.insertCustomizedTicket('mu', 'i', 2139812893 - 1, web3.eth.accounts[1], 0)
lucky7Instance.insertCustomizedTicket('mu', 'i', 3237182731 - 1, web3.eth.accounts[2], 0)
lucky7Instance.insertCustomizedTicket('mu', 'i', 4224567890 - 1, web3.eth.accounts[3], 0)
lucky7Instance.insertCustomizedTicket('mu', 'i', 5224567890 - 1, web3.eth.accounts[4], 0)
lucky7Instance.insertCustomizedTicket('mu', 'i', 6123819273 - 1, web3.eth.accounts[5], 0)
lucky7Instance.insertCustomizedTicket('mu', 'i', 7939871237 - 1, web3.eth.accounts[6], 0)

//Buying tickets
var sellTicketPrice 
lucky7Instance.sellTicketPrice().then(price=>sellTicketPrice=parseInt(price))
var account = web3.eth.accounts[0]
// web3.eth.getAccounts(function(error, accounts){account = accounts[0];})
lucky7Instance.sellRandomTicket({from: account, value: sellTicketPrice});

//Getting accounts
var account = web3.eth.accounts[0]