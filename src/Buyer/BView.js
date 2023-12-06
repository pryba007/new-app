import React, { useState, useEffect } from "react";
import "./BView.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function BView() {
  let [buyerList, setBuyerList] = useState([]);

  useEffect(() => {
    generateBuyerList();
  }, []);

  function generateBuyerList() {
    fetch("http://localhost:3000/buyer")
      .then((response) => response.json())
      .then((data) => {
        setBuyerList(data);
      });
  }

  function DeleteFromList(props) {
    alert("Are you sure you want to delete this buyer?");
    let choice = prompt("Yes or No");
    if (choice === "yes") {
    fetch(`http://localhost:3000/buyer/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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
    <div className="View">
      <ul>
        <p className="linkpa">
          <Link className="AddLink" to={`/BAdd`}>
            {" "}
            Add
          </Link>
        </p>
        {buyerList.map((buyer) => {
          return (
            <ul>
              <li><b>First Name:</b> {buyer.firstName}</li>
              <li><b>Last Name:</b> {buyer.surname}</li>
              <li><b> Address:</b> {buyer.address}</li>
              <li><b> Post Code:</b>{buyer.postcode}</li>
              <li><b>Phone: </b>{buyer.phone}</li>
              <input
                className="deletebtn"
                type="button"
                value="Delete"
                onClick={() => DeleteFromList(buyer)}
              ></input>
              <p className="linkpe">
                <Link className="editLink" to={`/Edit/${buyer.id}`}>
                  Edit
                </Link>
              </p>
            </ul>
          );
        })}
      </ul>
    </div>
  );
}
export default BView;
