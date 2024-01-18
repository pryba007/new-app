import React, { useState, useEffect } from 'react';
import './PAdd.css';
import axios from 'axios';
import { SERVER_URL } from '../constants.js';
let { useParams, useNavigate } = require('react-router-dom');
function PAdd() {
  let navigate = useNavigate();
  let [addProperty, setProperty] = useState([]);
  let [sellerid, setsellerid] = useState([]);
  function idchecker() {
    getsellerid();
    let id = document.getElementById('SellerID').value;
    let check = false;
    for (let i = 0; i < sellerid.length; i++) {
      if (id == sellerid[i].id) {
        check = true;
      }
    }
    if (check == true) {
      return id;
    }
    else {
      alert("Invalid input");
      let choice = prompt("Please enter a valid Seller ID");
      document.getElementById('SellerID').value = choice;
      idchecker();
    }
  }
  function getsellerid() {
    fetch("http://localhost:3000/GetSellers")
      .then((response) => response.json())
      .then((data) => {
        setsellerid(data);
      });
  }
  useEffect(() => {
    getsellerid();
  }, []);
  function gardenchecker() {
    let garden = document.getElementById('Propertygarden').value;
    if (garden.toLowerCase() == "yes") {
      return true;
    }
    else if (garden.toLowerCase() == "no") {
      return false;
    }
    else {
      alert("Invalid input");
      let choice = prompt("Please enter Yes or No");
      if (choice.toLowerCase() == "yes") {
        return 1;
      }
      else if (choice.toLowerCase() == "no") {
        return 0;
      }
      else {
        alert("Invalid input");
        gardenchecker();
      }
    }
    submitProperty();
  }
  function pricecheker() {
    let price = document.getElementById('Propertyprice').value;
    if (price < 0) {
      alert("Invalid input");
      let choice = prompt("Please enter a valid price");
      document.getElementById('Propertyprice').value = choice;
      pricecheker();
    }
    else {
      return price;
    }
  }
  function submitProperty() {
    let Property = {
      address: document.getElementById('Propertyaddress').value,
      type: document.getElementById('PropertyType').value,
      postcode: document.getElementById('Propertypostcode').value,
      numbeR_OF_BEDROOMS: document.getElementById('Propertybedrooms').value,
      numbeR_OF_BATHROOMS: document.getElementById('Propertybathrooms').value,
      garden: gardenchecker(),
      price: pricecheker(),
      status: "FOR SALE",
      selleR_ID: idchecker()
    }
    console.log(Property);
    const token = sessionStorage.getItem("jwt");
    console.log(token)
    axios.post(SERVER_URL + 'api/CreateProperty', Property, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => response.json())
      .then((data) => {
        setProperty(data);
        navigate('/PView');
      });

  }
  return (
    <div className='Padd'>
      <h1>Add Property</h1>
      <input type="text" id="Propertyaddress" placeholder="Address"></input>
      <input type="text" id="Propertypostcode" placeholder="Postcode"></input>
      <input type="number" id="Propertybedrooms" placeholder="Bedrooms"></input>
      <input type="number" id="Propertybathrooms" placeholder="Bathrooms"></input>

      <input type="text" id="Propertygarden" placeholder="Garden"></input>
      <input type="number" id="Propertyprice" placeholder="Price"></input>
      <label for="Type"><b>Property Type: </b></label>
      <select id="PropertyType">
        <option value="DETACHED">DETACHED</option>
        <option value="SEMI">SEMI</option>
        <option value="APARTMENT">APARTMENT</option>
      </select>
      <br></br>
      <label for="Type"><b>Seller Name: </b></label>
      <select id="SellerID">
        {sellerid.map((seller) => {
          return (
            <option value={seller.id}>{seller.firsT_NAME}  {seller.surname}</option>
          );
        })}

      </select >

      <input className="Submitbutton" type="button" value="Submit" onClick={() => submitProperty()}></input>
    </div>
  );
} export default PAdd;