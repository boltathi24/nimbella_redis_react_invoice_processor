import React, { Component } from 'react';
import {Table, Button, Input} from  'reactstrap';
import 'bootstrap/dist/css/bootstrap.css'
import  './App.css';
import axios from 'axios';


import generatePDF from './component/reportGenerator';
import NewInvoice from './component/addNewInvoice';
class App extends Component {

    componentDidMount() {
        document.title = 'Bolt Invoice Processor';
      }
    constructor(props){
        super(props);
    this.state = { 
        isLoading :false,
        invoices :  [
           
        ],
        pending:[],
        approved:[],
        rejected:[],
        activeTab:"",
        approveBtn:"",
        PendingTab:"btn clr tabs",
        ApprovedTab:"btn  clr ",
        RejectedTab:"btn clr  ",
        activeList:"Home",
        visibleAddNew:"none",
        visibleHome:"block",
        exportInvoice:"none",
        homeTab:"",
        NewInvoiceTab:"",
        exportTab:"",
        user:"user"


     }
    }
     handleCallback = (invoice) =>{
        this.setState({...this.state.pending.push(invoice)});
    }


  
    export()
    {
        
        generatePDF(this.state.activeTab);

    }
  

    
    doActionInvoice(invoice,actionType)
    {
        invoice.status=actionType;
        let updateedInvoices = [...this.state.invoices].filter (i => i.id !== invoice.id)
        if(actionType==="Rejected")
        {
            this.setState({...this.state.rejected.push(invoice)});
        }
       else if(actionType==="Approved")
        {
            this.setState({...this.state.approved.push(invoice)});
        }
        
        this.setState({invoices : updateedInvoices});
        this.setState({pending : updateedInvoices});
    }

    setComment(invoice,value)
    {
        invoice.comments=value;
        this.setState({invoices : this.state.invoices});
        
    }
    setInvoiceState(invoiceType,invoiceName)
    {
        this.setState({activeTab : invoiceName});
        if(invoiceName==="Rejected" )
        {
            console.log("rejected Tab"+this.state.RejectedTab)
            this.setState({RejectedTab : this.state.RejectedTab+" tabs"});
            this.setState({PendingTab : this.state.PendingTab.replace(' tabs','')});
            this.setState({ApprovedTab : this.state.ApprovedTab.replace(' tabs','')});
            console.log("rejected Tab"+this.state.RejectedTab)
            this.setState({approveBtn : "none"});
        }
        else if(invoiceName==="Approved")
        {
            this.setState({ApprovedTab : this.state.ApprovedTab+" tabs"});
            this.setState({PendingTab : this.state.PendingTab.replace(' tabs','')});
            this.setState({RejectedTab : this.state.RejectedTab.replace(' tabs','')});
            this.setState({approveBtn : "none"});
        }else
        {
            this.setState({PendingTab : this.state.PendingTab+" tabs"});
            this.setState({ApprovedTab : this.state.ApprovedTab.replace(' tabs','')});
            this.setState({RejectedTab : this.state.RejectedTab.replace(' tabs','')});
            this.setState({approveBtn : "block"});
          
        }
        this.setState({invoices : invoiceType});
    }
    async componentDidMount() {       
        const {data:responseData} = await axios.get("https://"+window.location.hostname+"/api/invoice/getdata?user="+this.state.user)           
        responseData.data.forEach(element => {
            this.state.invoices.push(JSON.parse(element))               
           });
        this.setState({ pending: this.state.invoices, isLoading: false });
    }
    changeTab(tabName)
    {
        if(tabName==="Add New")
        {
        this.setState({visibleAddNew : "block"}); 
        this.setState({visibleHome : "none"}); 
        this.setState({exportInvoice : "none"}); 
        this.setState({NewInvoiceTab : this.state.NewInvoiceTab+" active"});
        this.setState({homeTab : this.state.homeTab.replace(' active','')});
        this.setState({exportTab : this.state.exportTab.replace(' active','')});
        }
        else if(tabName==="Export"){
              this.setState({visibleAddNew : "none"}); 
        
            this.setState({visibleHome : "block"}); 
            this.setState({exportInvoice : "block"}); 
            this.setState({exportTab : this.state.exportTab+" active"});
            this.setState({homeTab : this.state.homeTab.replace(' active','')});
            this.setState({NewInvoiceTab : this.state.NewInvoiceTab.replace(' active','')});
        }
        else
        {
            this.setState({visibleAddNew : "none"}); 
            this.setState({visibleHome : "block"});
            this.setState({exportInvoice : "none"}); 
            this.setState({homeTab : this.state.homeTab+" active"});
            this.setState({NewInvoiceTab : this.state.NewInvoiceTab.replace(' active','')});
            this.setState({exportTab : this.state.exportTab.replace(' active','')});
        }
        
    }
      

