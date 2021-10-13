import React from "react";
import "./DashBoard.css";
import "./bootstrap.css"
import { RouteComponentProps } from "react-router-dom"
import logout from '../images/icon_logout.png';
import { queryData, InvoiceDataList, InvoiceData } from "../helpers/wallet";
import { render } from "react-dom";
import{Modal, Button, Form} from 'react-bootstrap';
import Alert from 'react-popup-alert'


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
    alertshow:boolean,
    showtable:boolean
};

export default class Query extends React.Component<Props, State> {
    

    constructor(props: Props) {
      super(props);
      
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
          alertshow:false,
          showtable:false
        }; 
      }

      setInvoiceNo(e: any){
       this.setState({invoiceno: e.target.value});
      }

      setSupplierName(e: any){
        this.setState({suppliername: e.target.value});
      }

    handleQuery(){

    queryData(this.state.invoiceno, this.state.suppliername).then(value => {
      console.log('resolved', value);
      this.setState({showtable:true});
      this.setState({invoicedata: value.data});

    }).catch(error => {
      console.log('rejected', error);
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
<div className="button-section">
	<div className="left-sec">
    <form method="post" action="" autoComplete="off" >     
     <input type="text"  name="searchinvoiceno" ></input>
     <input type="text"  name="searchsuppliername" ></input>		
      <input type="button" className="action-button" onClick={this.handleQuery}> Search</input>
	 </form>
     </div>		
</div>        

<main role="main" className="main-body-container">
	<section className="container dashboard-container">
		{this.state.showtable ? (
		<div className="table-conatiner">
			<table className="table custom-table">
				<thead>
					<tr>
						<th scope="col">Document Number</th>
						<th scope="col">Supplier Name</th>
						<th scope="col" className="align-center">Currency</th>
						<th scope="col" className="align-right">Amount</th>
						<th scope="col" className="align-center th-col-date">Date</th>
						<th scope="col" className="align-center">Is Financed</th>
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
          <td className="align-center">{item.isfinanced}</td>						
         </tr>
        ))}

				</tbody>
			</table>
		</div>) : null}
	</section>
</main>
<footer className="footer-section">
	<div className="footer-content">Copyright ©2021. All Rights Reserved.</div>
</footer>
</div>

    );
};

}