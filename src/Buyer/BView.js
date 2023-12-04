import React, {useState, useEffect} from 'react';
import './BView.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
function BView(){
    let [buyerList, setBuyerList] = useState([]);


    useEffect(()=>{
        generateBuyerList();
    }, []);


    function generateBuyerList()
    {
        fetch('http://localhost:3000/buyer')
        .then((response)=>response.json())
        .then((data)=>{
            setBuyerList(data)});
    }


    function DeleteFromList(props)
    {
        console.log(props);
        fetch(`http://localhost:3000/buyer/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: props}),
        })
        .then((response)=>response.json());
        generateBuyerList();
    }
    
    return (
        <div className='View'>
        <ul>
            {console.log(buyerList)}
            {buyerList.map((buyer)=>{
                return(
                    <ul>
                     <li>First Name: {buyer.firstName}</li>
                     <li>Last Name:{buyer.surname}</li> 
                    <li> Address: {buyer.address}</li>
                    <li>Post Code:{buyer.postcode}</li>
                    <li>Phone: {buyer.phone}</li>
                    <input className = "deletebtn" type='button' value="Delete" onClick={()=>DeleteFromList(buyer)}></input>
                    <p className='linkpe'>
                    <Link className='editLink' to ={ `/Edit/${buyer.id}`}>Edit</Link>
                    </p>
                    <p className='linkpa'>
                    <Link className='AddLink' to ={ `/Add`}> Add</Link>
                    </p>
                    </ul>
                    
                );
            })}
        </ul>
        </div>
    );
}export default BView;