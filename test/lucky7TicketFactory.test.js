const Lucky7TicketFactory = artifacts.require('Lucky7TicketFactory');
const Lucky7Library = artifacts.require('Lucky7Library');
const Lighthouse = artifacts.require('Lighthouse');
const Web3 = require('web3');

contract('Lucky7TicketFactory', (accounts) => {

  // Events function
  const lucky7Event = async (contract, event) => {
    return new Promise((resolve, reject) => {
      contract.once(event, {
        fromBlock: 'latest'
      }, (error, result) => {
        resolve(result);
      })
    })
  }

  // Using websockets to listen to events
  const web3Contract = (address) => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
    return new web3.eth.Contract(Lucky7TicketFactory.abi, address);
  }

  let lucky7TicketFactory;
  let web3contract;

  beforeEach(async function () {
    const lightHouse = await Lighthouse.new();
    const lucky7Library = await Lucky7Library.new();
    await Lucky7TicketFactory.link('Lucky7Library', lucky7Library.address);
    lucky7TicketFactory = await Lucky7TicketFactory.new(lightHouse.address, true, {
      value: web3.utils.toWei('1', 'ether')
    });
    web3contract = web3Contract(lucky7TicketFactory.address)
  });

  const owner = accounts[0];
  const user = accounts[1];

  it('should ask for a new mu paramater for the user', async () => {
    // This test the _askForMuParameter function to check that the Rhombus query is correctly done.
    // Calls the function and waits for the transaction to be mined.
    // Once it happens, then read it info, checking that the mu parameter is not 0
    await lucky7TicketFactory._askForMuParameter(user);
    const log = await lucky7TicketFactory.userValues(user);
    assert.notEmpty(log.mu, 'mu returned was null');
  });

  it('should ask for a new i paramater for the user', async () => {
    // This test the _askForIParameter function to check that the oraclize query is correctly done.
    // Calls the function and waits for the NewIxReceived event to happen
    // Once it happens, then read it info, checking that the i parameter is not 0
    await lucky7TicketFactory._askForMuParameter(user);
    await lucky7TicketFactory._askForIParameter(user);
    const log = await lucky7Event(web3contract, 'Lucky7NumberInserted');
    assert.equal(log.event, 'Lucky7NumberInserted', 'Lucky7NumberInserted not emitted.');
    const iGenerated = await lucky7TicketFactory.lucky7NumbersArray(0)
    assert.isNotNull(iGenerated.i, 'i returned was null');
  });

  it('should set the WolframAlpha query correctly', async () => {
    // First, lets ask for both parameters
    // Then, lets call the _setTicketQuery function and check the output to be whats expected
    // The meaning of the query is explained on the paper of the project
    // As usual, wait for NewMuReceived, NewIReceived and then NewWolframQuery
    // Once the query is setted, compare it with the query that should be generated through
    // the parameters previously received
    const b = await lucky7TicketFactory.b();
    const n = await lucky7TicketFactory.n();
    const p = await lucky7TicketFactory.p();
    const j = await lucky7TicketFactory.j();

    await lucky7TicketFactory._askForMuParameter(owner);
    await lucky7TicketFactory._askForIParameter(owner);
    // This is going to be used to generate the query on Javascript
    const log2 = await lucky7Event(web3contract, 'NewWolframQuery');
    const log = await lucky7TicketFactory.userValues(owner);
    const mu = log.mu;
    const i = log.i;
    // Here we extract the result of the query obtained through the contract
    const queryWolframFromContract = log2.returnValues.wolframQuery;
    // Here we define the query through the result, using the parameters previously catched
    // (mod((1/(10^n-mu))*10^p,10^(j+i))-mod((1/(10^n-mu))*10^p,10^(i)))/10^i
    let queryWolframFromParameters = '(mod((1/(10^';
    // Here we compare them
    queryWolframFromParameters = queryWolframFromParameters.concat(n, '-', mu, '))*10^', p, ',10^(', j, '+', i, '))-mod((1/(10^', n, '-', mu, '))*10^', p, ',10^(', i, ')))/10^', i);

    assert.equal(queryWolframFromContract, queryWolframFromParameters, "The querys don't match");
  });

  it('should ask for both parameters converting the result in a Lucky7Number', async () => {
    // Same as before, but not setting the settingLucky7Numbers to false
    // This way, the callback function knows that we are on the
    // setting Lucky7Numbers phase
    // The value of the Lucky7Number can be checked with the mbn.py script of the
    // python directory
    // Just console.log() log1.args.muParameter, log2.args.iParameter and log3.args.newTicket
    // To check

    await lucky7TicketFactory._askForMuParameter(owner);
    await lucky7TicketFactory._askForIParameter(owner);

    // Check that the "new ticket" is emited
    const log2 = await lucky7Event(web3contract, 'Lucky7NumberInserted');
    assert.equal(log2.event, 'Lucky7NumberInserted', 'Lucky7NumberInserted not emitted.');
    assert.isNotNull(log2.returnValues.value, 'Lucky7Number received returned was null');
    // Check if the new ticket is saved for the owner
    let userTicketValue = await lucky7TicketFactory.userValues(owner);
    userTicketValue = parseInt(userTicketValue[2]);
    assert.notEqual(userTicketValue, 0, 'Lucky7Number was not received');
  });


  it('should ask for both parameters without saving it as ticket', async () => {
    // Let take advantage of the settingLucky7Numbers circuit breaker
    // With this circuit breaker, while is true, after an i and mu parameters are received
    // the callback function ask for a ticket
    // If it where false, it will not pass the callback to ask for a ticket

    // Let start by setting the "settingLucky7Numbers" to false, because is true
    // by default, this way the contract knows we are in the selling ticket phase
    await lucky7TicketFactory.toggleLucky7Setting();
    const settingLucky7Numbers = await lucky7TicketFactory.settingLucky7Numbers();
    assert.equal(settingLucky7Numbers, false, 'Should set the settingLucky7 to false');


    await lucky7TicketFactory._askForMuParameter(user);
    await lucky7TicketFactory._askForIParameter(user);
    const log = await lucky7Event(web3contract, 'GeneratedParametersReceived');
    assert.equal(log.event, 'GeneratedParametersReceived', 'GeneratedParametersReceived not emitted.');
    assert.isNotNull(log.returnValues.mu, 'mu returned was null');
    assert.isNotNull(log.returnValues.i, 'i returned was null');

    let userTicketValue = await lucky7TicketFactory.userValues(user);
    userTicketValue = parseInt(userTicketValue[2]);
    assert.equal(userTicketValue, 0, 'Ticket was received');
  });
});
