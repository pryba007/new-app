import React, { useState, useEffect } from "react";
import "./PView.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PForm from "./PForm";
import { imageList } from "./Images";
function PView() {
  let [propertyList, setPropertyList] = useState([]);
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
  function DeleteFromList(props) {
    alert("Are you sure you want to delete this property?");
    let choice = prompt("Yes or No");
    if (choice === "yes") {
      fetch(`http://localhost:3000/DeleteProperty/${props.id}`, {
        method: "DELETE",
      })
        .then((res) => res.text()) // or res.json()
        .then((res) => console.log(res));
    } else if (choice === "no") {
      alert("Property not deleted");
    } else {
      alert("Invalid input");
    }
    generatePropertyList();
  }

  let searchvalue = useState({});
  // the function searchHandler is passed to the PForm component as a prop
  // the PForm component will call this function when the search button is clicked
  // the searchHandler function will update the searchvalue variable with the search object
  // the searchvalue variable is then passed to the PForm component as a prop
  // the PForm component will then pass the searchvalue variable to the PSearch component as a prop
  // the PSearch component will then use the searchvalue variable to filter the propertyList variable
  // the PSearch component will then pass the filtered propertyList variable to the PView component as a prop
  // the PView component will then use the filtered propertyList variable to display the filtered property list

  const searchHandler = (search) => {
    searchvalue = search;
    listbuilderwithdrawn(searchvalue);
  };
  function gardendisplay(value) {
    if (value == "true") {
      return "Yes";
    } else if (value == "false") {
      return "No";
    }
  }
  function listbuilderwithdrawn(svalue) {
    console.log(svalue);
    
    setPropertyList(
      propertyList.filter((property) => {
        if (svalue.type == "ANY" || svalue.type == property.type) {
          if (svalue.price == "ANY" || Number(property.price) <= Number(svalue.price)) {
          if (Number(property.numbeR_OF_BEDROOMS) >= Number(svalue.numbeR_OF_BEDROOMS)) {
            
            if (Number(property.numbeR_OF_BATHROOMS) >= Number(svalue.numbeR_OF_BATHROOMS)) {
              console.log("the garden property is"+ property.garden + "the searched garden is " +svalue.garden)
              
              let gardenval = Boolean(svalue.garden)
              if (property.garden == gardenval) {
              
                console.log("reached")
                if (
                  
                  svalue.status == "ANY" ||
                  svalue.status == property.status
                ) {
                  return property;
                }
              }
            }
          }
        }
      }
      })
    );
  }
  return (
    <div className="pView">
      <PForm
        searchHandler={searchHandler}
        generatePropertyList={generatePropertyList}
      />
      <ul>
        <p className="linkpa">
          <Link className="AddLink" to={`/PAdd`}>
            {" "}
            Add
          </Link>
        </p>
        {propertyList.map((property) => {
          return (
            <ul className="PropertyList">
              <div className="cardContainer">
                <img
                  src={
                    imageList[Math.floor(Math.random() * imageList.length)].url
                  }
                  alt={property.firstName}
                  className="cardImgprop"
                />
              </div>
              <li>
                <b>Address:</b> {property.address}
              </li>
              <li>
                <b>Postcode:</b>
                {property.postcode}
              </li>
              <li>
                <b>Price:</b> {property.price}
              </li>
              <li>
                <b>Number of Bedrooms:</b> {property.numbeR_OF_BEDROOMS}
              </li>
              <li>
                <b>Number of Bathrooms:</b> {property.numbeR_OF_BATHROOMS}
              </li>
              <li>
                <b>Gardens:</b>{" "}
                {gardendisplay(property.garden.toString())}
              </li>
              <li>
                <b>Status:</b>{" "}
                <span
                  className={`${
                    property.status === "FOR SALE"
                      ? "bg-success"
                      : property.status === "WITHDRAWN"
                      ? "bg-primary"
                      : property.status === "SOLD"
                      ? "bg-danger"
                      : ""
                  } text-white py-1 px-2 rounded`}
                >
                  {" "}
                  {property.status}{" "}
                </span>
              </li>
              <input
                className="deletebtn"
                type="button"
                value="Delete"
                onClick={() => DeleteFromList(property)}
              ></input>
              <p className="linkpve">
                <Link className="editLink1" to={`/PEdit/${property.id}`}>
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

export default PView;
