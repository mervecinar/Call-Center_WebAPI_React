import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import { MdDeleteForever,MdCreate,MdClose } from 'react-icons/md';
export class AddCusModal extends Component{
    constructor(props){
        super(props);
        this.state={cosrep:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        
       
    }
    componentDidMount(){
        fetch(process.env.REACT_APP_API+'cosRepresantatives')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cosrep:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
       
       
        //console.log(event.target.DepartmentName.value);
        fetch(process.env.REACT_APP_API+'customers',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CustomerId:event.target.CustomerId.value,
                FirstName:event.target.FirstName.value,
                LastName:event.target.LastName.value,
                country:event.target.country.value,
                phone:event.target.phone.value,
                age:event.target.age.value,
                point:event.target.point.value,
                CosRepresantativeId:event.target.CosRepresantativeId.value,
            
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
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Customer
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                
                    <Form.Group controlId="CustomerId">
                        <Form.Label>CosRepresantativeId</Form.Label>
                        <Form.Control type="number" name="CustomerId" required 
                        placeholder="CustomerId"/>
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
                    <Form.Group controlId="country">
                        <Form.Label>country</Form.Label>
                        <Form.Control type="text" name="country" required 
                        placeholder="country"/>
                    </Form.Group>
                    
                    <Form.Group controlId="phone">
                        <Form.Label>phone</Form.Label>
                        <Form.Control type="number" name="phone" required 
                        placeholder="phone"/>
                    </Form.Group>
                    <Form.Group controlId="age">
                        <Form.Label>age</Form.Label>
                        <Form.Control type="number" name="age" required 
                        placeholder="age"/>
                    </Form.Group>
                    <Form.Group controlId="point">
                        <Form.Label>point</Form.Label>
                        <Form.Control type="number" name="point" required 
                        placeholder="point"/>
                    </Form.Group>
                    <Form.Group controlId="CosRepresantativeId">
                        <Form.Label>CosRepresantativeId</Form.Label>
                        <Form.Control as="select">
                        {this.state.cosrep.map(dep=>
                              
                         <option key={dep.cosRepresantativeId} value={dep.cosRepresantativeId}>{dep.firstName} </option>
                                         
                         )}

                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">
                        Add Customer <MdCreate/>
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