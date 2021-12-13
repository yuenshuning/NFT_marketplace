import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import CryptoBird from '../abis/CryptoBird.json'
import {MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn} from 'mdb-react-ui-kit';
import './App.css';

class App extends Component {

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    // first up is to detect ethereum provider
    async loadWeb3() {
        const provider = await detectEthereumProvider();
        
        if(provider) {
            console.log('ethereum wallet is connected')
            window.web3 = new Web3(provider)
        } else {
            // no ethereum provider
            console.log('no ethereum wallet detected')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({account:accounts[0]})

        // create a constant js variable networkId which 
        //is set to blockchain network id 
        const networkId = await web3.eth.net.getId()
        const networkData = CryptoBird.networks[networkId]
         if(networkData) {

            const abi = CryptoBird.abi;
            const address = networkData.address; 
            const contract = new web3.eth.Contract(abi, address)
            this.setState({contract})

            const totalSupply = await contract.methods.totalSupply().call()
            this.setState({totalSupply})
            // set up an array to keep track of tokens 
            // load CryptoBirds
            for(let i = 1; i <= totalSupply; i++) {
                const CryptoBird = await contract.methods.cryptoBirds(i - 1).call()
                // how should we handle the state on the front end? 
                this.setState({
                    cryptoBirds:[...this.state.cryptoBirds, CryptoBird]
                })
            }
         } else {
             window.alert('Smart contract not deployed')
         }
    }

    // with minting we are sending information and we need to specify the account

    mint = (cryptoBird) => {
        this.state.contract.methods.mint(cryptoBird).send({from:this.state.account})
        .once('receipt', (receipt)=> {
            this.setState({
                cryptoBirds:[...this.state.cryptoBirds, CryptoBird]
            })
        })  
    }

    constructor(props) {
         super(props);
         this.state = {
            account: '',
            contract:null,
            totalSupply:0,
            cryptoBirds:[]
         }
    }

            // BUILDING THE MINTING FORM
            // 1. Create a text input with a place holder 
            //'add file location'
            // 2. Create another input button with the type submit

    render() {
        return (
            <div className='container-filled'>
                {console.log(this.state.cryptoBirds)}
                <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow'>
                <div className='navbar-brand col-sm-3 col-md-3 mr-0' style={{color:'white'}}>
                      Crypto Birds NFTs (Non Fungible Tokens)
                </div>
                <ul className='navbar-nav px-3'>
                <li className='nav-item text-nowrap d-none d-sm-none d-sm-block'>
                <small className='text-white'>
                    {this.state.account}
                </small>
                </li>
                </ul>
                </nav>

                <div className='container-fluid mt-1'>
                    <div className='row'>
                        <main role='main' className='col-lg-12 d-flex text-center'>
                            <div className='content mr-auto ml-auto' style={{opacity:'0.8'}}>
                                <h1 style={{color:'black'}}>
                                    CryptoBirds - NFT Marketplace
                                </h1>
                            <form onSubmit={(event)=>{
                                event.preventDefault()
                                const cryptoBird = this.cryptoBird.value
                                this.mint(cryptoBird)
                            }}>
                                <input
                                type='text'
                                placeholder='Add a file location'
                                className='form-control mb-1'
                                ref={(input)=>this.cryptoBird = input}
                                />
                                <input style={{margin:'6px'}}
                                type='submit'
                                className='btn btn-primary btn-black'
                                value='MINT'
                                />
                                </form>
                            </div>
                        </main>
                    </div>
                        <hr></hr>
                        <div className='row textCenter'>
                            {this.state.cryptoBirds.map((cryptoBird, key)=>{
                                return(
                                    <div >
                                        <div>
                                            <MDBCard className='token img' style={{maxWidth:'22rem'}}>
                                            <MDBCardImage src={cryptoBird}  position='top' height='250rem' style={{marginRight:'4px'}} />
                                            <MDBCardBody>
                                            <MDBCardTitle> CryptoBirds </MDBCardTitle> 
                                            <MDBCardText> The CryptoBirds are 20 uniquely generated...</MDBCardText>
                                            <MDBBtn href={cryptoBird}>Download</MDBBtn>
                                            </MDBCardBody>
                                            </MDBCard>
                                             </div>
                                    </div>
                                )
                            })} 
                        </div>
                </div>
            </div>
        )
    }
}

export default App;