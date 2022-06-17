import axios from 'axios'

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export async function getAllUsers(userId) {
    return await axios.get(`${BASE_URL}/crm/api/v1/users/`, 
    {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    }
    )
}

export async function updateUserData(userId, data) {
    return await axios.put(`${BASE_URL}/crm/api/v1/users/${userId}`,data, 
    {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    }, {
        "userId": localStorage.getItem("userId")
    }
    )
}


// UPDATE USER DETAILS
// method: put
// func : (userId, data)
// url: /crm/api/v1/users/userId
// headers : token 
// userid : body 