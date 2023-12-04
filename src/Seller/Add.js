import React, {useState, useEffect} from 'react';
import './Add.css';
function Add()
{
    let [addseller, setseller] = useState([]);
    function submitSeller()
    {
        let seller = {
            firstName: document.getElementById('sellerfname').value,
            surname: document.getElementById('sellersname').value,
            address: document.getElementById('selleraddress').value,
            postcode: document.getElementById('sellerpostcode').value,
            phone: document.getElementById('sellerphone').value
        }
        fetch('http://localhost:3000/seller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(seller),
        })
        .then((response)=>response.json())
        .then((data)=>{
            setseller(data);
        });

    }
    return(
        <div>
            <input type="text" id = "sellerfname"placeholder="First Name" ></input>
            <input type="text" id = "sellersname"placeholder="Last Name" ></input>
            <input type="text" id = "selleraddress"placeholder="Address" ></input>
            <input type="text" id = "sellerpostcode"placeholder="Postcode" ></input>
            <input type="text" id = "sellerphone"placeholder="Phone" ></input>
            <input className = "Submitbutton"type="button" value="Submit" onClick={submitSeller}></input>
        </div>
    )
}
export default Add;