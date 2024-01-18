import React from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './BOAdd.css';
let {useNavigate,useLocation } = require('react-router-dom');
function BOAdd() {
let navigate = useNavigate();
const location = useLocation()
  let buyers  = location.state.buyers
  let properties  = location.state.properties
 let bookingtime = location.state.bookings
  function submitBooking(){

    if(document.getElementById('BookingDate').value == ""){
        alert("Please fill in the date field");
        return;
    }
    else{
    var bookingdate = new Date(document.getElementById('BookingDate').value)
    
    let booking = {
      buyeR_ID: Number(document.getElementById('BuyerID').value),
      propertY_ID: Number(document.getElementById('PropertyID').value),
      time: bookingdate.toISOString()
    }
    fetch('http://localhost:3000/CreateBooking', {
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
  function validation()
  {
    
    let foundb = false;
    let foundt = false;
    bookingtime.map((booking) => {

        console.log(booking.time);
        console.log(document.getElementById('BookingDate').value);
        if(document.getElementById('BookingDate').value != booking.time)
        {
        }
        else if(document.getElementById('BookingDate').value == booking.time){
          foundt = true;
        }
      });

    buyers.map((buyer) => {
        if(document.getElementById('BuyerID').value != buyer.id){
            
        }
        else if(document.getElementById('BuyerID').value == buyer.id){
            foundb = true;
        }
    });
    console.log("foundb is ",foundb, "foundt is ",foundt);
    if(foundb === true && foundt === true){
        alert("you already have a booking for this buyer on this date");
        console.log("not reached")
        return;
    }
    else{
      console.log("reached")
      submitBooking();
  }
}
  return (
    <div className="Booking">
      <h1>Add a booking</h1>
        <label>Buyer Name:</label>
        <select id="BuyerID">
          {buyers.map((buyer) => (
            <option value={buyer.id}>{buyer.firsT_NAME}</option>
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
        <input className = "Submitbutton"type="submit" value="Submit" onClick={()=>validation()}></input>

    </div>
  );
}
export default BOAdd;