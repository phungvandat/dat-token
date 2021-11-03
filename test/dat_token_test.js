const {expect} = require("chai")
const {ethers} = require("hardhat")

describe('DAT Token', ()=>{
    let Token;
    let datToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async ()=>{
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners()

        const SafeMath = await ethers.getContractFactory("SafeMath")
        const safeMath = await SafeMath.deploy()
        await safeMath.deployed()

        const DATToken = await ethers.getContractFactory("DATToken", {
            libraries: {
                SafeMath: safeMath.address,
            }
        })
        
        datToken = await DATToken.deploy();
        await datToken.deployed()
    })

    describe('Deployment', ()=>{
        it('Should success deploy', ()=>{
            expect(datToken.address).to.be.a('string')
            expect(datToken.address != "")
        })

        it('Token name', async ()=>{
            expect(await datToken.name()).to.equal("DAT Token")
        })

        it('Token symbol', async()=>{
            expect(await datToken.symbol()).to.equal("DAT")
        })

        it('Token total supply',async ()=>{
            expect(await datToken.totalSupply()).to.equal(20000000)
        })

        it('Token decimals', async()=>{
            expect(await datToken.decimals()).to.equal(18)
        })

        it('Should set the right owner', async()=>{
            expect(await datToken.owner()).to.equal(owner.address)
        })

        it('Should assign the total supply of tokens to the owner', async()=>{
            const ownerBalance = await datToken.balanceOf(owner.address)
            expect(await datToken.totalSupply()).to.equal(ownerBalance)
        })
    })
})