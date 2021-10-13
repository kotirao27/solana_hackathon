import React, { useState } from "react";
import "./DashBoard.css";
import { RouteComponentProps } from "react-router-dom"
import logout from '../images/icon_logout.png';
import {sendRequestData, queryCompleteData, InvoiceDataList, InvoiceData } from "../helpers/wallet";
import { render } from "react-dom";
import{Modal, Button, Form} from 'react-bootstrap';
import "./bootstrap.css"
import Alert from 'react-popup-alert'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



interface RouterProps {
  history: any;
  location: any;
  match: any;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    show: boolean,
    invoicedata: InvoiceData[],
    invoiceno: string,
    suppliername: string,
    customername: string,
    invoiceamt: number,
    isfinanced: string,
    showSuccess: boolean,
    alerttype:string,
    alertmessage:string,
    alertshow:boolean
};

export default class DashBoard extends React.Component<Props, State> {
    

    constructor(props: Props) {
      super(props);
      this.handleShow = this.handleShow.bind(this);
      
        this.state = {
          show: false,
          invoicedata: [],
          invoiceno: "",
          suppliername: "",
          customername: "",
          invoiceamt: 0,
          isfinanced: "",
          showSuccess: false,
          alerttype:'error',
          alertmessage:'',
          alertshow:false
        };
        
      }

      componentDidMount(){
        queryCompleteData().then(value => {
        this.setState({invoicedata: value.data});
        });
      }

      setInvoiceNo(e: any){
       this.setState({invoiceno: e.target.value});
      }

      setSupplierName(e: any){
        this.setState({suppliername: e.target.value});
      }

      setCustomerName(e: any){
        this.setState({customername: e.target.value});
      }

      setDocumentAmt(e: any){
        this.setState({invoiceamt: e.target.value});
      }


      onCloseAlert() {
        this.setState({
          alerttype: '',
          alertmessage: '',
          alertshow: false
        })
      }
    
      handleShow() {
          this.setState({
            show: true
          });
        } 
        handleClose() {
          this.setState({
            show: false
          });
          this.setState({invoicedata: []});
          queryCompleteData().then(value => {
            this.setState({invoicedata: value.data});
            });
      } 

    handleSaveDoc(){

    let requestData = "{\"invoiceno\""+":"+"\""+this.state.invoiceno+"\",\"suppliername\""+":"+"\""+this.state.suppliername+"\",\"customername\""+":"+"\""+this.state.customername+"\",\"invoiceamt\""+":"+this.state.invoiceamt+",\"instruction\""+":"+"\"CREATE"+"\",\"invoicedate\""+":"+"\"10-OCT-2021"+"\",\"isfinanced\""+":"+"\"N"+"\"}";

    console.log(requestData);
       
    sendRequestData(requestData).then(value => {
      console.log('resolved', value);
      this.setState({show:false});
      this.setState({invoiceno:""});
      this.setState({suppliername:""});
      this.setState({customername:""});
      this.setState({invoiceamt:0});
      
      toast.success('Save successful !!');
 
    }).catch(error => {
      console.log('rejected', error);
      this.setState({show:false});
      toast.error('Error saving data');
    });
    }

    render() {

  return (
  
<div>

<header className="header-section">
	<div className="header-left"><a href="#" className="logo-text">FRAUD REVEAL</a></div>
	<div  className="header-right">
		<ul className="menu-section">
			<li className="menu-list"><div className="user-section"><span className="welcome-text">Welcome !</span><h3 className="user-name">Supplier</h3></div></li>
			<li className="menu-list"><div className="user-initial">RA</div></li>
			<li className="menu-list"><a href="/" title="Logout" className="meun-item" data-toggle="tooltip" data-placement="top"><img src={logout} alt="Icon"></img></a></li>				
		</ul>
	</div>
</header>
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
<ToastContainer />

<main role="main" className="main-body-container">
	<section className="container dashboard-container">
		<div className="button-section">
			<div className="left-sec"></div>
			<div className="right-sec">

      <Button variant="primary" className="action-button" onClick={this.handleShow}> Add</Button>

			</div>			
		</div>
		<div className="table-conatiner">
			<table className="table custom-table">
				<thead>
					<tr>
						<th scope="col">Document Number</th>
						<th scope="col">Supplier Name</th>
						<th scope="col" className="align-center">Currency</th>
						<th scope="col" className="align-right">Amount</th>
						<th scope="col" className="align-center th-col-date">Date</th>
					</tr>
				</thead>
				<tbody>
        {this.state.invoicedata.map((item =>
          <tr>
          <td>{item.invoiceno}</td>
          <td>{item.suppliername}</td>
          <td className="align-center">USD</td>
          <td className="align-right">{item.invoiceamt}</td>
          <td className="align-center th-col-date">{item.invoicedate}</td>				
         </tr>
        ))}

				</tbody>
			</table>
		</div>
	</section>
</main>
<footer className="footer-section">
	<div className="footer-content">Copyright ©2021. All Rights Reserved.</div>
</footer>

      <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>

       {this.state.showSuccess ? (
         <span >Save successful !</span>
       ) : null}
        <Form.Group >
              <Form.Label>Document number: </Form.Label>
              <Form.Control type="text" id="invoiceno" name="invoiceno" onChange={this.setInvoiceNo.bind(this)} value={ this.state.invoiceno }
              placeholder="Input Document number"/>        

              <Form.Label>Supplier name: </Form.Label>
              <Form.Control type="text" id="suppliername" name="suppliername" onChange={this.setSupplierName.bind(this)} value={ this.state.suppliername }
              placeholder="Input Supplier name"/>     

              <Form.Label>Customer name: </Form.Label>
              <Form.Control type="text" id="customername" name="customername"  onChange={this.setCustomerName.bind(this)} value={ this.state.customername }
              placeholder="Input Customer name"/>   

              <Form.Label>Document amount: </Form.Label>
              <Form.Control type="text" id="invoiceamt" name="invoiceamt" onChange={this.setDocumentAmt.bind(this)} value={ this.state.invoiceamt }
              placeholder="Input Document amount"/>   
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose.bind(this)}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSaveDoc.bind(this)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>

    );
};

}