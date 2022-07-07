import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Admin from "./pages/Admin";
// const Admin = React.lazy(()=> import("./pages/Admin"))
import RequireAuth from "./component/RequireAuth";
import Engineer from "./pages/Engineer";
import Customer from "./pages/Customer";
import NotFound from "./component/NotFound";
import Unauthorized from './component/Unauthorised';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '@coreui/coreui/dist/css/coreui.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-circular-progressbar/dist/styles.css';


const ROLES = {
  "CUSTOMER": "CUSTOMER",
  "ENGINEER": "ENGINEER",
  "ADMIN": "ADMIN",
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* ROLES.ADMIN ====  [ADMIN] */}
          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>  
            <Route path="/admin" exact element={<Admin />} />
          </Route>
          {/* ROLES>CUSTOER === [CUSTOMER]   */}
          <Route element={<RequireAuth allowedRoles={[ROLES.CUSTOMER]} />}>
            <Route path="/customer" element={<Customer />} />
            {/* <Route path="/creteTicket" element={<CreatTicket />} /> */}
          </Route>
         

          {/* ROLES.ENINEER === ENGINEER */}
          <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />}>
            <Route path="/engineer" element={<Engineer />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;



/*

API FETCHING FLOW  


 Step 1 : get all the necessary keys in place : .env, url, 
          REACT_APP_SERVER_URL= https://relevel-crm--backend.herokuapp.com
 2.1:GET Fetch the api and get the results in console. 
           axios.get ==> .then ==> log the response
 2.2: POST, send the data to the api and log the response in console
            axios.post ==> grab the values from UI ==> .then ==> log the response
 2.3: PUT, Grab the curr value, store it -- print the curr values, grab the new values and send the new values to the api 
 2.4: DELETE, .remove() 
            axios.delete ==> .remove ==> .then ==> log the reponse 
 3. Map theough the array of objects and print it list 
 4. To work on the UI/Ux
*/
