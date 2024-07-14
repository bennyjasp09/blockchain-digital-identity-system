import React, { useState } from 'react';
import Web3 from 'web3';
import './App.css';

const web3 = new Web3('http://127.0.0.1:9545');

const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "did",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "phone",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dob",
        "type": "string"
      }
    ],
    "name": "createIdentity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getIdentity",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const contractAddress = '0xFB02cB5A46468476Cb831A993dC400E4c7203758'; // Replace with your contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);

function App() {
  const [did, setDid] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [identity, setIdentity] = useState(null);
  const [address, setAddress] = useState('');

  const registerIdentity = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.createIdentity(did, name, email, phone, dob).send({ from: accounts[0] });
  };

  const getIdentity = async () => {
    const result = await contract.methods.getIdentity(address).call();
    setIdentity(result);
  };

  return (
    <div className="App">
      <h1>Register Identity</h1>
      <input type="text" placeholder="DID" value={did} onChange={(e) => setDid(e.target.value)} />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
      <button onClick={registerIdentity}>Register</button>

      <h1>Get Identity</h1>
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} onBlur={getIdentity} />
      {identity && (
        <div>
          <p>DID: {identity[0]}</p>
          <p>Name: {identity[1]}</p>
          <p>Email: {identity[2]}</p>
          <p>Phone: {identity[3]}</p>
          <p>Date of Birth: {identity[4]}</p>
        </div>
      )}
    </div>
  );
}

export default App;
