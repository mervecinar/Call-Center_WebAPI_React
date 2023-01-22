import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import { MdDeleteForever,MdCreate,MdClose } from 'react-icons/md';

export class AddCosRepModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        
    }
    componentDidMount(){
        fetch('https://localhost:7186/api/Departments')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
     
        fetch('https://localhost:7186/api/CosRepresantatives',{
            
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                
                CosRepresantativeId:event.target.CosRepresantativeId.value,
                FirstName:event.target.FirstName.value,
                LastName:event.target.LastName.value,
                Country:event.target.Country.value,
                DepartmentId:event.target.DepartmentId.value,          
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
        const {depid}=this.state;
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
            Add CosRepresantative
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                
                    <Form.Group controlId="CosRepresantativeId">
                        <Form.Label>CosRepresantativeId</Form.Label>
                        <Form.Control type="number" name="CosRepresantativeId" required 
                        placeholder="CosRepresantativeId"/>
                    </Form.Group>

                    <Form.Group controlId="FirstName">
                        <Form.Label>FirstName</Form.Label>
                        <Form.Control type="text" name="FirstName" required 
                        placeholder="FirstName"/>
                    </Form.Group>

                    <Form.Group controlId="LastName">
                        <Form.Label>LastName</Form.Label>
                        <Form.Control type="text" name="LastName" required 
                        placeholder="LastName"/>
                    </Form.Group>
                    <Form.Group controlId="Country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" name="Country" required 
                        placeholder="Country"/>
                    </Form.Group>
                
                    <Form.Group controlId="DepartmentId">
                        <Form.Label>DepartmentId</Form.Label>
                        <Form.Control as="select">
                        {this.state.deps.map(dep=>                       
                         <option key={dep.departmentId} value={dep.departmentId}>{dep.departmentName} </option>
                         )}
                            </Form.Control>  
                            
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">
                        Add CosRepresantative <MdCreate/>
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close<MdClose/></Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}