import React,{Component} from 'react';
import {Table,Modal,ButtonToolbar, Row, FormModal,Button, Col, Form} from 'react-bootstrap';


export class ListDepModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[], cosrep:[]}
    }
    refreshList(){
        fetch('https://localhost:7186/api/Departments')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }
    componentDidMount(){
        fetch(process.env.REACT_APP_API+'cosRepresantatives')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cosrep:data});
        });
        this.refreshList();
    }
    componentDidUpdate(){
        this.refreshList();
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
             Represantatives of Department {this.props.depname}
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <div >                       
                    
                  
<div>             
       
    {this.state.cosrep.map(employee => {
     return employee.departmentId === this.props.depid ? <p >{employee.firstName+" "+ employee.lastName} </p> : ""
    })}
    </div>

               
            </div>
    </Modal.Body>
    

</Modal>

</div>
        )
    }

}
