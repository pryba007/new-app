import React from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './BOAdd.css';
let {useParams,useNavigate,useLocation } = require('react-router-dom');
function BOAdd() {
let navigate = useNavigate();
const location = useLocation()
  let buyers  = location.state.buyers
  let properties  = location.state.properties

  function submitBooking(){
    if(document.getElementById('BookingDate').value == ""){
        alert("Please fill in the date field");
        return;
    }
    else{
    var bookingdate = new Date(document.getElementById('BookingDate').value)
    
    let booking = {
        buyerId: document.getElementById('BuyerID').value,
        propertyId: document.getElementById('PropertyID').value,
      time: bookingdate.toISOString()
    }
    console.log(booking)
    fetch('http://localhost:3000/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(booking),
        })
        .then((response)=>response.json())
        .then((response)=>{
            navigate(`/BOView`)
        });
}
  }
  return (
    <div className="Booking">
      <h1>Add a booking</h1>
        <label>Buyer ID</label>
        <select id="BuyerID">
          {buyers.map((buyer) => (
            <option value={buyer.id}>{buyer.firstName}</option>
          ))}
        </select>
        <label>Property ID</label>
        <select id="PropertyID">
            {properties.map((property) => (
                <option value={property.id}>{property.address}</option>
            ))}
        </select>
        <label>Date</label>
        <input type="date" id="BookingDate"></input>
        <input type="button" value="Submit" onClick={submitBooking}></input>

    </div>
  );
}
export default BOAdd;