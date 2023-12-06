import React, { useState, useEffect } from "react";
import "./View.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function View() {
  let [sellerList, setSellerList] = useState([]);

  useEffect(() => {
    generateSellerList();
  }, []);

  function generateSellerList() {
    fetch("http://localhost:3000/seller")
      .then((response) => response.json())
      .then((data) => {
        setSellerList(data);
      });
  }

  function DeleteFromList(props) {
    alert("Are you sure you want to delete this seller?")
    let choice = prompt("Yes or No");
    if (choice === "yes") {
    fetch(`http://localhost:3000/seller/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props }),
    }).then((response) => response.json());
    generateSellerList();
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
          <Link className="AddLink" to={`/Add`}>
            {" "}
            Add
          </Link>
        </p>
        {sellerList.map((seller) => {
          return (
            <ul>
              <li>
                <b>First Name:</b> {seller.firstName}
              </li>
              <li>
                <b>Last Name:</b> {seller.surname}
              </li>
              <li>
                <b> Address:</b> {seller.address}
              </li>
              <li>
                <b> Post Code:</b>
                {seller.postcode}
              </li>
              <li>
                <b>Phone: </b>
                {seller.phone}
              </li>
              <p className="deletepe">
              <input
                className="deletebtn"
                type="button"
                value="Delete"
                onClick={() => DeleteFromList(seller)}
              ></input>
              </p>
              <div className="row">
                <Link className="editLink" to={`/Edit/${seller.id}`}>
                  Edit
                </Link>
              </div>
            </ul>
          );
        })}
      </ul>
    </div>
  );
}
export default View;
