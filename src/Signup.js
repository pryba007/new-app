import React from 'react';
import { BsFillHousesFill } from "react-icons/bs";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function handleChange(){
    return null
}

function signupDB(){
    return null
}

function Signup() {
  return (
    <div>
    <MDBContainer fluid>
          <MDBRow>

            <MDBCol sm='6'>

              <div className='d-flex flex-row ps-5 pt-5'>
                <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
                <span className="h1 fw-bold mb-0"> <BsFillHousesFill /> QA Virtual Agents</span>
              </div>

              <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

                <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Join us</h3>

                <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Username' onChange={handleChange} name="username" type='text' size="lg" />
                <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' onChange={handleChange} name="password" type='password' size="lg" />

                <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={signupDB}>Sign up</MDBBtn>
                <p className='ms-5'>Already have an account? <a href="/Login" class="link-info">Login here</a></p>

              </div>

            </MDBCol>

            <MDBCol sm='6' className='d-none d-sm-block px-0'>
              <img src="https://images.pexels.com/photos/1212053/pexels-photo-1212053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
            </MDBCol>

          </MDBRow>

        </MDBContainer>
      </div>
  );
}

export default Signup;