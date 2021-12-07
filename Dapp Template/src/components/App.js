import contractName from '../abis/contractName.json'
import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum)
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()
      
      //load balance
      if(typeof accounts[0] !=='undefined'){
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({account: accounts[0], balance: balance, web3: web3})
      } else {
        window.alert('Please login with MetaMask')
      }

      //load contracts
      try {
        const contractName = new web3.eth.Contract(contractName.abi, contractName.networks[netId].address)
        this.setState({contractName: contractName})
      } catch (e) {
        console.log('Error', e)
        window.alert('Contracts not deployed to the current network')
      }

    } else {
      window.alert('Please install MetaMask')
    }
  }


  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      contractName: null,
      balance: 0
    }
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default App;
