import React, {useEffect, useRef, useState} from 'react';
let {useParams,useNavigate} = require('react-router-dom');

function Edit()
{
    let navigate = useNavigate();    
    let inputfname = useRef(null);
    let inputsname = useRef(null);
    let inputaddress = useRef(null);
    let inputpostcode = useRef(null);
    let inputphone = useRef(null);
    let {id} = useParams();
    function submitSeller()
    {
        // console.log("the value is" + addseller.firstName)
        let seller = {
            id:id,
            firstName: inputfname.current.value,
            surname: inputsname.current.value,
            address: inputaddress.current.value,
            postcode: inputpostcode.current.value,
            phone: inputphone.current.value
        }
       
        fetch(`http://localhost:3000/seller/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(seller),
        }).then(response => (navigate(`/View`)))

    }

    function getSeller()
    {

        fetch(`http://localhost:3000/seller/${id}`)
        .then((response)=>response.json())
        .then((data)=>{
            inputfname.current.value = data.firstName;
            inputsname.current.value = data.surname;
            inputaddress.current.value = data.address;
            inputpostcode.current.value = data.postcode;
            inputphone.current.value = data.phone;
            });
    
        }
        useEffect(()=>getSeller(), []);
    return(
        <div>
        <h1>Edit Seller</h1>
        <input type="text" id = "sellerfname"placeholder="First Name" ref={inputfname}></input>
        <input type="text" id = "sellersname"placeholder="Last Name" ref= {inputsname}></input>
        <input type="text" id = "selleraddress"placeholder="Address" ref= {inputaddress} ></input>
        <input type="text" id = "sellerpostcode"placeholder="Postcode" ref= {inputpostcode} ></input>
        <input type="text" id = "sellerphone"placeholder="Phone" ref = {inputphone}></input>
        <input type="button" value="Submit" onClick={()=>submitSeller()}></input>
    </div>
    );
}
export default Edit;