import React, { useState, useEffect } from "react";
import "./View.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { imageList } from "./Images";
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
    alert("Are you sure you want to delete this seller?");
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
    } else if (choice === "no") {
      alert("Seller not deleted");
    } else {
      alert("Invalid input");
    }
  }

  return (
    <div className=" container sViews">
      <h1>Sellers</h1>
      <ul>
      <div class="container">
          <div class="row">
            <div class="col text-center">
              <Link
                className="btn btn-success my-4 text-center mx-auto"
                to={`/Add`}
                state={{
                  sellers: sellerList,
                }}
              >
                {" "}
               Add a Seller
              </Link>
            </div>
          </div>
        </div >
        <div className="row">
        {sellerList.map((seller) => {
          return (
            <div className="col-md-4 mb-4 col-md-offset-3">
              <ul className="mx-2 boviewsBoarderRadius">
              <div className="">
                <img
                src={imageList[Math.floor(Math.random()* imageList.length)].url}
                  alt={seller.firstName}
                  className="cardImg"
                />
               </div>
              <li className="mx-3">
                <b>First test Name:</b> {seller.firstName}
              </li>
              <li className="mx-3">
                <b>Last Name:</b> {seller.surname}
              </li>
              <li className="mx-3">
                <b> Address:</b> {seller.address}
              </li>
              <li className="mx-3">
                <b> Post Code:</b>
                {seller.postcode}
              </li>
              <li className="mx-3">
                <b>Phone: </b>
                {seller.phone}
              </li>
              <div className="d-flex justify-content-center pb-4">
                <button
                  className="btn btn-danger mx-2"
                  type="button"
                  onClick={() => DeleteFromList(seller)}
                >Delete</button>
                   <Link
                    className="btn btn-warning text-white"
                    to={`/Edit/${seller.id}`}
                    state={{ sellers: sellerList }}
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
export default View;
