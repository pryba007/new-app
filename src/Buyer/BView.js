import React, { useState, useEffect } from "react";
import "./BView.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { imageList } from "./Images";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { SERVER_URL } from '../constants.js';

function BView() {
  let [buyerList, setBuyerList] = useState([]);
  const token = sessionStorage.getItem("jwt");
  useEffect(() => {
    generateBuyerList();
  }, []);

  function generateBuyerList() {
    fetch("http://localhost:3000/GetBuyers")
      .then((response) => response.json())
      .then((data) => {
        setBuyerList(data);
      });
  }

  function DeleteFromList(props) {
    alert("Are you sure you want to delete this buyer?");
    let choice = prompt("Yes or No");
    if (choice === "yes") {
      
      
    fetch(`http://localhost:3000/DeleteBuyer/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({ id: props }),
    }).then((response) => response.json());
    generateBuyerList();
  }
  else if (choice === "no") {
    alert("Buyer not deleted")
  }
  else {
    alert("Invalid input")
  }
}

  return (
    <div className="container BView">
      <h1>Buyers</h1>
      <ul>
      <div class="container">
          <div class="row">
            <div class="col text-center">
              <Link
                className="btn btn-success my-4 text-center mx-auto"
                to={`/BAdd`}
                state={{
                  buyers: buyerList
                }}
              >
                {" "}
               Add Buyer
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
        {buyerList.map((buyer) => {
          return (
            <div className="col-md-4 mb-4 col-md-offset-3">
              <ul className="mx-2 boviewsBoarderRadius">
                <div className="">
                <img
                src={imageList[Math.floor(Math.random()* imageList.length)].url}
                  alt={buyer.firstName}
                  className="cardImgBuyer"
                />
               </div>
              <li className="mx-3"><b>First Name:</b> {buyer.firsT_NAME}</li>
              <li className="mx-3"><b>Last Name:</b> {buyer.surname}</li>
              <li className="mx-3"><b> Address:</b> {buyer.address}</li>
              <li className="mx-3"><b> Post Code:</b>{buyer.postcode}</li>
              <li className="mx-3"><b>Phone: </b>{buyer.phone}</li>
              <div className="d-flex justify-content-center pb-4">
                <button
                  className="btn btn-danger mx-2"
                  type="button"
                  onClick={() => DeleteFromList(buyer)}
                >Delete</button>
                   <Link
                    className="btn btn-warning text-white"
                    to={`/BEdit/${buyer.id}`}
                    state={{ buyers: buyerList}}
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
export default BView;
