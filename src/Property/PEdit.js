import React, {useEffect, useRef, useState} from 'react';
import './PEdit.css';
let {useParams,useNavigate} = require('react-router-dom');

function PEdit() {
    let [buyerid, setBuyerid] = useState([]);
    let navigate = useNavigate();
    let inputaddress = useRef(null);
    let inputpostcode = useRef(null);
    let inputprice = useRef(null);
    let inputstatus = useRef(null);
    let inputbedrooms = useRef(null);
    let inputbathrooms = useRef(null);
    let inputgarden = useRef(null);
    let {id} = useParams();
    function submitProperty() {
        let property = {
            id:id,
            address:inputaddress.current.value,
            postcode:inputpostcode.current.value,
            price:inputprice.current.value,
            status:inputstatus.current.value,
            bedroom:inputbedrooms.current.value,
            bathroom:inputbathrooms.current.value,
            garden:gardenchecker()
        }
        fetch(`http://localhost:3000/property/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(property),
        }).then(response => (navigate(`/PView`)))
    }
    function getbuyerid()
    {
        fetch("http://localhost:3000/buyer")
      .then((response) => response.json())
      .then((data) => {
        setBuyerid(data);
      });
    }
    useEffect(() => {getbuyerid()}, []);
    function getProperty() {

        fetch(`http://localhost:3000/property/${id}`)
        .then((response)=>response.json())
        .then((data)=>{
            inputaddress.current.value = data.address;
            inputpostcode.current.value = data.postcode;
            inputprice.current.value = data.price;
            inputbedrooms.current.value = data.bedroom;
            inputbathrooms.current.value = data.bathroom;
            inputgarden.current.value = gardenbuilder(data.garden);
            });
    
        }

        function gardenbuilder(g)
        {
            if(g == 1)
            {
                return "Yes";
            }
            else if(g == 0)
            {
                return "No";
            }
        }

        useEffect(()=>getProperty(), []);
        function setbuyerid()
        {
            if(inputstatus.current.value == "SOLD")
            {
                alert("This property has been sold, please attach a buyer to this property, if you made a mistake please type c to cancel")
                let choice = prompt("Please enter the buyer ID")
                if(choice === "c")
                {
                    navigate(`/PView`)
                }
                else
                {
                let found = false;
                for(let i = 0; i < buyerid.length; i++)
                {
                    if(choice == buyerid[i].id)
                    {
                        found = true;
                    }
                }
                if(found == false)
                {
                    console.log(choice)
                    alert("Buyer ID not found")
                    setbuyerid();
                }
                else if(found == true)
                {
                    alert("Buyer ID found")
                        submitProperty();
                }
            }
            }
            else
            {
                submitProperty();
            }
        }
        function gardenchecker(){
            let garden2 = inputgarden.current.value
            if(garden2 ==1)
            {
                return 1;
            }
            else if(garden2 == 0)
            {
                return 0;
            }
            else
            {
            let garden = inputgarden.current.value.toLowerCase();
            if(garden.toLowerCase() == "yes"){
              return 1;
            }
            else if(garden.toLowerCase()=="no"){
              return 0;
            }
            else{
              alert("Invalid input");
              let choice = prompt("Please enter Yes or No");
              if(choice.toLowerCase()=="yes" ){
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
        }
          }
    return (
        <div className='pedit'>
            <h1>Edit Property</h1>
            <label for="PropertyAddress"><b>Property Address: </b></label>
            <input type="text" className='p1' id = "propertyaddress"placeholder="Address" ref= {inputaddress} ></input>
            <label for="PropertyPostcode"><b>Property Postcode: </b></label>
            <input type="text" className='p1' id = "propertypostcode"placeholder="Postcode" ref= {inputpostcode} ></input>
            <label for="PropertyPrice"><b>Property Price: </b></label>
            <input type="text" className='p1' id = "propertyprice"placeholder="Price" ref= {inputprice} ></input>
            <label for="PropertyBedrooms"><b>Property Bedrooms: </b></label>
            <input type="text" className='p1' id = "propertybedrooms"placeholder="Bedrooms" ref= {inputbedrooms} ></input>
            <label for="PropertyBathrooms"><b>Property Bathrooms: </b></label>
            <input type="text" className='p1' id = "propertybathrooms"placeholder="Bathrooms" ref= {inputbathrooms} ></input>
            <label for="PropertyGarden"><b>Property Garden: </b></label>
            <input type="text" className='p1' id = "propertygarden"placeholder="Garden" ref= {inputgarden} ></input>
            <label for="Status"><b>Property Status: </b></label>
            <select id="PropertyStatus" ref={inputstatus}> 
            <option value="FOR SALE">For Sale</option>
            <option value="SOLD">Sold</option>
            <option value="WITHDRAWN">Withdrawn</option>
            </select>
            <input type="button"  className="Submitbutton" value="Submit" onClick={()=>setbuyerid()}></input>
        </div>
    )
}export default PEdit;