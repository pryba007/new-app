import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { SERVER_URL } from '../constants.js';
let { useParams, useNavigate } = require('react-router-dom');


function BEdit() {
    let navigate = useNavigate();
    let inputfname = useRef(null);
    let inputsname = useRef(null);
    let inputaddress = useRef(null);
    let inputpostcode = useRef(null);
    let inputphone = useRef(null);
    let { id } = useParams();
    function submitBuyer() {
        let Buyer = {
            id: id,
            firsT_NAME: inputfname.current.value,
            surname: inputsname.current.value,
            address: inputaddress.current.value,
            postcode: inputpostcode.current.value,
            phone: inputphone.current.value
        }

        // fetch(`http://localhost:3000/EditBuyer/${id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(Buyer),
        // }).then(response => (navigate(`/BView`)))

        const token = sessionStorage.getItem("jwt");
        axios.put(SERVER_URL + 'EditBuyer/' + Buyer.id, Buyer, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                toast.success("Changes saved")
                setTimeout(() => {
                    navigate(`/BView`);
                }, 500);
            })
            .catch(err =>
                alert("Error when editing: "+err)
            )

    }

    function getBuyer() {

        fetch(`http://localhost:3000/GetBuyer/${id}`)
            .then((response) => response.json())
            .then((data) => {
                inputfname.current.value = data.firsT_NAME;
                inputsname.current.value = data.surname;
                inputaddress.current.value = data.address;
                inputpostcode.current.value = data.postcode;
                inputphone.current.value = data.phone;
            });

    }
    useEffect(() => getBuyer(), []);
    return (
        <div className='sellerinput'>
            <h1>Edit Buyer</h1>
            <input type="text" className='selleri' id="Buyerfname" placeholder="First Name" ref={inputfname}></input>
            <input type="text" className='selleri' id="Buyersname" placeholder="Last Name" ref={inputsname}></input>
            <input type="text" className='selleri' id="Buyeraddress" placeholder="Address" ref={inputaddress} ></input>
            <input type="text" className='selleri' id="Buyerpostcode" placeholder="Postcode" ref={inputpostcode} ></input>
            <input type="text" className='selleri' id="Buyerphone" placeholder="Phone" ref={inputphone}></input>
            <input type="button" className='Submitbutton' value="Submit" onClick={() => submitBuyer()}></input>
        </div>
    );
}
export default BEdit;