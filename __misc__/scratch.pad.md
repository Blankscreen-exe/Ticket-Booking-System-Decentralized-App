# Testing inside console

EM = await EventManagement.deployed()
EM.addEvent(1, "https://trufflesuite.com/assets/logo.png", "truffle ORG", "truffle all things", true, 60, 999999900009, '0xC26e0A426fdC771CfF5F410AbDF07f4c12Ef6dE2')
event = await EM.events(1)
event = await EM.getEventDetails(1)
EM.updateEvent(1, "https://trufflesuite.com/assets/logo.png", "truffle.org", "truffle all things", true, 60)

paymentAmount = web3.utils.toWei("0.000000000000000055", "ether"); 
await EM.payForEvent(eventId, { value: paymentAmount_1, from: "0x1C884c5F18e7DC213CCa533e689361B1679a834a" })
