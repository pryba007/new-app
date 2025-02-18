import React, {useState, useEffect} from 'react';
import './Add.css';
let {useNavigate,useLocation } = require('react-router-dom');
function Add()
{
    const location = useLocation()
  let sellers  = location.state.sellers
    let navigate = useNavigate();
    let [addseller, setseller] = useState([]);
    function submitSeller()
    {
        let seller = {
            firsT_NAME: document.getElementById('sellerfname').value,
            surname: document.getElementById('sellersname').value,
            address: document.getElementById('selleraddress').value,
            postcode: document.getElementById('sellerpostcode').value,
            phone: document.getElementById('sellerphone').value
        }
        fetch('http://localhost:3000/CreateSeller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(seller),
        })
        .then((response)=>response.json())
        .then((data)=>{
            setseller(data);
            navigate(`/View`)
        });

    }
    function validation()
    {
        if(document.getElementById('sellerfname').value == "")
        {
            alert("Please fill in the first name field");
            return;
        }
        else if(document.getElementById('sellersname').value == "")
        {
            alert("Please fill in the surname field");
            return;
        }
        else if(document.getElementById('selleraddress').value == "")
        {
            alert("Please fill in the address field");
            return;
        }
        else if(document.getElementById('sellerpostcode').value == "")
        {
            alert("Please fill in the postcode field");
            return;
        }
        else if(document.getElementById('sellerphone').value == "")
        {
            alert("Please fill in the phone field");
            return;
        }
        let fname = document.getElementById('sellerfname').value;
        let sname = document.getElementById('sellersname').value;
        let finished = false;
        for(let i = 0; i < sellers.length; i++)
        {
            if(fname != sellers[i].firstName && sname != sellers[i].surname)
            {
                
            }
            else if(fname == sellers[i].firstName && sname == sellers[i].surname)
            {
                alert("Seller already exists");
                finished = true;
                break;
            }
        }

        if(finished == false)
        {
            submitSeller();
        }
        else
        {
            return;
        }
    }
    return(
        <div className='Sadd'>
            <h1>Add Seller</h1>
            <input type="text"  id = "sellerfname"placeholder="First Name " ></input>
            <input type="text"  id = "sellersname"placeholder="Last Name" ></input>
            <input type="text"  id = "selleraddress"placeholder="Address"></input>
            <input type="text"  id = "sellerpostcode"placeholder="Postcode" ></input>
            <input type="number"  id = "sellerphone"placeholder="Phone" ></input>
            <input className = "Submitbutton"type="submit" value="Submit" onClick={validation}></input>
        </div>
    )
}
export default Add;