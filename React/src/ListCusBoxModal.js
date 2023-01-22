import React,{Component} from 'react';
import {Table,Modal,ButtonToolbar, Row, FormModal,Button, Col, Form} from 'react-bootstrap';


export class ListCusBoxModal extends Component{
    constructor(props){
        super(props);
        this.state={boxs:[], cus:[]}
    }
    refreshList(){
        fetch(process.env.REACT_APP_API+'customers')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cus:data});
        });
    }
    componentDidMount(){
        fetch(process.env.REACT_APP_API+'requestComplaints')
        .then(response=>response.json())
        .then(data=>{
            this.setState({boxs:data});
        });
        this.refreshList();
    }
    componentDidUpdate(){
        this.refreshList();
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render(){
        
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            List of RequestOrComplaint 
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <div >                       
                    
                  
<div>             
       
    {this.state.boxs.map(employee => {
     return employee.customerId === this.props.cusid ? <p >{employee.text} </p> : ""
    })}
    </div>

               
            </div>
    </Modal.Body>
    

</Modal>

</div>
        )
    }

}
