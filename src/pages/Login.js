import React, {useState} from 'react'
import {Dropdown, DropdownButton} from 'react-bootstrap'

function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const [userType, setuserType] = useState("CUSTOMER")

    const toggleSignup = () => {
        setShowSignup(!showSignup)
    }
    const handleSelect = (e) => {
        setuserType(e)
    }

  return (
    <div className="bg-primary d-flex justify-content-center align-items-center vh-100">
        <div className="card m-5 p-5">
            <div className="row">
                <div className="col">
                    {
                        !showSignup ? (
                            <div className="login">
                                {/* 
                                - user id , password, login button, toggle text 
                                */}
                                <form>
                                    <div className="input-group m-1">
                                        <input type="text" className='form-control' placeholder='User ID' />
                                    </div>
                                    <div className="input-group m-1">
                                        <input type="password" className='form-control' placeholder='password' />
                                    </div>
                                    <div className="input-group m-1">
                                        <input type="submit" className='form-control btn btn-primary' value= "Log in" />
                                    </div>
                                    <div className="text-info text-center pe-auto" onClick={toggleSignup}>Don't have an account? Signup</div>
                                </form>
                            </div>
                        ) : 
                        (
                          <div className="signup">
                               
                                {/* 
                                - user id , username, email,  password, usertype, signup button, toggle text 
                                */}
                                <form>
                                    <div className="input-group m-1">
                                        <input type="text" className='form-control' placeholder='User ID' />
                                    </div>
                                    <div className="input-group m-1">
                                        <input type="text" className='form-control' placeholder='Username' />
                                    </div>
                                  
                                        <input type="email" className='form-control m-1' placeholder='Email' />
                                  
                                    <div className="input-group m-1">
                                        <input type="password" className='form-control' placeholder='password' />
                                    </div>
                                    <div className="input-group m-1">
                                       <span className='text-muted'>User Type</span>
                                        <DropdownButton 
                                        align="end"
                                        title={userType}
                                        variant="light"
                                        className="mx-1"
                                        onSelect={handleSelect} >
                                            <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                            <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                                        </DropdownButton>

                                    </div>


                                    <div className="input-group m-1">
                                        <input type="submit" className='form-control btn btn-primary' value= "Sign Up" />
                                    </div>
                                    <div className="text-info text-center" onClick={toggleSignup}>Already have an account? Login</div>
                                </form>
                            
                          </div>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;