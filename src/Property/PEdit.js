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
    let inputbuyerid = useRef(null);
    let {id} = useParams();
    function submitProperty() {
        let property = {
            id:id,
            address:inputaddress.current.value,
            postcode:inputpostcode.current.value,
            price:inputprice.current.value,
            status:inputstatus.current.value,
            numbeR_OF_BEDROOMS:inputbedrooms.current.value,
            numbeR_OF_BATHROOMS:inputbathrooms.current.value,
            garden:gardenchecker()
        }
        fetch(`http://localhost:3000/EditProperty/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(property),
        }).then(response => (navigate(`/PView`)))
    }
    function submitPropertywithbuyer() {
        console.log("reached")
        let property = {
            id:id,
            address:inputaddress.current.value,
            postcode:inputpostcode.current.value,
            price:inputprice.current.value,
            status:inputstatus.current.value,
            numbeR_OF_BEDROOMS:inputbedrooms.current.value,
            numbeR_OF_BATHROOMS:inputbathrooms.current.value,
            buyeR_ID:inputbuyerid.current.value,
            garden:gardenchecker()
        }
        fetch(`http://localhost:3000/EditProperty/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(property),
        }).then(response => (navigate(`/PView`)))
    }
    
    function getbuyerid()
    {
        fetch("http://localhost:3000/GetBuyers")
      .then((response) => response.json())
      .then((data) => {
        setBuyerid(data);
      });
    }
    useEffect(() => {getbuyerid()}, []);
    function getProperty() {

        fetch(`http://localhost:3000/GetProperty/${id}`)
        .then((response)=>response.json())
        .then((data)=>{
            inputaddress.current.value = data.address;
            inputpostcode.current.value = data.postcode;
            inputprice.current.value = data.price;
            inputbedrooms.current.value = data.numbeR_OF_BEDROOMS;
            inputbathrooms.current.value = data.numbeR_OF_BATHROOMS;
            inputgarden.current.value = gardenbuilder(data.garden);
            });
    
        }

        function gardenbuilder(g)
        {
            if(g == true)
            {
                return true;
            }
            else if(g ==false)
            {
                return false;
            }
        }
        
        useEffect(()=>getProperty(), []);
        function setbuyerid()
        {
            var currentbuyername = getbuyername(inputbuyerid.current.value);
            if(inputstatus.current.value == "SOLD")
            {
                alert("This property has been sold, please attach a buyer to this property, if you made a mistake please type c to cancel")
                alert("The current buyer is " + currentbuyername + "if your happy press yes")
                let choice = prompt("press c to cancel or yes to continue")
                if(choice === "c")
                {
                    navigate(`/PView`)
                }
                else if(choice === "yes")
                {
                    submitPropertywithbuyer();
                }
                else{
                    setbuyerid();
                }
            }
            else
            {
                submitProperty();
            }
        }
        function getbuyername(id)
    {
        console.log("The id is " + id)
        for(var i = 0; i < buyerid.length; i++)
        {
            if(buyerid[i].id == id)
            {
                var buyername = buyerid[i].firsT_NAME + " " + buyerid[i].surname;
                return buyername;
            }
        }
        
    }
        function gardenchecker(){
            let garden2 = inputgarden.current.value
            if(garden2 =="true")
            {
                return true;
            }
            else if(garden2 == "false")
            {
                return false;
            }
            else
            {
            let garden = inputgarden.current.value.toLowerCase();
            if(garden.toLowerCase() == "true"){
              return true;
            }
            else if(garden.toLowerCase()=="false"){
              return false;
            }
            else{
              alert("Invalid input");
              let choice = prompt("Please enter True or False");
              if(choice.toLowerCase()=="true" ){
                return true;
              }
              else if(choice.toLowerCase()=="false"){
                return false;
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
            <label for="Status"><b>Buyer Name</b></label>
            <select id="SoldStatus" ref={inputbuyerid}> 
            {buyerid.map((buyer) => {
        return (
          <option value={buyer.id}>{buyer.firsT_NAME}  {buyer.surname}</option>
        );
      })}
            </select>

            
            <input type="button"  className="Submitbutton" value="Submit" onClick={()=>setbuyerid()}></input>
        </div>
        
    )
}export default PEdit;