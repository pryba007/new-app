import React, {useEffect, useRef, useState} from 'react';
import './Edit.css';
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
        let seller = {
            id:id,
            firsT_NAME: inputfname.current.value,
            surname: inputsname.current.value,
            address: inputaddress.current.value,
            postcode: inputpostcode.current.value,
            phone: inputphone.current.value
        }
       
        fetch(`http://localhost:3000/UpdateSeller/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(seller),
        }).then(response => (navigate(`/View`)))

    }

    function getSeller()
    {

        fetch(`http://localhost:3000/GetSeller/${id}`)
        .then((response)=>response.json())
        .then((data)=>{
            inputfname.current.value = data.firsT_NAME;
            inputsname.current.value = data.surname;
            inputaddress.current.value = data.address;
            inputpostcode.current.value = data.postcode;
            inputphone.current.value = data.phone;
            });
    
        }
        useEffect(()=>getSeller(), []);
    return(
        <div className='sellerinput'>
        <h1>Edit Seller</h1>
        <input type="text" className='selleri' id = "sellerfname"placeholder="First Name" ref={inputfname}></input>
        <input type="text" className='selleri' id = "sellersname"placeholder="Last Name" ref= {inputsname}></input>
        <input type="text" className='selleri' id = "selleraddress"placeholder="Address" ref= {inputaddress} ></input>
        <input type="text"  className='selleri' id = "sellerpostcode"placeholder="Postcode" ref= {inputpostcode} ></input>
        <input type="text" className='selleri' id = "sellerphone"placeholder="Phone" ref = {inputphone}></input>
        <input type="button" className='Submitbutton' value="Submit" onClick={()=>submitSeller()}></input>
    </div>
    );
}
export default Edit;