import React, { useState, useEffect } from "react";
import "./BAdd.css";
let { useParams, useNavigate, useLocation } = require("react-router-dom");
function BAdd() {
  const location = useLocation();
  let buyers = location.state.buyers;
  let navigate = useNavigate();
  let [addBuyer, setBuyer] = useState([]);
  function submitBuyer() {
    let Buyer = {
      firstName: document.getElementById("Buyerfname").value,
      surname: document.getElementById("Buyersname").value,
      address: document.getElementById("Buyeraddress").value,
      postcode: document.getElementById("Buyerpostcode").value,
      phone: document.getElementById("Buyerphone").value,
    };
    fetch("http://localhost:3000/buyer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Buyer),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/BView`);
        setBuyer(data);
      });
  }

  function validation() {
    if (document.getElementById("Buyerfname").value == "") {
      alert("Please fill in the first name field");
      return;
    } else if (document.getElementById("Buyersname").value == "") {
      alert("Please fill in the surname field");
      return;
    } else if (document.getElementById("Buyeraddress").value == "") {
      alert("Please fill in the address field");
      return;
    } else if (document.getElementById("Buyerpostcode").value == "") {
      alert("Please fill in the postcode field");
      return;
    } else if (document.getElementById("Buyerphone").value == "") {
      alert("Please fill in the phone field");
      return;
    }
    let fname = document.getElementById("Buyerfname").value;
    let sname = document.getElementById("Buyersname").value;
    let finished = false;
    for (let i = 0; i < buyers.length; i++) {
      if (fname != buyers[i].firstName && sname != buyers[i].surname) {
      } else if (fname == buyers[i].firstName && sname == buyers[i].surname) {
        alert("buyer already exists");
        finished = true;
        break;
      }
    }

    if (finished == false) {
      submitBuyer();
    } else {
      return;
    }
  }
  return (
    <div className="Badd">
      <h1>Add Buyer</h1>
      <input type="text" id="Buyerfname" placeholder="First Name"></input>
      <input type="text" id="Buyersname" placeholder="Last Name"></input>
      <input type="text" id="Buyeraddress" placeholder="Address"></input>
      <input type="text" id="Buyerpostcode" placeholder="Postcode"></input>
      <input type="number" id="Buyerphone" placeholder="Phone"></input>
      <input
        className="Submitbutton"
        type="button"
        value="Submit"
        onClick={validation}
      ></input>
    </div>
  );
}
export default BAdd;
