import React, { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { userSignup, userSignin } from "../Api/auth";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [signUp, setshowsignUp] = useState(false);
  const [userType, setuserType] = useState("CUSTOMER");
  const [userSignupData, setUserSignupData] = useState({});
  const [message, setMessage] = useState("");
  const toggleSignUp = () => {
    setshowsignUp(!signUp);
  };

  const handleSelect = (e) => {
    setuserType(e);
  };

  const updateSignupData = (e) => {
    userSignupData[e.target.id] = e.target.value;
    console.log(userSignupData);
  };

  const signupFn = (e) => {
    const username = userSignupData.username;
    const userId = userSignupData.userId;
    const email = userSignupData.email;
    const password = userSignupData.password;


    const data = {
      name: username,
      userId: userId,
      email: email,
      userTypes: userType,
      password: password,
    };
    console.log("DATA", data);

    e.preventDefault();

    userSignup(data)
      .then(function (response) {
        if (response === 201) {
          history(0);
        }
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          setMessage(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  };
  const history = useNavigate();

  const loginFn = (e) => {
    
    const userId = userSignupData.userId;
    const password = userSignupData.password;

    const data = {
      userId: userId,
      password: password,
    };
    console.log("DATA", data);
    e.preventDefault();

    userSignin(data)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
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
        }
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          setMessage(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div className="bg-primary d-flex justify-content-center align-items-center vh-100">
      <div className="card m-5 p-5">
        <div className="row">
          <div className="col">
            {!signUp ? (
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
                    onClick={() => toggleSignUp()}
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
                    onClick={() => toggleSignUp()}
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
