import React, { useEffect, useState } from "react";
import Web3 from "web3";
import TP_8 from "./artifacts/TP_8.json";
import './App.css';

function App() {
  const [contract, setContract] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState(""); 

  useEffect(() => {
    loadBlockchain();
  }, []);

  const loadBlockchain = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]); 

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TP_8.networks[networkId];

      if (!deployedNetwork) {
        alert("Contract not deployed on Ganache!");
        return;
      }

      const instance = new web3.eth.Contract(
        TP_8.abi,
        deployedNetwork.address
      );

      setContract(instance);

      const currentMessage = await instance.methods.getMessage().call();
      setMessage(currentMessage);
    } else {
      alert("Please install MetaMask!");
    }
  };

  const updateName = async () => {
    if (contract && nameInput) {
      await contract.methods.setName(nameInput).send({ from: account });
      const updatedMessage = await contract.methods.getMessage().call();
      setMessage(updatedMessage);
      setNameInput("");
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Hello World!</h1>

      <div className="input-group">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Entrez votre nom"
        />
        <button onClick={updateName}>Définir le nom</button>
      </div>

      <h2 className="message">Message actuel: {message}</h2>
    </div>
  );
}

export default App;
