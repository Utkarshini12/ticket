import React, {useState} from "react";
import Sidebar from "../component/Sidebar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import {Modal, Button} from 'react-bootstrap'; 




/*
UI : 
: Sidebar
: Cards : react circular progress bar 
: Material Table : to display all the tickets 
: Modal : raise a new ticket 



LOGIC : 
All state values : 
: modal : raise ticket, updateTicket
: ticketDetails : to store all the tickets raised by the user : fetch tickets 
: ticketCount : segregating the tickets according to their status
: currTicket : to update the details , edit the tickets


*/

function Customer() {

  const [raiseTicketModal, setRaiseTicketModal] = useState(false); 

  const showTicketModal = () => setRaiseTicketModal(true);
  const closeTicketModal = () => {
    setRaiseTicketModal(false);
  }

return (
  <>
  
  <div className="bg-light text-center min-vh-100">
  <Sidebar />

  <div className="text-center">
    <h3 className="text-success">Welcome, Customer</h3>
    <div className="row container text-center">
          <div className="col my-1 p-2">
            <div className="borders-b card bg-primary bg-opacity-25 p-2" style={{ width: 12 + 'rem' }}>
              <div className="cardbody">
                <h5 className="card-subtitle">
                  <i className="bi bi-pen text-primary mx-2"></i>
                  OPEN
                </h5>
                <hr />
                <div className="row ">
                  <div className="col">
                    6
                  </div>
                  <div className="col">
                    <div style={{ height: 30, width: 30 }}>
                      <CircularProgressbar value= {6}
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
                  <div className="col"> {5}</div>
                  <div className="col">
                    <div style={{ height: 30, width: 30 }}>
                      <CircularProgressbar value= {5}
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
                  <div className="col">{7}</div>
                  <div className="col">
                    <div style={{ height: 30, width: 30 }}>
                      <CircularProgressbar value={7}
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
                  <div className="col">{0}</div>
                  <div className="col">
                    <div style={{ height: 30, width: 30 }}>
                      <CircularProgressbar value={0}
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

  </div>

 

        <hr />
        <div className="container">
        <MaterialTable 

// data={ticketDetails}
columns={[
  {
      title: "Ticket ID",
      field: "id",
  },
  {
      title: "TITLE",
      field: "title",

  },
  {
      title: "DESCRIPTIONS",
      field: "description",
      filtering: false
  },
  {
      title: "PRIORITY",
      field: "ticketPriority",
  },
  {
      title: "ASSIGNEE",
      field: "assignee",
  },
  {
      title: "Status",
      field: "status",
      lookup: {
          "OPEN": "OPEN",
          "IN_PROGRESS": "IN_PROGRESS",
          "BLOCKED": "BLOCKED",
          "CLOSED":"CLOSED"

      },
  },


]}

options={{
filtering: true,
headerStyle: {
  backgroundColor: 'darkgreen', 
  color: "#fff"
}
}}

title= "TICKETS RAISED BY YOU" 


/>

        </div>

        <hr />
        <div className="container text-center">
        <button className="form-control btn btn-success" onClick={showTicketModal}>Raise Ticket</button>

        {
          raiseTicketModal ? (

            <Modal 
            show={raiseTicketModal}
            onHide={closeTicketModal}
            bakdrop= "static"
            centered >
              <Modal.Header closeButton><Modal.Title>Create Ticket</Modal.Title></Modal.Header>
              <Modal.Body>
                <form>
                  <div className="p-1">
                    <div className="input-group p-1">
                      <input type="text" name="title" className="form-control" placeholder="Title"  />
                    </div>
                    <div className="input-group p-1">
                      <textarea type="text" name="title" className="form-control" placeholder="Description" />
                    </div>

                    <div className="input-group d-flex justify-content-center">
                      <div className="m-1">
                        <Button variant="secondary">Cancel</Button>

                      </div>
                      <div className="m-1">
                      <Button variant="success">Create</Button>


                      </div>

                    </div>
                  </div>
                </form>

              </Modal.Body>
            </Modal>
          ) : ("")

        }

        </div>

     

       




  </div>
  </>

  )
}

export default Customer;
