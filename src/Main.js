import React from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Add from "./Seller/Add";
import View from "./Seller/View";
import Edit from "./Seller/Edit";
import BAdd from "./Buyer/BAdd";
import BView from "./Buyer/BView";
import BEdit from "./Buyer/BEdit";
import './Main.css';
function Main(){
    return (
        <BrowserRouter>

        <div className='Navigation'>
        <h1>Pages</h1>
        <Link to="View">View Seller</Link>
        <Link to="BView">View Buyer</Link>
        </div>
    

        <Routes>
            <Route path="/Add" element={<Add/>}/>
            <Route path="/View" element={<View/>}/>
            <Route path="/Edit/:id" element={<Edit/>}/>
            <Route path="/BAdd" element={<BAdd/>}/>
            <Route path="/BView" element={<BView/>}/>
            <Route path="/BEdit/:id" element={<BEdit/>}/>
        </Routes>
        </BrowserRouter>
    );
}
export default Main;