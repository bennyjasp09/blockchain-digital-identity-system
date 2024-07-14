const express = require('express');
const Web3 = require('web3');
const app = express();
app.use(express.json());

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'));

const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "did",
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
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = '0xFB02cB5A46468476Cb831A993dC400E4c7203758'; // Replace with your contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);

app.post('/register', async (req, res) => {
    const { did } = req.body;
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.createIdentity(did).send({ from: accounts[0] });
        res.send({ success: true });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

app.get('/identity/:address', async (req, res) => {
    const { address } = req.params;
    try {
        const identity = await contract.methods.getIdentity(address).call();
        res.send({ success: true, identity });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
