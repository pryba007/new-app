import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Main from './Main';
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
import { Routes, Route,BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Footer from './Footer/Footer';
import Signup from './Signup';
import { IconName } from "react-icons/bs";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <Main />
      <Routes>
        <Route path="/" element={<PView />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/View" element={<View />} />
        <Route path="/Edit/:id" element={<Edit />} />
        <Route path="/BAdd" element={<BAdd />} />
        <Route path="/BView" element={<BView />} />
        <Route path="/BEdit/:id" element={<BEdit />} />
        <Route path="/PAdd" element={<PAdd />} />
        <Route path="/PView" element={<PView />} />
        <Route path="/PEdit/:id" element={<PEdit />} />
        <Route path="/BOAdd" element={<BOAdd />} />
        <Route path="/BOView" element={<BOView />} />
        <Route path="/BOEdit/:id" element={<BOEdit />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
      <Footer />

    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
