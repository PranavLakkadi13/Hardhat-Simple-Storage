// testing uses a framework called Mocha 
const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("SimpleStorage", function () {
    let Factory; // assigned this variables outside so it can be accessed outside the beforeEach Scope 
    let simpleStorage;
    beforeEach(async function () { // it tells what to do before each it() and in it() we actually write the test
        Factory = await ethers.getContractFactory("SimpleStorage"); // to deploy the contract
        simpleStorage =  await Factory.deploy();
    })

    // it.only => is used to run the test only on that particular it 
    it("Should start the favourite number with 0", async function() {
        const currentValue = await simpleStorage.retrieve();
        const ExpectedValue = "0";
        // assert.equal(currentValue.toString(), ExpectedValue);
        // using the expect keyword to do the exact same thing 
        expect(currentValue.toString()).to.equal(ExpectedValue);  
    })

    // it.only() will run this test only and nothing else
    it("Should update the value when store is called", async function () {
        await simpleStorage.store("123");
        const value = await simpleStorage.retrieve();
        const ExpectedValue = "0";
        assert.notEqual(value.toString(), ExpectedValue);  
    })

    it("testing the addPerson function", async function () {
        await simpleStorage.addPerson("Pranav", "123");
        const num = await simpleStorage.nameToFavoriteNumber("Pranav");
        const expected = "123";
        assert.equal(num.toString(), expected);
    })

    it("To check array", async function () {
        await simpleStorage.addPerson("Pranav", "123");
        const person = await simpleStorage.people(0);
        const expecting = ("123,Pranav");
        assert.equal(person.toString(), expecting);
    })

    it("to check the owner", async function () {
        const add = simpleStorage.signer.getAddress();
        const newadd = simpleStorage.owner();
        assert.equal(add.toString(), newadd.toString());
    })
})