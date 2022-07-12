import React, { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { userSignup, userSignin } from "../api/auth";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// import {useAuth0} from '@auth0/auth0-react'


// data ==> Autho server
async function authSignup(data) {
  return await axios.post("base_URL/crm/api/v1/authsignin", data)

  // expected returned data 
 
    // name: userName,
    // userId: userId,
    // email: userEmail,
    // userType: userType,
    // userStatus: userStatus
    // token: accessToken

}



function Login() {
  const [showSignup, setShowSignup] = useState(false);
  const [message, setMessage] = useState("");

  const [userId, setUserId] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userType, setUserType] = useState("CUSTOMER")
  const [error, setError] = useState(false); 





  // user = data from auth0 server, isAuthenticated = true/false value for validation of user 
  // const {loginWithRedirect, user, isAuthenticated} = useAuth0(); 

  // async function authSignup(data) {
  //   return await axios.post("base_URL/crm/api/v1/authsignin", data)
  
  //   // expected returned data 
   
  //     // name: userName, // userId: userId,// email: userEmail,// userType: userType,
  //     // userStatus: userStatus // token: accessToken
  
  // }


  // const checkAuth = () => {
  //   if(isAuthenticated) {
  //     authSignup(user).then(function(response){
  //       if(response.status === 200) {
  //         setMessage("user logged in successfully")
  //         localStorage.setItem("name", response.data.name);
  //         localStorage.setItem("userId", response.data.userId);
  //         localStorage.setItem("email", response.data.email);
  //         localStorage.setItem("userTypes", response.data.userTypes);
  //         localStorage.setItem("userStatus", response.data.userStatus);
  //         localStorage.setItem("token", response.data.accessToken);
  //       } else {
  //         console.log(response.data.message);
         
  //       }
  //     }).catch(function(error){
  //       console.log(error);
  //     })

  //   }

  // }

  const navigate = useNavigate();

 

  const signupFn = (e) => {
    const data = {
      name: userName,
      userId: userId,
      email: userEmail,
      userType: userType,
      password: userPassword
  };


    console.log("DATA", data);

    e.preventDefault();

    
    userSignup(data).then(function (response) {

            if (response.status === 201) {
              setShowSignup(false)
              clearState()
              setError(false)
              setMessage("User Signed Up Successfully...")
            }
        })
        .catch(function (error) {
            if(error.response.status===400)
            {
                setError(true)
                setMessage(error.response.data.message);
            
                }    
            else
                console.log(error);
        });
  };
  const history = useNavigate();

  const loginFn = (e) => {

    

    const data = {
      userId: userId,
      password: userPassword,
    };
    console.log("DATA", data);
    e.preventDefault();

    userSignin(data)
      .then(function (response) {
        console.log(response);

        //userId, email, userType, userStatis, token
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userTypes", response.data.userTypes);
        localStorage.setItem("userStatus", response.data.userStatus);
        localStorage.setItem("token", response.data.accessToken);

        if (response.data.userTypes === "CUSTOMER") {
          history("/customer");
        } else if (response.data.userTypes === "ENGINEER") {
          history("/engineer");
        } else {
          history("/admin");
        }

      })
      .catch(function (error) {
        if (error.response.status === 400) {
          setMessage(error.response.data.message);
        } else {
          console.log(error);
          setMessage(error.resonse.data.message);

        }
      });
  };

  const updateSignupData = (e) => {
    setMessage("")
    if(e.target.id === "userId")
      setUserId(e.target.value)
    else if(e.target.id === "password")
      setUserPassword(e.target.value)
    else if(e.target.id === "password")
      setUserPassword(e.target.value)
    else if(e.target.id === "username")
      setUserName(e.target.value)
    else
      setUserEmail(e.target.value)
  };

  const toggleSignup = () => {
    clearState();
    setShowSignup(!showSignup);

  }

  const handleSelect = (e) => {
    setUserType(e)

  }

  const clearState = () => {
    setMessage("")
    setError(false)
    setUserId("")
    setUserPassword("")
    setUserName("")
    setUserEmail("")


  }

  return (
    <div className="bg-primary d-flex justify-content-center align-items-center vh-100">
      <div className="card m-5 p-5">
        <div className="row">
          <div className="col">
            {!showSignup ? (
              <div className="login">
                <form onSubmit={loginFn}>
                  <h4 className="text-center p-3"> Login</h4>
                  <input
                    className="input-group m-2 form-control"
                    type="text"
                    placeholder="Enter your userId"
                    id="userId"
                    onChange={updateSignupData}
                  />
                  <input
                    className="input-group m-2 form-control"
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    onChange={updateSignupData}
                  />
                  <button className="btn btn-primary m-2 d-flex justify-content-center align-items-center">
                    Login
                  </button>
                  <div
                    className="text-center text-info"
                    onClick={() => toggleSignup()}
                  >
                    Not a member? Signup
                  </div>
                  <div className="text-danger text-center">{message}</div>
                </form>
              </div>
            ) : (
              <div className="signup">
                <form onSubmit={signupFn}>
                  <h4 className="text-center p-3"> Signup</h4>
                  <input
                    className="input-group m-2 form-control"
                    type="text"
                    placeholder="Enter your Name"
                    id="username"
                    onChange={updateSignupData}
                  />
                  <input
                    className="input-group m-2 form-control"
                    type="text"
                    placeholder="Enter your userId"
                    id="userId"
                    onChange={updateSignupData}
                  />
                  <input
                    className="input-group m-2 form-control"
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    onChange={updateSignupData}
                  />
                  <input
                    className="input-group m-2 form-control"
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    onChange={updateSignupData}
                  />

                  <div className="input-group m-2 form-control">
                    <span className="text-muted">User Type</span>
                    <DropdownButton
                      align="end"
                      title={userType}
                      variant="light"
                      className="mx-2"
                      onSelect={handleSelect}
                    >
                      <Dropdown.Item eventKey="CUSTOMER">
                        CUSTOMER
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="ENGINEER">
                        ENGINEER
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <button className="btn btn-primary m-2 d-flex justify-content-center align-items-center">
                    Signup
                  </button>
                  <div
                    className="text-center text-info"
                    onClick={() => toggleSignup()}
                  >
                    Already a member? Login
                  </div>
                  <div className="text-danger text-center">{message}</div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
