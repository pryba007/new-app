import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { BsFillHousesFill } from "react-icons/bs";
import Footer from "./Footer/Footer";
import './Main.css';
import Login from "./Login";
function Main() {
    return (
        <>
            <div className='Navigation'>
                <h1> <BsFillHousesFill /> QA Virtual Agents</h1>
                <Link to="View">View Seller</Link>
                <Link to="BView">View Buyer</Link>
                <Link to="PView">View Property</Link>
                <Link to="BOView">View Booking</Link>
                <Link to="Login" style={{ float: 'right' }}>Login</Link>
            </div>



            
        </>
    );
}
export default Main;