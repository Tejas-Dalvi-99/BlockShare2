import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";  
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'; 

const FileUpload=({ contract, account, provider })=>{

    const [file, setFile] = useState(null); 
    const [fileName, setFileName] = useState("No Image Selected"); 

    const handleSubmit=async(e)=>{
        e.preventDefault(); 
        if(file){
            try{
                const formData = new FormData();
                formData.append("file", file);
        
                const resFile = await axios({
                  method: "post",
                  url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                  data: formData,
                  headers: {
                    pinata_api_key: `840f25a841a032f15eb3`,
                    pinata_secret_api_key: `feca959005f2d80a1aedc6d731d80fe05d18a011576f47d2cbe660e62b47430d`,
                    "Content-Type": "multipart/form-data",
                  },
                });
                  const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                  contract.UploadImage(account,ImgHash);       // calling our Smart contract UploadImage function
                  Swal.fire("Image Uploaded Successfully", "Please confirm the transaction");
                // alert("Image Uploaded Successfully", "Please confirm the transaction"); 
                //   alert("Successfully Image Uploaded");
                  setFileName("No Image Selected");
                  setFile(null);
            }
            catch(e){
                alert("Unable to Upload File to Pinata !"); 
            }
        }
    }; 

    const retrieveFile=(e)=>{
        const data = e.target.files[0]; 
        const reader = new window.FileReader(); 
        reader.readAsArrayBuffer(data); 
        reader.onloadend=()=>{
            setFile(e.target.files[0]); 
        }
        setFileName(e.target.files[0].name);
        e.preventDefault();  
    }; 

    return <div className="top">
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="color-white UploadLabel">
                Upload file
            </label>
            <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile}></input>

            <div className="textArea">
            <span id="selectedFile">Selected File : {fileName} </span>
            </div>
            <div>
            <button type="submit" className="btn sbmt-btn" disabled={!file}> Submit </button>
            </div>
        </form>
        </div>; 
};
export default FileUpload; 