const { expect } = require('chai')
const { ethers } = require("hardhat");


describe("Custom Greeting", async () => {

  it("Should set the greeting message", async () => {

    const greeter = await ethers.getContractFactory("CustomGreeting")
    const contract = await greeter.deploy("Hello Ankush!!")
    await contract.deployed()

    expect(await contract.greet()).to.equal("Hello Ankush!!")

    const set = await contract.setGreeting("I'm your Boy, be my Girl")

    await set.wait()

    expect(await contract.greet()).to.equal("I'm your Boy, be my Girl")

  })

})