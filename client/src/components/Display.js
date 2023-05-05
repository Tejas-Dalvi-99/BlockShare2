import { useState } from "react";
import "./Display.css"

const Display = ({ contract, account }) => {
    const [data, setData] = useState("");
    const getData = async () => {
        let dataArray;
        const OtherAddress = document.querySelector(".address").value;
        try {
            if (OtherAddress) {
                dataArray = await contract.Display(OtherAddress); 
            }
            else {
                dataArray = await contract.Display(account);
            }
        }
        catch (e) {
            alert("You Don't have Access to this User's Files! ");
        }
        const isEmpty = Object.keys(dataArray).length === 0;
        console.log(dataArray);
        if (!isEmpty) {
            const str = dataArray.toString();
            const str_array = str.split(",");
            const images = str_array.map((item, i) => {
                return (
                    <div className="displayImages">
                        <a href={item} key={i} target="_blank" className="image-container">
                            <img key={i} src={`https://${item.substring(6)}`} alt="" className="image-list"></img>
                        </a>
                    </div>
                );
            });
            setData(images);
        }
        else {
            alert("No Images to Display");
        }
    };
    return <>
        <div className="image-list">{data}</div>
        <div className="entradrs app-container3 card3">
            <div className="Addrinput">
                <input type="text" placeholder="Enter Address" className="address input-text"></input>

                <div className="getBtn">
                    <button className="center getbutton" onClick={getData}> Get Data </button>
                </div>
            </div>
        </div>
    </>
}
export default Display; 