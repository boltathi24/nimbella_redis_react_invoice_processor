import React from 'react';
import  '../App.css';
class NewInvoice extends React.Component {
    onTrigger = (event) => {
        let invoice=new Object(); 
        invoice.id="Inv-"+new Date().getUTCMilliseconds();
        invoice.vendor=this.state.vendor;
        invoice.amount=this.state.amount; 
        invoice.desc=this.state.desc; 
        invoice.status="pending";
        invoice.date=new Date().toISOString().slice(0, 10); 
        this.props.parentCallback(invoice);
        event.preventDefault();
        this.setState({submitted : true});
    }
    state={
amount:"",
desc:"",
vendor:"",
submitted:false
    }

    
    clearValue()
    {
        this.setState({vendor : ""});
        this.setState({desc : ""});
        this.setState({amount : ""});
    }
    setContent=(event)=>
    {
        this.setState({submitted : false});
        const id = event.target.id;
        
        if(id==="vendor")
        {
            this.setState({vendor : event.target.value}); 
        }
        if(id==="amount")
        {
            this.setState({amount : event.target.value}); 
        }
        if(id==="desc")
        {
            this.setState({desc : event.target.value}); 
        }
    }

    render(){
        let success
        if (this.state.submitted) {
    
            success = <label className="center labelcls gree">Invoice has been submitted successfully</label>
    
        } 
        return(
        <div>
             {/* <div className="container row align-items-center p-3 my-7 bg-dark text-white"> */}
            <form onSubmit = {this.onTrigger}>
          
           
            <label className="labelcls" >Vendor</label>
            <input id="vendor" className="form-control" onInput={this.setContent} required value={this.state.vendor}  placeholder="vendor name" /> 
            
            <label className="labelcls" >Amount (in $)</label>
            <input id="amount" className="form-control " onInput={this.setContent}  required value={this.state.amount}  placeholder="Amount of invoice" /> 

            <label className="labelcls" >Desc</label>
            <input id="desc" className="form-control" onInput={ this.setContent} required value={this.state.desc}  placeholder="Desc about invoice" />        
            
            
            <br></br>
            <div className="text-center">
                <input className="btn btn-dark btn-lg btn-primary" type = "submit" value = "Submit"/>
                </div>
            </form>

            {success}
            
         </div>
        ) 
       
    }
}

  export default  NewInvoice