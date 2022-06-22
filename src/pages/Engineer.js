import {useState} from 'react';
import Sidebar from "../component/Sidebar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Modal } from "react-bootstrap";





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
*/

function Engineer() {

  const [ticketModal, setTicketModal] = useState(false); 

  const onOpenTicketModal = () => {
    setTicketModal(true)
  }
  const onCloseTicketModal = () => {
    setTicketModal(false)
  }
  return (
    <div className="bg-light min-vh-100">
<div className="col-1"><Sidebar /></div>
<div className="container">
  
  <h3 className="text-info text-center">Welcome, Engineer</h3>
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
                  <div className="col">3</div>
                  <div className="col">
                    <div style={{ height: 30, width: 30 }}>
                      <CircularProgressbar value={8}
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
                  <i className="bi bi-pen text-warning mx-2"></i>
                  PROGRESS
                </h5>
                <hr />
                <div className="row">
                  <div className="col">3</div>
                  <div className="col">
                    <div style={{ height: 30, width: 30 }}>
                      <CircularProgressbar value={3}
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
                  <i className="bi bi-pen text-success mx-2"></i>
                  CLOSED
                </h5>
                <hr />
                <div className="row">
                  <div className="col">3</div>
                  <div className="col">
                    <div style={{ height: 30, width: 30 }}>
                      <CircularProgressbar value={3}
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
                  <i className="bi bi-pen text-secondary mx-2"></i>
                  BLOCKED
                </h5>
                <hr />
                <div className="row">
                  <div className="col">3</div>
                  <div className="col">
                    <div style={{ height: 30, width: 30 }}>
                      <CircularProgressbar value={3}
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
        // data = {}
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
                    <h5 className="text-info">Ticket ID :id </h5>

                    </div>
                </form>
              </Modal.Body>

        </Modal>






 

</div>
    </div>
  )
}

export default Engineer;
