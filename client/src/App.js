import GDrive from "./artifacts/contracts/GDrive.sol/GDrive.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import './App.css';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {

        window.ethereum.on("chainChanged", () => {
          window.location.reload();                      // Reload Page When We change the Chain in Metamask
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();                      // Reload Page When We change Account in Metamask
        });

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0xDAb10117712FF807dc8E76eC96a852Fa39b49Ab8";   // this is our Deployed Smart Contract Address, when you want to freshly redeploy your smart contract, then just Run the following in the ternimal " npx hardhat run scripts/deploy.js --network mantle-testnet" and paste the output address over here 

        const contract = new ethers.Contract(
          contractAddress, GDrive.abi, signer
        )
        setContract(contract)
        setProvider(provider)
      }
      else {
        alert("MetaMask Not Installed");
      }
    };
    provider && loadProvider()
  }, []);
  return (
    <>
    {!modalOpen && (
        <button className="share share-btn" onClick={() => setModalOpen(true)}>
          Share
        </button>
    )}
    { modalOpen && (
      <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
    )}
      <div className="App">
        <p className="MarginJugaad">.</p>
        <h1 className="ProjectName">BlockShare.</h1>
        <img src="https://static.vecteezy.com/system/resources/previews/009/302/650/original/white-cloud-clipart-design-illustration-free-png.png" id="cloud-img1" alt="Cloudimg"></img>

        <img src="https://static.vecteezy.com/system/resources/previews/009/302/650/original/white-cloud-clipart-design-illustration-free-png.png" id="cloud-img2" alt="Cloudimg"></img>

        <div className="app-container card">  
          <p className="MetamaskAccount" style={{ color: "black" , fontFamily:"poppins", fontSize:"20px"}}>Your Account : <span className="WalletAddr" style={{fontSize:"17px"}}>{account ? account : "Metamask Not Connected"}</span></p>

          <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
          

        </div>
          <Display contract={contract} account={account}></Display>

      </div>
    </>
  );
}

export default App;
