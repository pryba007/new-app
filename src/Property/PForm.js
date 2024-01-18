import React, {useEffect, useRef, useState} from 'react';
import { FaTruckLoading,FaBed,FaBath   } from "react-icons/fa";
import './PForm.css';
let {useParams,useNavigate} = require('react-router-dom');

function PForm (props)
{   
        const searchHandler = props.searchHandler;
        // Refs are used to get the values from the form, the property form method is called with the parameter of this.props
        // props then uses the useRef hooks in order to get the value .
        const houseType = useRef();
        const houseStatus = useRef();
        const housePrice = useRef();
        const houseBedrooms = useRef();
        const houseBathrooms = useRef();
        const houseGarden = useRef();
    
        const searchvalues = () => {
            searchHandler(
                {
                    type: houseType.current.value,
                    status: houseStatus.current.value,
                    price: housePrice.current.value,
                    numbeR_OF_BEDROOMS: houseBedrooms.current.value,
                    numbeR_OF_BATHROOMS: houseBathrooms.current.value,
                    garden: houseGarden.current.value
                }
            );
        };
    
    let clearValues = () => {
        
        houseType.current.value = "ANY";
        houseStatus.current.value = "ANY";
        housePrice.current.value = 0;
        houseBedrooms.current.value = 1;
        houseBathrooms.current.value = 1;
        houseGarden.current.value = false;
        props.generatePropertyList();
        

    };
    
    return(
        <form className="pform">
            <h1>Property Search and Bookings</h1>
            <div className="formrow">
                <div className="form-group">
                <p htmlFor="formType"> <i className="bi bi-house"></i> Type</p>
                <select  className="form-select" id="type" ref={houseType} >
                    <option value="ANY">Any</option>
                    <option value="DETACHED">Detached</option>
                    <option value="SEMI">Semi</option>
                    <option value="APARTMENT">Apartment</option>
                </select>
                </div>
                <div className="form-group">
                <p htmlFor="formPrice"> <i className="bi bi-cash-coin"></i>Price</p>
                <select  className="form-select" ref={housePrice}>
                    <option value="0">Any</option>
                    <option value="50000">Up to 50000</option>
                    <option value="100000">Up to 100000</option>
                    <option value="200000">Up to 200000</option>
                    <option value="300000">Up to 300000</option>
                    <option value="400000">Up to 400000</option>
                </select>
                </div>
                <div className="form-group">
                <p htmlFor="formStatus"> <FaTruckLoading />Status</p>
                <select  className="form-select" ref={houseStatus}>
                <option value="ANY">ANY</option>
                    <option value="SOLD">SOLD</option>
                    <option value="FOR SALE">FOR SALE</option>
                    <option value="WITHDRAWN">WITHDRAWN</option>
                </select>
                </div>
                <div className="form-group">
                <p htmlFor="numberOfBedrooms"> <FaBed/>Bedrooms</p>
                <select  className="form-select" ref={houseBedrooms}>
                    <option value="1">Any</option>
                    <option value="1">Minimum 1</option>
                    <option value="2">Minimum 2</option>
                    <option value="3">Minimum 3</option>
                    <option value="4">Minimum 4</option>
                    <option value="5">Minimum 5</option>
                </select>
            </div>
            <div className="form-group">
                <p htmlFor="numberOfBathrooms"> <FaBath /> Bathrooms</p>
                <select className="form-select" ref={houseBathrooms}>
                    <option value="1">Any</option>
                    <option value="1">Minimum 1</option>
                    <option value="2">Minimum 2</option>
                    <option value="3">Minimum 3</option>
                </select>
            </div>
            <div className="form-group">
                <p htmlFor="numberOfGardens"> <i className="bi bi-tree"></i> Garden</p>
                <select className="form-select" ref={houseGarden}>
                    <option value={true}>Any</option>
                    <option value= {true} >Yes</option>
                    <option value={false}>No</option>
                </select>
            </div>
            </div>
            <div className="text-center">
                <button type="button" className="btn btn-outline-success" onClick={searchvalues}>
                <i className="bi bi-patch-check-fill"></i>&nbsp;Search</button>
                &nbsp;
                <button type="button" className="btn btn-outline-danger" onClick={clearValues}> 
                <i className="bi bi-x-octagon-fill"></i>&nbsp;Clear</button>
            </div>
        </form>);
}
export default PForm;