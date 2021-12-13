const {assert} = require('chai')

const CryptoBird = artifacts.require('./CryptoBird');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('CryptoBird', (accounts) => {
    let contract
    before(async () => {
        contract = await CryptoBird.deployed() 
    })

    describe('deployment', async() => {
        // test samples with writing it 
        it('deploys successfuly', async() => {
            const address = contract.address;
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, 0x0)
        })
        it('has a name', async() => {
            const name = await contract.name()
            assert.equal(name, 'CryptoBird')
        })
        it('has a symbol', async() => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'CBIRDS')
        })
    })

    // describe('minting', async ()=> {
    //     it('creates a new token', async () => {
    //         const result = await contract.mint('https...1')
    //         const totalSupply = await contract.totalSupply()
    //         //Success
    //         assert.equal(totalSupply, 1)
    //         const event = result.logs[0].args
    //         assert.equal(event._from, '0x0000000000000000000000000000000000000000', 'from the contract')
    //         assert.equal(event._to, accounts[0], 'to msg.sender')

    //         //Failure
    //         await contract.mint('https...1').should.be.rejected;
    //     })
    // })

    // describe('indexing', async ()=> {
    //     it('lists CryptoBirds', async() => {
    //         // Mint three new tokens
    //         await contract.mint('https...2')
    //         await contract.mint('https...3')
    //         const totalSupply = await contract.totalSupply()
    //         // Loop through list and grab CBirds from list
    //         let result = []
    //         let CryptoBird
    //         for(i = 1; i <= totalSupply; i++) {
    //             CryptoBird = await contract.cryptoBirds(i - 1)
    //             result.push(CryptoBird)
    //         }
    //     })
    // })
}) 
