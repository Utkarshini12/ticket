import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Sidebar from "../component/Sidebar";
import { Modal, Button } from 'react-bootstrap';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { fetchTicket, ticketUpdation } from "../Api/tickets";

import "../styles/admin.css"
import { getAllUsers } from "../Api/user";



// Psuedo code for put logic 
//  read the data ==> (ticket) => setState(ticket)
// grab the new Values ==> (data) => setState(data)
// call the api => function(id, data)


const logoutFn = () => {
  localStorage.clear();
  window.location.href = "/";
}

function Admin() {
  const [userModal, setUserModal] = useState(false);
  const [ticketList, setTicketList] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  // old values
  const [ticketDetails, setTicketDetails] = useState({});
  // new updated values 
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
  const [ticketUpdateModal, setTicketUpdateModal] = useState(false);
  // {new Obj } new values user 
  // First update with selectedCurr Ticket ==> grab the specific row  ==> CURR VALUE 
  // Second update : replacing old values with new data ==> NEW VVALUES THAT UOU ENTERED IN MODAL 

  const updateSelectedCurrTicket = (data) => setSelectedCurrTicket(data)

  const [ticketCount, setTicketCount] = useState({});
  const [message, setMessage] = useState("");

  const onCloseTicketModal = () => {
    setTicketUpdateModal(false)
  }

  const showUserModal = () => {
    setUserModal(true)
  }
  const closeUserModal = () => {
    setUserModal(false)
  }

  // useEffect(() => {
  //   (async () => {
  //     fetchTickets()
  //     fetchUsers()
  //   })()

  // }, [])


  // user logic 


  const fetchUsers = (userId) => {
    getAllUsers(userId).then(function (response) {
      if (response.status === 200) {
        if (userId) {
          setUserDetails(response.data);
        } else {
          setUserDetails(response.data);
        }


      }
    }).catch((error) => {
      console.log(error);
      // logoutFn()

    })
  }

  // ticket logic 

  const fetchTickets = () => {
    fetchTicket().then(function (response) {
      if (response.status === 200) {
        console.log(response);
        setTicketList(response.data);
        // counting the tickets : recieving the data 
        updateTicketsCount(response.data);
      }
    }).catch((error) => {
      // logoutFn();
      // console.log(error);
      setMessage(error)

    })
  }

  // read the existing values

  const editTicket = (ticketDetail) => {

    const ticket = {
      assignee: ticketDetail.assignee,
      description: ticketDetail.description,
      id: ticketDetail.id,
      reporter: ticketDetail.reporter,
      status: ticketDetail.status,
      ticketPriority: ticketDetail.ticketPriority,
      title: ticketDetail.title
    }

    console.log("CURR_TICKET", ticket);
    // storing the existing values that we grabbed in a state
    setSelectedCurrTicket(ticket);
    // open a modal 
    setTicketUpdateModal(true);





  }

  console.log("sdgjhd", selectedCurrTicket);


  // read the updated value from the user 

  const onTicketUpdate = (e) => {
    if (e.target.name === "title") {
      selectedCurrTicket.title = e.target.value
    } else if (e.target.name === "assignee") {
      selectedCurrTicket.assignee = e.target.value
    }
    // else if(e.target.name === "description") {
    //   selectedCurrTicket.description = e.target.value
    // }


    // title: testing1
    // title: Utkarshini

    // create a new object wit new values ==> object.assign 
    // (target, source) target : new values , source : destination where you want your updated values 

    // let newValues =  Object.assign({}, selectedCurrTicket) ==> {}
    updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket))

  // const updateSelectedCurrTicket = (data) => setSelectedCurrTicket(data)


  }

  // call the api 

  const updateTicket = (e) => {
    e.preventDefault();
    ticketUpdation(selectedCurrTicket.id, selectedCurrTicket).then(function (response) {
      // console.log("Ticket updated successfully");
      setMessage("Ticket updated successfully!");
      onCloseTicketModal();
    }).catch(function (error) {
      console.log(error);
      // logoutFn();
    })
  }
 

  // count the tickets

  const updateTicketsCount = (tickets) => {
    const data = {
      pending: 0,
      closed: 0,
      open: 0,
      blocked: 0
    }
    tickets.forEach(x => {
      if (x.status === "OPEN")
        data.open += 1
      else if(x.status === "IN_PROGRESS") 
        data.pending +=1

    })
    setTicketCount(Object.assign({}, data))
    console.log(data);

  }

  console.log("*****", ticketCount);


  // const deleteEntry =(data) => {
  //   removeEntry(data);
  // }



















  return <div className="bg-light min-vh-100">

    <div className="row">
      <div className="col-1">
        <Sidebar />
      </div>
      <div className="container col m-1">
        <h3 className="text-primary text-center">Welcome {localStorage.getItem("name")}</h3>
        <p className="text-muted text-center">Take a quick look at your stats below</p>

        {/* STATS CARDS START HERE */}
        <div className="row container my-5 mx-2 text-center">
          <div className="col my-1 p-2">
            <div className="borders-b card bg-primary bg-opacity-25 p-2" style={{ width: 12 + 'rem' }}>
              <div className="cardbody">
                <h5 className="card-subtitle">
                  <i className="bi bi-pen text-primary mx-2"></i>
                  OPEN
                </h5>
                <hr />
                <div className="row">
                  <div className="col">{ticketCount.open}</div>
                  <div className="col">
                    <div style={{ height: 30, width: 30 }}>
                      <CircularProgressbar value={ticketCount.open}
                        styles={buildStyles({
                          textColor: "blue",
                          pathColor: "darkBlue",

                        })}
                      />
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

        <hr />
        <div className="container">
          <h6 className="text-center">{message}</h6>

          <MaterialTable

            onRowClick={(event, ticketDetail) => editTicket(ticketDetail)}

            data={ticketList}

            columns={[
              {
                title: 'Ticket ID',
                field: 'id'
              },

              {
                title: 'TITLE',
                field: 'title'
              },
              {
                title: 'Description',
                field: 'description'
              },
              {
                title: 'Reporter',
                field: 'reporter'
              },
              {
                title: 'Priority',
                field: 'ticketPriority'
              },
              {
                title: 'Assignee',
                field: 'assignee'
              },
              {
                title: "Status",
                field: "status",
                lookup: {
                  "OPEN": "OPEN",
                  "IN_PROGRESS": "IN_PROGRESS",
                  "BLOCKED": "BLOCKED",
                  "CLOSED": "CLOSED"
                }
              }
            ]}

            // actions={[
            //   {
            //     icon:Delete,
            //     tooptip: "Delete entry",
            //     onClick: (event, rowData) => deleteEntry(rowdata)
            //   }
            // ]}

            options={{
              filtering: true,
              exportMenu: [{
                label: 'Export Pdf',
                exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Ticket Records')
              },
              {
                label: 'Export Csv',
                exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Ticket Records')
              },
              ],
              headerStyle: {
                backgroundColor: 'darkblue',
                color: "#fff"
              },
              rowStyle: {
                backgroundColor: "#eee"
              }
            }}



            title="TICKET RECORDS"

          />


          {ticketUpdateModal ? (
            <Modal
              show={ticketUpdateModal}
              onHide={onCloseTicketModal}
              backdrop="static"
              centered >
              <Modal.Header closeButton>
                <Modal.Title>Update Ticket</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={updateTicket}>
                  <div className="p-1">
                    <h5 className="text-primary">Ticket ID :{selectedCurrTicket.id}</h5>
                    <div className="input-group">
                      <label className="label input-group-text label-md"> Title

                      </label>
                      <input type="text" className="form-control" name="title" value={selectedCurrTicket.title} onChange={onTicketUpdate} />

                    </div>
                    <div className="input-group">
                      <label className="label input-group-text label-md"> Assignee
                      </label>
                      <select value={selectedCurrTicket.assignee} onChange={onTicketUpdate} name="assignee">
                        {/* we want the full user list printed ere so that we can assign the new user 
                            - The user List is coming from the getUsers api ===> userDetails
                            - We only want to print engineers 
                        */}

                        {
                          userDetails.map((e, i)=> {
                            if(e.userTypes === "ENGINEER") 
                            return <option key={i} value={e.value}>{e.name}</option>
                          })
                        }

                      </select>
                    </div>

                    <Button type="submit" className="my-1">Update </Button>
                  </div>
                </form>
              </Modal.Body>

            </Modal>

          ) : ("")}

          <MaterialTable
            //  onRowClick={(rowData, userId)=> fetchUsers(rowData.userId) }

            columns={[
              {
                title: 'User ID',
                field: 'userId'
              },

              {
                title: 'Name',
                field: 'name'
              },
              {
                title: 'Email',
                field: 'email'
              },

              {
                title: "USER Type",
                field: "userTypes",
                lookup: {
                  "CUSTOMER": "CUSTOMER",
                  "ENGINEER": "ENGINEER",
                  "ADMIN": "ADMIN",
                  "CLOSED": "CLOSED"
                }
              },
              {
                title: "Status",
                field: "userStatus",
                lookup: {
                  APPROVED: "APPROVED",
                  PENDING: "PENDING",
                  REJECTED: "REJECTED",
                },
              }

            ]}

            options={{
              exportMenu: [{
                label: 'Export Pdf',
                exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Ticket Records')
              },
              {
                label: 'Export Csv',
                exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Ticket Records')
              },
              ],
              headerStyle: {
                backgroundColor: 'darkblue',
                color: "#fff"
              },
              rowStyle: {
                backgroundColor: "#eee"
              }
            }}

            data={userDetails}

            title="USER RECORDS"

          />


        </div>

        <hr />




        <button className="btn btn-primary" onClick={showUserModal}>Open Modal</button>



      </div>
    </div>
  </div>
}

export default Admin;
