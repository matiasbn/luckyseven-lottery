// var values = [1293812983,2139812893,3237182731,4224567890,5224567890,6123819273,7939871237]
// lucky7Instance.insertLucky7Numbers(values)

var lucky7Instance = Lucky7Store.at(Lucky7Store.address)
lucky7Instance.insertCustomizedLucky7Number(0, 'mu', 'i', 1293812983, 0)
lucky7Instance.insertCustomizedLucky7Number(1, 'mu', 'i', 2139812893, 0)
lucky7Instance.insertCustomizedLucky7Number(2, 'mu', 'i', 3237182731, 0)
lucky7Instance.insertCustomizedLucky7Number(3, 'mu', 'i', 4224567890, 0)
lucky7Instance.insertCustomizedLucky7Number(4, 'mu', 'i', 5224567890, 0)
lucky7Instance.insertCustomizedLucky7Number(5, 'mu', 'i', 6123819273, 0)
lucky7Instance.insertCustomizedLucky7Number(6, 'mu', 'i', 7939871237, 0)
lucky7Instance.setIndexForLucky7Array(7)
lucky7Instance._generateLucky7Number()

lucky7Instance.settingLucky7Numbers().then(setting=>{console.log(setting)})
lucky7Instance.settingLucky7Numbers().then(setting=>{if(!setting)lucky7Instance.toggleLucky7Setting()})
//Buying tickets
var sellTicketPrice 
lucky7Instance.sellTicketPrice().then(price=>sellTicketPrice=parseInt(price))
var account = web3.eth.accounts[0]
lucky7Instance.sellRandomTicket({from: account, value: sellTicketPrice});
// web3.eth.getAccounts(function(error, accounts){account = accounts[0];})


//Getting accounts
var account = web3.eth.accounts[0]