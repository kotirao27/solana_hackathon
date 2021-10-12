import React, { useState } from "react";
import { sendRequestData } from "../helpers/wallet";
import "./Sender.css";
import document from '../images/documents.jpg';
import navimage from '../images/navimage.png';


interface SenderProps {
  didSaveInvoice: () => void;
}


const Sender: React.FC<SenderProps> = ({ didSaveInvoice }) => {

  const [invoicedate, setInvoiceDate] = useState(new Date());
  const [invoiceno, setInvoiceNo] = useState("");
  const [suppliername, setSupplierName] = useState("");
  const [customername, setCustomerName] = useState("");
  const [invoiceamt, setInvoiceAmt] = useState(0);

  const onChangeInvoiceNo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoiceNo(e.target.value ? e.target.value.toString() : "");
  };

  const onChangeSupplierName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupplierName(e.target.value ? e.target.value.toString() : "");
  };

  const  onChangeCustomerName= (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value ? e.target.value.toString() : "");
  };

  const  onChangeInvoiceDate= (date : Date) => {
    setInvoiceDate(new Date(date));
  };

  const  onChangeInvoiceAmt= (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoiceAmt(e.target.value ? Number(e.target.value) : 0);
  };

  const onClickSaveRecord = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

   let requestData = "{\"invoiceno\""+":"+"\""+invoiceno+"\",\"suppliername\""+":"+"\""+suppliername+"\",\"customername\""+":"+"\""+customername+"\",\"invoiceamt\""+":"+invoiceamt+",\"instruction\""+":"+"\"CREATE"+"\",\"invoicedate\""+":"+"\"10-OCT-2021"+"\",\"isfinanced\""+":"+"\"N"+"\"}";

   console.log(requestData);
  
  await sendRequestData(requestData);

  didSaveInvoice();

  };

  return (

    <div>


        <div id="mySidenav" className="sidenav">
        
            <img src={navimage} alt="Logo" className="navImage" />
        
            <a href="#" >ViewDocuments</a>
            <a href="#" >UploadDocuments</a>
        </div>


        <div id="main"  className=" main" >
        <div>
            <img src={document} alt="Logo" className="documentImage" />
        </div>
        <div></div>

        <form className="documentForm"> 
                <p className="form-text-left">Document Number </p>
                <div className="form-group text-left">                
                <input type="text" 
                       required
                       className="form-control text-left form-text-left" 
                       id="invoiceno" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter document number"
                       value={invoiceno} onChange={onChangeInvoiceNo}
                />
                </div>
                <div className="form-group text-left">
                    <p className="form-text-left">Supplier Name</p>
                    <input type="text" 
                        required
                        className="form-control text-left form-text-left" 
                        id="suppliername" 
                        placeholder="Enter supplier number"
                        value={suppliername} onChange={onChangeSupplierName}
                    />
                </div>
                <div className="form-group text-left">
                    <p className="form-text-left">Customer Name</p>
                    <input type="text" 
                        required
                        className="form-control text-left form-text-left" 
                        id="customername" 
                        placeholder="Enter supplier number"
                        value={customername} onChange={onChangeCustomerName}
                    />
                </div>
                <div className="form-group text-left">
                <p className="form-text-left">Document Currency</p>
                <input type="text" 
                        required
                       className="form-control form-text-left" 
                       id="invoiceccy" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter document currency"
                />
                </div>
                <div className="form-group text-left">
                    <p className="form-text-left">Document Amount</p>
                    <input type="text" 
                        required
                        className="form-control form-text-left" 
                        id="invoiceamt" 
                        placeholder="Enter document amount"
                        value={invoiceamt} onChange={onChangeInvoiceAmt}
                    />
                </div>
                
                <div>
                <button type="button" onClick={onClickSaveRecord} className="btn btn-primary form-text-left submit-button" >
                    Submit 
                </button>
                
                </div>
            </form>
            </div>
        </div>
    );
};

export default Sender;
