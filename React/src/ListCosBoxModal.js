import React,{Component} from 'react';
import {Table,Modal,ButtonToolbar, Row, FormModal,Button, Col, Form} from 'react-bootstrap';

export class ListCosBoxModal extends Component{
    constructor(props){
        super(props);
        this.state={ cosrep:[],cus:[]}
    }
    refreshList(){
        fetch(process.env.REACT_APP_API+'cosRepresantatives')
        .then(response=>response.json())
        .then(data=>{ this.setState({cosrep:data});
        });
    }
    componentDidMount(){
        fetch(process.env.REACT_APP_API+'customers')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cus:data});
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
        Customers' Name  of Worker {this.props.cosrepfirst}
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div >                       
                    
                  
<div >             
       
    {this.state.cus.map(employee => {
     return employee.cosRepresantativeId === this.props.cosrepid ? <p>{employee.firstName} </p> : ""
    })}
    </div>
               
            </div>
    </Modal.Body>
    

</Modal>

</div>
        )
    }

}