    render() { 

        const isLoading = this.state.isLoading;
        const allinvoices = this.state.invoices;
       
        if (isLoading)
            return(<div>Loading...</div>);


        let invoices = 
        allinvoices.map( invoice => 
            <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.vendor}</td>
                <td className="dollar">{invoice.amount}</td>
                <td>{invoice.desc}</td>
                <td>{invoice.date}</td>
                <td>{invoice.status}</td>
                <td><Input style={{color:"#D2691E"}}className="btn btn-lg " placeholder="Comments..." onInput={e => this.setComment(invoice,e.target.value)} value={invoice.comments}> Comments </Input></td>
                <td><div style={{display:this.state.approveBtn}}> <Button className="btn btn-lg btn-success" onClick={ () => this.doActionInvoice(invoice,"Approved")} > Approve </Button></div></td>
                <td><div style={{display:this.state.approveBtn}}><Button className="btn btn-lg btn-danger" onClick={ () => this.doActionInvoice(invoice,"Rejected")} >  Reject </Button></div></td>
               
               
            </tr>
        )

        return (
            
         <div >
             <style>{'body { background-color: #454d55 }'}</style>
            
             <div  className="container-fluid .bg-secondary">
    <div className="row" >
        <div className="col-lg-2">
        <li class="nav navFiller ">
                <a onClick={ () => this.changeTab("Add New")} class="nav-link" href="#">Profile </a>
            </li>
        <div className="row">
            <img className=" thumbnail col-sm-10 " src="/profile3.png" alt="profileImage"></img>
        </div>
        <div  className={this.state.homeTab}>
        <li class="nav navFiller">
                <a onClick={ () => this.changeTab("Home")} class="nav-link" href="#">Home</a>
            </li>
            </div>
            <div className={this.state.NewInvoiceTab}>
            <li class="nav navFiller ">
                <a onClick={ () => this.changeTab("Add New")} class="nav-link" href="#">Add New Invoice </a>
            </li>
            </div>
            <div className={this.state.exportTab}>
            <li class="nav navFiller ">
                <a class="nav-link" onClick={ () => this.changeTab("Export")} href="#">Export Invoices</a>
            </li>
            </div>
        </div>
        <div className="col-lg-10">
          
        <div className="row">
                        <div className="col-lg-12">
                            <h4 className="jumbotron header"> Invoice Processing -  Bolt Corp</h4>
                        </div>
                </div>
                <div style={{display:this.state.visibleHome}}>
                <div className="row">
                        <div className="col-lg-12 center text-center">
                        <div style={{display:this.state.exportInvoice}}>
                <div className="text-center">
                    <Button className="btn btn-dark btn-lg btn-primary " onClick={ () => this.export()} >Export</Button>
                    <br></br>
                </div>
                </div>
                        <Table id="header" dark responsive   hover>
                                <thead>
                                    <tr>
                                    <th id="pendingTab" colSpan="3" ><Button onClick={ () => this.setInvoiceState(this.state.pending,"Pending")}  className={this.state.PendingTab} >Pending Invoices</Button></th>
                                    <th id="approveTab" colSpan="3" ><Button onClick={ () => this.setInvoiceState(this.state.approved,"Approved")} className={this.state.ApprovedTab}>Approved Invoices</Button></th>
                                    <th id="rejectedTab" colSpan="3" ><Button onClick={ () => this.setInvoiceState(this.state.rejected,"Rejected")} className={this.state.RejectedTab}>Rejected Invoices</Button></th>
                                    </tr>
                                    </thead>
                                    </Table>
                            <Table id="invoices" dark responsive striped bordered hover>
                                <thead>
                                  
                                    <tr>
                                        <th >Invoice #</th>
                                        <th>Vendor</th>
                                        <th>Amount</th>
                                        <th>Desc</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th colSpan="1">Comments</th>
                                        <th style={{display:this.state.approveBtn}} colSpan="2">Actions</th>
                                        
                                    </tr>
                                </thead>
                            
                            <tbody>
                                {this.state.invoices.length === 0 ? <td colSpan="9">All caught up!</td> : invoices}
                            </tbody>
                            </Table>

                        </div>

                </div>
              
                </div>
                <div style={{display:this.state.visibleAddNew}}>
<NewInvoice parentCallback = {this.handleCallback}/>
</div>
        </div>
        
    </div>
</div>
<div class="footer">
  <p> Bolt Corp is a fantasy company . Copyright © 2021 Bolt Inc. All rights reserved..</p>
</div>
            </div>
            
        );
        
    }
    
  
}
 
export default App;