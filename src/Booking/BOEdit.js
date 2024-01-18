import React, {useEffect, useRef, useState} from 'react';
import './BOEdit.css';
let {useParams,useNavigate ,useLocation} = require('react-router-dom');


function BOEdit() {
// use navigate for navigation back and useRef for keeping track of the field references
let navigate = useNavigate();
let inputbuyerid = useRef(null);
let inputpropertyid = useRef(null);
let inputdate = useRef(null);
let {id} = useParams();
const location = useLocation()
  let buyers  = location.state.buyers
  let properties  = location.state.properties

function submitBooking()
{
  let booking = {
    id:id,
    buyeR_ID: Number(inputbuyerid.current.value),
    propertY_ID: Number(inputpropertyid.current.value),
    time: inputdate.current.value
  }
  fetch(`http://localhost:3000/UpdateBooking/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  }).then(response => (navigate(`/BOView`)))
}
function getBooking()
{
  fetch(`http://localhost:3000/GetBooking/${id}`)
  .then((response)=>response.json())
  .then((data)=>{
    inputbuyerid.current.value = data.buyeR_ID;
    inputpropertyid.current.value = data.propertY_ID;
    inputdate.current.value = data.time.substring(0, 10);
  });
}
function validation()
{
  if(inputdate.current.value == "")
  {
    alert("Please fill in the date field");
    return;
  }
  else if(inputbuyerid.current.value == "")
  {
    alert("Please fill in the buyer field");
    return;
  }
  else if(inputpropertyid.current.value == "")
  {
    alert("Please fill in the property field");
    return;
  }
  else
  {
    submitBooking();
  }
  
}
function getbuyername(id)
{
  for (let i = 0; i < buyers.length; i++) {
    if (buyers[i].id === id) {
      return buyers[i].firsT_NAME;
    }
  }
}
useEffect(()=>getBooking(), []);
    return (
        <div className='bookinginput'>
        <h1>Edit Booking</h1>
        <label>Buyer Name:</label>
        <select id="BuyerID" ref={inputbuyerid} value={getbuyername(inputbuyerid)}>
          {buyers.map((buyer) => (
            
            <option value={buyer.id}>{buyer.firsT_NAME}</option>
          ))}
        </select>
        <label>Property Name</label>
        <select id= "PropertyID" ref={inputpropertyid}>
            {properties.map((property) => (
                <option value={property.id}>{property.address}</option>
            ))}
        </select>
        <label>Date</label>
        <input type="date" id="BookingDate" ref={inputdate}></input>
        <input type="button" className='Submitbutton' value="Submit" onClick={()=>validation()}></input>
        </div>
    );
}
export default BOEdit;


