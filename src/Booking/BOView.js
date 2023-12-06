import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './BOView.css';
function BOView() {
  let [bookingList, setBookingList] = useState([]);
  let [buyerList, setBuyerList] = useState([]);
  let [propertyList, setPropertyList] = useState([]);
  useEffect(() => {
    generateBookingList();
  }, []);
  useEffect(() => {generateBuyerList()}, []);
  useEffect(() => {generatePropertyList()}, []);
  function generateBookingList() {
    fetch("http://localhost:3000/booking")
      .then((response) => response.json())
      .then((data) => {
        setBookingList(data);
      });
      
  }


  function generatePropertyList() {
    fetch("http://localhost:3000/property")
      .then((response) => response.json())
      .then((data) => {
        setPropertyList(data);
      });
  }
  function generateBuyerList() {
    fetch("http://localhost:3000/buyer")
      .then((response) => response.json())
      .then((data) => {
        setBuyerList(data);
      });
  }
function getbuyername(id)
{
  for (let i = 0; i < buyerList.length; i++) {
    if (buyerList[i].id === id) {
      return buyerList[i].firstName;
    }
  }
}

function getpropertyname(id)
{
  for (let i = 0; i < propertyList.length; i++) {
    if (propertyList[i].id === id) {
      return propertyList[i].address;
    }
  }
}
  function DeleteFromList(props) {
    alert("Are you sure you want to delete this booking?")
    let choice = prompt("Yes or No");
    if (choice === "yes") {
    fetch(`http://localhost:3000/booking/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props }),
    }).then((response) => response.json());
    generateBookingList();
  }
  else if (choice === "no") {
    alert("Seller not deleted")
  }
  else {
    alert("Invalid input")
  }
}
  return (
    <div className="sViews">
      <ul>
        <p className="linkpa">
          <Link className="AddLink" to={`/BOAdd`} state = {{buyers:buyerList,
          properties: propertyList}}
          >
            {" "}
            Add
          </Link>
        </p>
        {bookingList.map((booking) => {
          {console.log("The booking buyer id is " +booking.buyerId)}
          return (
            <ul>
              <li>
                <b>Property Buyer:</b> {getbuyername(booking.buyerId)}
              </li>
              <li>
                <b>Property Address:</b> {getpropertyname(booking.propertyId)}
              </li>
              <li>
                <b>Booking Time:</b> {booking.time}
              </li>
              <p className="deletepe">
              <input
                className="deletebtn"
                type="button"
                value="Delete"
                onClick={() => DeleteFromList(booking)}
              ></input>
              </p>
              </ul>
          );
        })}
      </ul>
    </div>
  );
}
export default BOView;
