import {useState} from 'react';
import Sidebar from "../component/Sidebar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Modal, Button } from "react-bootstrap";
import {fetchTicket, ticketUpdation} from '../api/tickets'
import { useEffect } from 'react';


/* 
Sidebar
stats cards -> widgets --> circular progress bar 
material table --> to print all the tickets 
modal --> to update the tickets 


LOGIC 
Api: ticketUpdation, fetchTicket
 State : to store the tickets 
         selectedCurrTicket to grab the curr ticket and record new updated values
         ticketModal : to open and close the modal
         message : to record the response and errors from api 
         ticketCount: to print the statistics 
         update The Ticket : title, description, ticketProirity, ticket Status
*/

const logoutFn=()=>{
  localStorage.clear();
    window.location.href ="/"
}

function Engineer() {

  const [ticketModal, setTicketModal] = useState(false); 
  // to store all  the tickets
  const [ticketDetails, setTicketDetails] = useState([]);
  // to store  the specific ticket
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
  // to update the new values in ticket 
  const updateSelectedCurrTicket = (data) => setSelectedCurrTicket(data);
  // to store the ticket count 
  const [ticketCount, setTicketCount] = useState({});
  // for messages from backend
  const [message, setMessage] = useState("");

  const onOpenTicketModal = () => {
    setTicketModal(true)
  }
  const onCloseTicketModal = () => {
    setTicketModal(false)
  }

  useEffect(()=> {
    (async ()=> {
      fetchTickets()
    })()
  }, []);



const fetchTickets = () => {
  // fetch the api for tickets 
  fetchTicket().then(function (response) {
    if (response.status === 200) {
          setTicketDetails(response.data);
          updateTicketsCount(response.data)
    }
})
    .catch(function (error) {
        if(error.response.status===401)
        {
           logoutFn()
        }
        console.log(error);
    });
}

// grab the specific ticket

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

    setSelectedCurrTicket(ticket); 
    setTicketModal(true); 
  }

  const onTicketUpdate = (e) => {
    // id of ticket, assignee, reporter 
    if(e.target.name==="title")
      selectedCurrTicket.title = e.target.value
  else if(e.target.name==="description")
      selectedCurrTicket.description = e.target.value
    else if(e.target.name==="status")
      selectedCurrTicket.status = e.target.value
    else if(e.target.name==="ticketPriority")
      selectedCurrTicket.ticketPriority = e.target.value
  
  updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket) ) 
  }

  // call the put api

  const updateTicket = (e) =>{
    e.preventDefault()
    ticketUpdation(selectedCurrTicket.id,selectedCurrTicket).then(function (response){
        setMessage("Ticket Updated Successfully");
        onCloseTicketModal();
        fetchTickets();
  
    }).catch(function (error){
        if (error.status === 400)
            setMessage(error.message);
        else if(error.response.status === 401)
            {
              logoutFn()
            setMessage("Authorization error, retry loging in");
            }
            onCloseTicketModal();
            
        console.log(error.message);
    })
  
  
  }

  // to count the tickets 

  const updateTicketsCount = (tickets) => {
    const data = {
      open:0,
      closed:0,
      progress:0,
      blocked:0

  }
  tickets.forEach(x=>{
      if(x.status==="OPEN")
          data.open+=1
      else if(x.status==="IN_PROGRESS")
          data.progress+=1
      else if(x.status==="BLOCKED")
          data.blocked+=1
      else
          data.closed+=1
  })
  setTicketCount(Object.assign({}, data))
  }

  return (
    <div className="bg-light min-vh-100">
<div className="col-1"><Sidebar /></div>
<div className="container">
  
  <h3 className="text-info text-center">Welcome, {localStorage.getItem("name")}</h3>
  <p className="text-muted text-center">Take a look at your engineer stats below</p>
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
                  <div className="col">
                    {ticketCount.open}
                  </div>
                  <div className="col">
                    <div style={{ height: 30, width: 30 }}>
                      <CircularProgressbar value= {ticketCount.open}
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
          <div className="col my-1 p-2">
            <div className="borders-b card bg-warning bg-opacity-25 p-2" style={{ width: 12 + 'rem' }}>
              <div className="cardbody">
                <h5 className="card-subtitle">
                  <i className="bi bi-lightning-charge text-warning mx-2"></i>
                  PROGRESS
                </h5>
                <hr />
                <div className="row">
                  <div className="col"> {ticketCount.progress}</div>
                  <div className="col">
                    <div style={{ height: 30, width: 30 }}>
                      <CircularProgressbar value= {ticketCount.progess}
                        styles={buildStyles({
                          textColor: "yellow",
                          pathColor: "darkgoldenrod",

                        })}
                      />
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
          <div className="col my-1 p-2">
            <div className="borders-b card bg-success bg-opacity-25 p-2" style={{ width: 12 + 'rem' }}>
              <div className="cardbody">
                <h5 className="card-subtitle">
                  <i className="bi bi-check2-circle text-success mx-2"></i>
                  CLOSED
                </h5>
                <hr />
                <div className="row">
                  <div className="col">{ticketCount.closed}</div>
                  <div className="col">
                    <div style={{ height: 30, width: 30 }}>
                      <CircularProgressbar value={ticketCount.closed}
                        styles={buildStyles({
                          textColor: "green",
                          pathColor: "darkolivegreen",

                        })}
                      />
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
          <div className="col my-1 p-2">
            <div className="borders-b card bg-secondary bg-opacity-25 p-2" style={{ width: 12 + 'rem' }}>
              <div className="cardbody">
                <h5 className="card-subtitle">
                  <i className="bi bi-slash-circle text-secondary mx-2"></i>
                  BLOCKED
                </h5>
                <hr />
                <div className="row">
                  <div className="col">{ticketCount.blocked}</div>
                  <div className="col">
                    <div style={{ height: 30, width: 30 }}>
                      <CircularProgressbar value={ticketCount.blocked}
                        styles={buildStyles({
                          textColor: "grey",
                          pathColor: "silver",

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

        <MaterialTable 
        data = {ticketDetails}
        // grab the specific row and pass it in a function : read
        onRowClick = {(event, rowData)=> editTicket(rowData)}
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
            backgroundColor: 'lightskyblue',
            color: "#fff"
          },
          rowStyle: {
            backgroundColor: "#eee"
          }
        }}

        title="TICKETS ASSIGNED"

        
        />

        <button className="btn btn-info " onClick={onOpenTicketModal}>Open modal</button>

        {
              ticketModal ? (
                  <Modal
                  show={ticketModal}
                  onHide={onCloseTicketModal}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title >UPDATE TICKET</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={updateTicket} >
                          <div className="p-1">
                                <h5 className="card-subtitle mb-2 text-primary lead">Ticket ID: {selectedCurrTicket.id}</h5>
                                <hr />
                                
                                <div className="input-group mb-3">
                                <label className="label input-group-text label-md ">Title</label>
                                    <input type="text" className="form-control" name="title" value={selectedCurrTicket.title} onChange={onTicketUpdate} required/>
                                </div>

                                <div className="input-group mb-3">
                                <label className="label input-group-text label-md ">Assignee</label>
                                    <input type="text" className="form-control"  value={selectedCurrTicket.assignee} disabled />
                                </div>
                                
                                <div className="input-group mb-3">
                                <label className="label input-group-text label-md ">PRIORITY</label>
                                          <input type="number" className="form-control" name="ticketPriority" value={selectedCurrTicket.ticketPriority} onChange={onTicketUpdate} min="1" max="5" required/><p className="text-danger">*</p>
  
                                </div>
                                <div className="input-group mb-3">
                                <label className="label input-group-text label-md ">Status</label>
                                    <select className="form-select" name="status" value={selectedCurrTicket.status} onChange={onTicketUpdate}>
                                        <option value="OPEN">OPEN</option>
                                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                                        <option value="BLOCKED">BLOCKED</option>
                                        <option value="CLOSED">CLOSED</option>
                                    </select>
                                </div>
                                <div className="md-form amber-textarea active-amber-textarea-2">
                                  <textarea id="form16" className="md-textarea form-control" rows="3" name="description" placeholder="Description" value={selectedCurrTicket.description}  onChange={onTicketUpdate} required></textarea>
                                </div>
                            </div>
                            <div className="input-group justify-content-center">
                                    <div className="m-1">
                                    <Button variant="secondary" onClick={() => onCloseTicketModal()}>Cancel</Button>
                                    </div>
                                    <div className="m-1">
                                    <Button type="submit" variant="primary" >Update</Button>
                                    </div>
                                </div>

                         
                          
                      </form>
                      <p className="text-danger">* This field accept only number</p>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>


                </Modal>
              ):(
                  ""
              )

          }

        <Modal
        show={ticketModal}
        onHide={onCloseTicketModal}
        backdrop="static"
        centered
        >
          <Modal.Header closeButton>
                <Modal.Title>Update Ticket</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                <div className="p-1">
                    <h5 className="text-info">Ticket ID :{selectedCurrTicket.id}</h5>
                    <div className="input-group m-1">
                      <label className="label input-group-text label-md"> Title</label>
                      <input type="text" className="form-control" name="title" value={selectedCurrTicket.title} onChange={onTicketUpdate}  />
                      </div>

                      <div className="input-group m-1">
                      <label className="label input-group-text label-md"> Description</label>
                      <textarea type="text" className="form-control" name="description" value={selectedCurrTicket.description}  onChange={onTicketUpdate}  />
                      </div>


                    </div>
                </form>
              </Modal.Body>

        </Modal>






 

</div>
    </div>
  )
}

export default Engineer;
