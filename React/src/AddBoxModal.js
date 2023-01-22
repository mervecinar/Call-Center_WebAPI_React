import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import { MdDeleteForever,MdCreate,MdClose } from 'react-icons/md';

export class AddBoxModal extends Component{
    constructor(props){
        super(props);
        this.state={cus:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount(){
        fetch('https://localhost:7186/api/Customers')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cus:data});
        });
    }
    AcsessName(element) {
  
       const result= this.state.cus.find(({ customerId }) => customerId === element);
       console.log("asdfghj"+result.cosRepresantativeId);
         return result;
          }
          

    handleSubmit(event){
        event.preventDefault();
        //this.AcsessName(event.target.CustomerId.value);
       // console.log("ASDFGHJ");

       
       
        //console.log(event.target.DepartmentName.value);
        fetch('https://localhost:7186/api/RequestComplaints',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                RequestComplaintId:event.target.RequestComplaintId.value,
                Type:event.target.Type.value,
                Text:event.target.Text.value,
                CustomerId:event.target.CustomerId.value,
            
            })
        })
        .then(response => {
            let statusCode = response.status,
                success = response.ok;
                if(success){
                    
                    alert("Success");}
                    else{
                        alert("ID="+event.target.DepartmentId.value+"   already exist id should be unique");}
        })
        .catch(error => {
            console.log(error);
            alert("hata");
            throw error;
        });
        

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
            Add Box
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                
                    <Form.Group controlId="RequestComplaintId">
                        <Form.Label>RequestComplaintId</Form.Label>
                        <Form.Control type="number" name="RequestComplaintId" required 
                        placeholder="RequestComplaintId"/>
                    </Form.Group>

                    <Form.Group controlId="Type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" name="Type" required 
                        placeholder="Type"/>
                    </Form.Group>

                    <Form.Group controlId="Text">
                        <Form.Label>Text</Form.Label>
                        <Form.Control type="text" name="Text" required 
                        placeholder="Text"/>
                    </Form.Group>
                    <Form.Group controlId="CustomerId">
                        <Form.Label>CustomerId</Form.Label>
                        <Form.Control as="select">
                        {this.state.cus.map(dep=>                       
                         <option key={dep.customerId} value={dep.customerId}>{dep.firstName} </option>
                         )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">
                        Add Box <MdCreate/>
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close <MdClose/></Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}