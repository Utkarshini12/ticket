// axios library 
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

// url : crm/api/v1/tickets 
// Authorization : x-access-token : token , userId: userid

// post api : allow the user to create a ticket 
// url : crm/api/v1/tickets 
// Authorization : x-access-token : token 


// put api : allow the engineer,user to edit the ticket
// url : crm/api/v1/tickets/${id}
// Authorization : x-access-token : token , userId: userid

export async function fetchTicket() {
    return await axios.get(`${BASE_URL}/crm/api/v1/tickets/`, 
    {
        headers: {
            'x-access-token': localStorage.getItem('token')
            
        }
    } , 
    {
        "userId" : localStorage.getItem('userId')
    }
    )
}

export async function ticketUpdation(id,selectedCurrTicket) {
    return await axios.put(`${BASE_URL}/crm/api/v1/tickets/${id}`, selectedCurrTicket, {
        headers: {
            'x-access-token': localStorage.getItem("token")
        }
    },{
        "userId":localStorage.getItem("userId")
    })
}






