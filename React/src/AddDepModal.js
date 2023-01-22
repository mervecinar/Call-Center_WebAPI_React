import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import { MdDeleteForever,MdCreate,MdClose } from 'react-icons/md';
export class AddDepModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
     
        fetch('https://localhost:7186/api/Departments',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartmentId:event.target.DepartmentId.value,
                DepartmentName:event.target.DepartmentName.value,
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
            Add Department
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                
                    <Form.Group controlId="DepartmentId">
                        <Form.Label>DepartmentId</Form.Label>
                        <Form.Control type="number" name="DepartmentId" required 
                        placeholder="DepartmentId"/>
                    </Form.Group>

                    <Form.Group controlId="DepartmentName">
                        <Form.Label>DepartmentName</Form.Label>
                        <Form.Control type="text" name="DepartmentName"  required
                        placeholder="DepartmentName"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Department <MdCreate/>
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