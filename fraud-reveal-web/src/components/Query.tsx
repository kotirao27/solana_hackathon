import React from "react";
import "./DashBoard.css";
import "./bootstrap.css"
import { RouteComponentProps } from "react-router-dom"
import logout from '../images/icon_logout.png';
import {queryCompleteData, queryData, updateData, InvoiceDataList, InvoiceData } from "../helpers/wallet";
import{Modal, Button, Form, ToggleButton, ButtonGroup} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import financed from '../images/verified_badgy.png';
import {getUser} from '../helpers/utils';


interface RouterProps {
  history: any;
  location: any;
  match: any;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    user: any
    show: boolean,
    invoicedata: any,
    invoiceno: string,
    suppliername: string,
    customername: string,
    invoiceamt: number,
    isfinanced: string,
    showSuccess: boolean,
    alerttype:string,
    alertmessage:string,
    alertshow:boolean,
    showtable:boolean
};


export default class Query extends React.Component<Props, State> {
    

    constructor(props: Props) {
      super(props);
      
        this.state = {
          user: "",
          show: false,
          invoicedata: [],
          invoiceno: "",
          suppliername: "",
          customername: "",
          invoiceamt: 0,
          isfinanced: "N",
          showSuccess: false,
          alerttype:'error',
          alertmessage:'',
          alertshow:false,
          showtable:false
        }; 
      }

      componentDidMount(){
        let currentuser = window.sessionStorage.getItem('user');
        this.setState({user : currentuser});
      }

      setInvoiceNo(e: any){
       this.setState({invoiceno: e.target.value});
      }

      setSupplierName(e: any){
        this.setState({suppliername: e.target.value});
      }

      onIsFinanceYesChecked(e: any){
          this.setState({isfinanced:"Y"});
      }

      onIsFinanceNoChecked(e:any){
        this.setState({isfinanced:"N"});
      }
    
      handleShow(e:any) {
          console.log(e);
        this.setState({
          show: true
        });
      } 
      handleClose() {
        this.setState({
          show: false
        });
    } 

    handleQuery(){

    queryData(this.state.invoiceno, this.state.suppliername).then(value => {
      console.log('resolved', value);
      this.setState({showtable:true});
      this.setState({invoicedata: value});
      
      let data =  this.state.invoicedata[0];
      this.setState({customername: data.customername});
      
      this.setState({suppliername: data.suppliername});
      this.setState({invoiceamt: data.invoiceamt});
    
    }).catch(error => {
      console.log('rejected', error);
      toast.error('Error querying request');
    });
    }

