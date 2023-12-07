import React, {useState, useEffect} from 'react';
import './PAdd.css';
let {useParams,useNavigate} = require('react-router-dom');
function PAdd() {
  let navigate = useNavigate();
  let [addProperty, setProperty] = useState([]);
  let [sellerid, setsellerid] = useState([]);
  function idchecker(){
    getsellerid();
    let id = document.getElementById('SellerID').value;
    let check = false;
    for(let i = 0; i < sellerid.length; i++){
      if(id == sellerid[i].id){
        check = true;
      }
  }
  if(check == true){
    return id;
  }
  else{
    alert("Invalid input");
    let choice = prompt("Please enter a valid Seller ID");
    document.getElementById('SellerID').value = choice;
    idchecker();
  }
}
function getsellerid(){
  fetch("http://localhost:3000/seller")
    .then((response) => response.json())
    .then((data) => {
      setsellerid(data);
    });
}
useEffect(() => {
  getsellerid();
}, []);
  function gardenchecker(){
    let garden = document.getElementById('Propertygarden').value;
    if(garden.toLowerCase() == "yes"){
      return 1;
    }
    else if(garden.toLowerCase()=="no"){
      return 0;
    }
    else{
      alert("Invalid input");
      let choice = prompt("Please enter Yes or No");
      if(choice.toLowerCase()=="yes"){
        return 1;
      }
      else if(choice.toLowerCase()=="no"){
        return 0;
      }
      else{
        alert("Invalid input");
        gardenchecker();
      }
    }
    submitProperty();
  }
  function pricecheker(){
    let price = document.getElementById('Propertyprice').value;
    if(price < 0){
      alert("Invalid input");
      let choice = prompt("Please enter a valid price");
      document.getElementById('Propertyprice').value = choice;
      pricecheker();
    }
    else{
      return price;
    }
  }
  function submitProperty() {
    let Property = {
      address: document.getElementById('Propertyaddress').value,
      postcode: document.getElementById('Propertypostcode').value,
      bedroom: document.getElementById('Propertybedrooms').value,
      bathroom: document.getElementById('Propertybathrooms').value,
      garden: gardenchecker(),
      price: pricecheker(),
      status: document.getElementById('PropertyStatus').value,
      sellerId: idchecker()
    }
    fetch('http://localhost:3000/property', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Property),
    })
      .then((response) => response.json())
      .then((data) => {
        setProperty(data);
        navigate('/PView');
      });

  }
  return (
    <div className='Padd'>
      <input type="text" id="Propertyaddress" placeholder="Address"></input>
      <input type="text" id="Propertypostcode" placeholder="Postcode"></input>
      <input type="number" id="Propertybedrooms" placeholder="Bedrooms"></input>
      <input type="number" id="Propertybathrooms" placeholder="Bathrooms"></input>
      <input type="number" id="SellerID" placeholder="Seller ID"></input>
      <input type="text" id="Propertygarden" placeholder="Garden"></input>
      <input type="number" id="Propertyprice" placeholder="Price"></input>
      <label for="Status"><b>Property Status: </b></label>
      <select id="PropertyStatus"> 
      <option value="FOR SALE">For Sale</option>
      </select>
      <input className="Submitbutton" type="button" value="Submit" onClick={()=>submitProperty()}></input>
    </div>
  );
}export default PAdd;