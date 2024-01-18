import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./BOView.css";

import { imageList } from "./Images";
function BOView() {
  let [bookingList, setBookingList] = useState([]);
  let [buyerList, setBuyerList] = useState([]);
  let [propertyList, setPropertyList] = useState([]);

  useEffect(() => {
    generateBookingList();
  }, []);
  useEffect(() => {
    generateBuyerList();
  }, []);
  useEffect(() => {
    generatePropertyList();
  }, []);
  function generateBookingList() {
    fetch("http://localhost:3000/GetBookings")
      .then((response) => response.json())
      .then((data) => {
        setBookingList(data);
      });
  }

  function generatePropertyList() {
    fetch("http://localhost:3000/GetProperties")
      .then((response) => response.json())
      .then((data) => {
        setPropertyList(data);
      });
  }
  function generateBuyerList() {
    fetch("http://localhost:3000/GetBuyers")
      .then((response) => response.json())
      .then((data) => {
        setBuyerList(data);
      });
  }
  function getbuyername(id) {
    for (let i = 0; i < buyerList.length; i++) {
      if (buyerList[i].id === id) {
        return buyerList[i].firsT_NAME;
      }
    }
  }

  function getpropertyname(id) {
    for (let i = 0; i < propertyList.length; i++) {
      if (propertyList[i].id === id) {
        return propertyList[i].address;
      }
    }
  }
  function dateConverter(date) {
    let newDate = new Date(date);
    return newDate.toDateString();
  }
  function DeleteFromList(props) {
    alert("Are you sure you want to delete this booking?");
    let choice = prompt("Yes or No");
    if (choice === "yes") {
      fetch(`http://localhost:3000/GetBooking/${props.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: props }),
      }).then((response) => response.json());
      generateBookingList();
    } else if (choice === "no") {
      alert("booking not deleted");
    } else {
      alert("Invalid input");
    }
  }
  return (
    <div className="container BOViews">
      <h1>Bookings</h1>
      <ul>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <Link
                className="btn btn-success my-4 text-center mx-auto"
                to={`/BOAdd`}
                state={{
                  buyers: buyerList,
                  properties: propertyList,
                  bookings: bookingList,
                }}
              >
                {" "}
               Add Booking
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          {bookingList.map((booking) => {
            return (
              <div className="col-md-4 mb-4 col-md-offset-3">
              <ul className="mx-2 boviewsBoarderRadius">
                <div className="">
                  <img
                    src={
                      imageList[Math.floor(Math.random() * imageList.length)]
                        .url
                    }
                    alt={booking.firstName}
                    className="cardImg"
                  />
                </div>
                <li className="mx-3">
                  <b>Property Buyer:</b> {getbuyername(booking.buyeR_ID)}
                </li>
                <li className="mx-3">
                  <b>Property Address:</b> {getpropertyname(booking.propertY_ID)}
                </li>
                <li className="mx-3">
                  <b>Booking Time:</b> {dateConverter(booking.time)}
                </li>
                <div className="d-flex justify-content-center pb-4">
                <button
                  className="btn btn-danger mx-2"
                  type="button"
                  onClick={() => DeleteFromList(booking)}
                >Delete</button>
                   <Link
                    className="btn btn-warning text-white"
                    to={`/BOEdit/${booking.id}`}
                    state={{ buyers: buyerList, properties: propertyList }}
                  >
                    Edit
                  </Link>
                
                </div>
               
              </ul>
              </div>
            );
          })}
        </div>
      </ul>
    </div>
  );
}
export default BOView;
