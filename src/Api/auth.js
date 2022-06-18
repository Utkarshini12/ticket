import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
// const BASE_URL1 = process.env.REACT_APP_CRYPTO_URL;


export async function userSignup(data) {
  return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data);
}
export async function userSignin(data) {
  return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data);



}


// `${BASE_URL1}/category?section=general&items=50&page=1&token=${tokenNew}`


// method : GET/ POST/ PUT/ DELETE
// url : https......../route
// headers, body

// MERN // MEAN
// mongo, express, react, node 