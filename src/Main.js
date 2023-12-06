import React from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Add from "./Seller/Add";
import View from "./Seller/View";
import Edit from "./Seller/Edit";
import BAdd from "./Buyer/BAdd";
import BView from "./Buyer/BView";
import BEdit from "./Buyer/BEdit";
import PView from "./Property/PView";
import PEdit from "./Property/PEdit";
import PAdd from "./Property/PAdd";
import BOEdit from "./Booking/BOEdit";
import BOView from "./Booking/BOView";
import BOAdd from "./Booking/BOAdd";
import { IconName } from "react-icons/bs";
import { BsFillHousesFill } from "react-icons/bs";

import './Main.css';
function Main(){
    return (
        <BrowserRouter>

        <div className='Navigation'>
        <h1> <BsFillHousesFill /> QA Virtual Agents</h1>
        <Link to="View">View Seller</Link>
        <Link to="BView">View Buyer</Link>
        <Link to="PView">View Property</Link>
        <Link to="BOView">View Booking</Link>
        </div>
    

        <Routes>
            <Route path="/" element={<PView/>}/>
            <Route path="/Add" element={<Add/>}/>
            <Route path="/View" element={<View/>}/>
            <Route path="/Edit/:id" element={<Edit/>}/>
            <Route path="/BAdd" element={<BAdd/>}/>
            <Route path="/BView" element={<BView/>}/>
            <Route path="/BEdit/:id" element={<BEdit/>}/>
            <Route path="/PAdd" element={<PAdd/>}/>
            <Route path="/PView" element={<PView/>}/>
            <Route path="/PEdit/:id" element={<PEdit/>}/>
            <Route path="/BOAdd" element={<BOAdd/>}/>
            <Route path="/BOView" element={<BOView/>}/>
            <Route path="/BOEdit/:id" element={<BOEdit/>}/>
        </Routes>
        </BrowserRouter>
    );
}
export default Main;