const {expect} = require("chai")
const {ethers} = require("hardhat")

describe('DAT Token', ()=>{
    let datToken;
    let owner;
    let addr1;
    let addr2;
    const dfTokenNumbers = 20000000;

    beforeEach(async ()=>{
        [owner, addr1, addr2] = await ethers.getSigners()

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
            expect(await datToken.totalSupply()).to.equal(dfTokenNumbers)
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

    describe('Transaction', ()=>{
        it('Transfer and balance success', async ()=>{
            const val = await datToken.transfer(addr1.address, 10000)

            expect(await datToken.balanceOf(addr1.address)).to.equal(10000)
            expect(await datToken.balanceOf(owner.address)).to.equal(dfTokenNumbers- 10000)
        })

        it('Transaction insufficient balance', async ()=>{
            await expect( datToken.transfer(addr1.address, dfTokenNumbers+1)).to.be.revertedWith('Insufficient balance')
        })

        it('Approve success', async ()=>{
            await datToken.approve(addr1.address, 1000)
            expect(await datToken.allowance(owner.address,addr1.address)).to.equal(1000)
        })

        it('Transfer from success', async()=>{
            await datToken.approve(addr1.address, 1000)

            await datToken.connect(addr1).transferFrom(owner.address, addr2.address, 900)
            expect(await datToken.balanceOf(addr2.address)).to.equal(900)
            expect(await datToken.allowance(owner.address, addr1.address)).to.equal(1000-900)
        })

        it('Transfer from failed by insufficient allowed', async()=>{
            await datToken.approve(addr1.address, 1000)

            await expect(datToken.connect(addr1).transferFrom(owner.address, addr2.address, 1000+1)).to.revertedWith('Insufficient allowed\'s owner')
        })

        it('Transfer from failed by insufficient balance', async()=>{
            await datToken.approve(addr1.address, dfTokenNumbers+2)

            await expect(datToken.connect(addr1).transferFrom(owner.address, addr2.address, dfTokenNumbers+1)).to.revertedWith('Insufficient balance\'s owner')
        })
    })
})