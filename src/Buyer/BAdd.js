import React, {useState, useEffect} from 'react';
import './BAdd.css';
function BAdd()
{
    let [addBuyer, setBuyer] = useState([]);
    function submitBuyer()
    {
        let Buyer = {
            firstName: document.getElementById('Buyerfname').value,
            surname: document.getElementById('Buyersname').value,
            address: document.getElementById('Buyeraddress').value,
            postcode: document.getElementById('Buyerpostcode').value,
            phone: document.getElementById('Buyerphone').value
        }
        fetch('http://localhost:3000/buyer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Buyer),
        })
        .then((response)=>response.json())
        .then((data)=>{
            setBuyer(data);
        });

    }
    return(
        <div>
            <input type="text" id = "Buyerfname"placeholder="First Name" ></input>
            <input type="text" id = "Buyersname"placeholder="Last Name" ></input>
            <input type="text" id = "Buyeraddress"placeholder="Address" ></input>
            <input type="text" id = "Buyerpostcode"placeholder="Postcode" ></input>
            <input type="text" id = "Buyerphone"placeholder="Phone" ></input>
            <input className = "Submitbutton"type="button" value="Submit" onClick={submitBuyer}></input>
        </div>
    )
}
export default BAdd;