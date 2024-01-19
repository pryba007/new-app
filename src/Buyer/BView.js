import React, { useState, useEffect } from "react";
import "./BView.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { imageList } from "./Images";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { SERVER_URL } from '../constants.js';
let { useParams, useNavigate } = require('react-router-dom');

function BView() {
  let navigate = useNavigate();
  let [buyerList, setBuyerList] = useState([]);
  let [propertyList, setPropertyList]= useState([]);
  const token = sessionStorage.getItem("jwt");
  useEffect(() => {
    generateBuyerList();
  }, []);
  useEffect(() => {
    generatePropertyList();
  }, []);
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
  function propertycheck(props)
  {
    let found = false;
    console.log(propertyList)
    for (let i = 0; i < propertyList.length; i++) {
      console.log(propertyList[i].buyeR_ID)
        console.log(props)
      if(propertyList[i].buyeR_ID == props.id)
      {
        console.log("reached again")
        found = true
      }
    }
    if (found === true)
    {
      alert("You Cant Delete this buyer because they currently bought to a property, delete the property or change its status then try again")
      
    }
    else
    {
      DeleteFromList(props)
    }
  }
  function DeleteFromList(props) {
    alert("Are you sure you want to delete this buyer?");
    let choice = prompt("Yes or No");

    
    if (choice === "yes") {
      
      
    fetch(`http://localhost:3000/DeleteBuyer/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`,
      }})
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res));
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
                  onClick={() => propertycheck(buyer)}
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
