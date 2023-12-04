import React, {useState, useEffect} from 'react';
import './View.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
function View(){
    let [sellerList, setSellerList] = useState([]);


    useEffect(()=>{
        generateSellerList();
    }, []);


    function generateSellerList()
    {
        fetch('http://localhost:3000/seller')
        .then((response)=>response.json())
        .then((data)=>{
            setSellerList(data)});
    }


    function DeleteFromList(props)
    {
        console.log(props);
        fetch(`http://localhost:3000/seller/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: props}),
        })
        .then((response)=>response.json());
        generateSellerList();
    }
    
    return (
        <div className='View'>
        <ul>
            {console.log(sellerList)}
            {sellerList.map((seller)=>{
                return(
                    <ul>
                     <li>First Name: {seller.firstName}</li>
                     <li>Last Name:{seller.surname}</li> 
                    <li> Address: {seller.address}</li>
                    <li>Post Code:{seller.postcode}</li>
                    <li>Phone: {seller.phone}</li>
                    <input className = "deletebtn" type='button' value="Delete" onClick={()=>DeleteFromList(seller)}></input>
                    <p className='linkpe'>
                    <Link className='editLink' to ={ `/Edit/${seller.id}`}>Edit</Link>
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
}export default View;