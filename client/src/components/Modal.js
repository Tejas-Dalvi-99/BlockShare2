import { useEffect } from "react";
import "./Modal.css"; 
const Modal = ({setModalOpen, contract}) => {
    const revoking= async()=>{
        const address1 = document.querySelector(".address").value; 
        await contract.RevokeAccess(address1);   // calling smart contract function to revoke access
    }; 

    const sharing= async()=>{
        const address = document.querySelector(".address").value;  
        await contract.allowAccess(address);  // calling smart contract function over here to share access with other user 
    }; 
    useEffect(()=>{
        const accessList=async()=>{
            const addessList = await contract.DisplayAccessList(); 
            let select = document.querySelector("#selectNumber"); 
            const options = addessList; 

            for(let i = 0 ; i<options.length; i++){
                let opt = options[i]; 
                let element1 = document.createElement("option"); 
                element1.textContent=opt;    
                element1.value=opt; 
                select.appendChild(element1); 
            }
        }; 
        contract && accessList(); 
    }, [contract]); 
    return (
    <>
        <div className="modalBackground">
            <div className="modalContainer app-container2 card2">

                <div className="containerContents">
                <div className="title" style={{color:"black",fontFamily:"poppins" , fontSize:"18px"}}>Share Files With : </div>
                <div className="body2">
                    <input type="text" className="address" placeholder="Enter Sharing Address" id="InputAddr"></input>
                </div>
                <div className="drpdown">
                <form id="myForm">
                    <select id="selectNumber">
                        <option className="address"> People With your Files Access : </option>
                    </select>
                </form>
                </div>
                <div className="footer">
                    <button onClick={()=>revoking()} id="RevokeBtn" className="btn4 sbmt-btn4">Revoke Access</button>

                    <div className="shrebtun1">
                    <button onClick={()=>sharing()} id="ShareBtn" className="btn2 sbmt-btn2"> Share </button>
                    </div>
                    {/* { <div>
                    <button onClick={()=>{setModalOpen(false)}} id="cancelBtn" className="btn3 sbmt-btn3">Cancel</button>
                    </div> } */}
                </div>
                </div>
            </div>
        </div>
    </> 
    ); 
};
export default Modal; 