    handleUpdateDoc(){

        let requestData = "{\"invoiceno\""+":"+"\""+this.state.invoiceno+"\",\"suppliername\""+":"+"\""+this.state.suppliername+"\",\"customername\""+":"+"\""+this.state.customername+"\",\"invoiceamt\""+":"+this.state.invoiceamt+",\"instruction\""+":"+"\"UPDATE"+"\",\"invoicedate\""+":"+"\"14-OCT-2021"+"\",\"isfinanced\""+":\""+this.state.isfinanced+"\"}";
    
        console.log(requestData);
           
        updateData(requestData).then(value => {
          console.log('resolved', value);
          this.setState({show:false});
          toast.success('Update successful !!');
          this.setState({invoicedata: []});    
        }).catch(error => {
          console.log('rejected', error);
          this.setState({show:false});
          toast.error('Error updating data');
        });
        }
    render() {

  return (
  
<div>

<header className="header-section">
	<div className="header-left"><a href="#" className="logo-text">FRAUD REVEAL</a></div>
	<div  className="header-right">
		<ul className="menu-section">
			<li className="menu-list"><div className="user-section"><span className="welcome-text">Welcome !</span><h3 className="user-name">{this.state.user}</h3></div></li>
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
    <div className="main-search-block">
      <Form.Control type="text" id="searchinvoice" name="searchinvoice"  onChange={this.setInvoiceNo.bind(this)} value={ this.state.invoiceno }
      placeholder="Document number" className="search-field"/>
      <Form.Control type="text" id="searchsupp" name="searchsupp"  onChange={this.setSupplierName.bind(this)} value={ this.state.suppliername }
      placeholder="Supplier number" className="search-field"/>
      <Button variant="primary" className="action-button" onClick={this.handleQuery.bind(this)}>Search</Button> 
    </div>
    {this.state.invoicedata != "" ? (
	
		<div className="table-conatiner">
			<table className="table custom-table">
				<thead>
					<tr>
						<th scope="col">Document Number</th>
						<th scope="col">Supplier Name</th>
						<th scope="col" className="align-center">Customer</th>
						<th scope="col" className="align-right">Amount</th>
						<th scope="col" className="align-center th-col-date">Date</th>
                        <th scope="col" className="align-center">Financed</th>
					</tr>
				</thead>
				<tbody>
        {this.state.invoicedata.map(((item: { invoiceno: string | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; suppliername: string | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; invoiceamt: number | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; invoicedate: string | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; isfinanced: string; customername: string | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;}) =>
          <tr>
          <td>{item.invoiceno}</td>
          <td>{item.suppliername}</td>
          <td className="align-center">{item.customername}</td>
          <td className="align-right">{item.invoiceamt}</td>
          <td className="align-center th-col-date">{item.invoicedate}</td>
          <td className="align-center">{item.isfinanced =="Y" ? (<img className="finance-img" src={financed} alt="Icon"></img>): <Button variant="primary" className="action-button" onClick={this.handleShow.bind(this)}> update</Button>}</td>				
         </tr>
        ))}
				</tbody>
			</table>
		</div>
    ) : "No record found"}
	</section>
</main>
<footer className="footer-section">
	<div className="footer-content">Copyright ©2021. All Rights Reserved.</div>
</footer>

      <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Finance Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>

       {this.state.showSuccess ? (
         <span >Save successful !</span>
       ) : null}
        <Form.Group >
          <div className="row popup-container">
              <div className="col-lg-6 pop-view-block">
                <label className="view-lable">Document Number</label>
                <span className="view-value">{ this.state.invoiceno }</span>
              </div>
              <div className="col-lg-6 pop-view-block">
                <label className="view-lable">Supplier Name</label>
                <span className="view-value">{ this.state.suppliername }</span>
              </div>
              <div className="col-lg-6 pop-view-block">
                <label className="view-lable">Customer Name:</label>
                <span className="view-value">{ this.state.customername }</span>
              </div>
              <div className="col-lg-6 pop-view-block">
                <label className="view-lable">Document Amount:</label>
                <span className="view-value">{ this.state.invoiceamt }</span>
              </div>
          </div>
          
              {/* <Form.Label>Document number: </Form.Label>
              <Form.Control type="text" id="invoiceno" name="invoiceno"  value={ this.state.invoiceno }
              placeholder="Input Document number"/>        

              <Form.Label>Supplier name: </Form.Label>
              <Form.Control type="text" id="suppliername" name="suppliername" value={ this.state.suppliername }
              placeholder="Input Supplier name"/>     

              <Form.Label>Customer name: </Form.Label>
              <Form.Control type="text" id="customername" name="customername" value={ this.state.customername }
              placeholder="Input Customer name"/>   

              <Form.Label>Document amount: </Form.Label>
              <Form.Control type="text" id="invoiceamt" name="invoiceamt"  value={ this.state.invoiceamt }
              placeholder="Input Document amount"/>    */}
              
              <Form.Label>Is Financed </Form.Label>
              <Form.Check className="checkbox" label="Yes" id="yes" name="group1" type="checkbox" checked={this.state.isfinanced==="Y"} onChange={this.onIsFinanceYesChecked.bind(this)} ></Form.Check>
              <Form.Check className="checkbox" label="No" id = "no" name="group1" type="checkbox" checked={this.state.isfinanced==="N"} onChange={this.onIsFinanceNoChecked.bind(this)} ></Form.Check>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="action-button btn-grey" onClick={this.handleClose.bind(this)}>
            Close
          </Button>
          <Button variant="primary" className="action-button" onClick={this.handleUpdateDoc.bind(this)}>
            Update Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>

    );
};

}
