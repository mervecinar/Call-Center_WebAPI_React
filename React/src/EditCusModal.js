import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditCusModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event ){
        event.preventDefault();
        fetch('https://localhost:7186/api/Customers/'+this.props.cusid ,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                customerId:event.target.customerId.value,
                FirstName:event.target.FirstName.value,
                LastName:event.target.FirstName.value,
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
            alert("ID="+event.target.DepartmentId.value+"   is not updated please try again ");}
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
            Edit Customer
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="customerId">
                        <Form.Label>customerId</Form.Label>
                        <Form.Control type="text" name="customerId" required
                        disabled
                        defaultValue={this.props.cusid} 
                        placeholder="CustomerId"/>
                    </Form.Group>

                    <Form.Group controlId="FirstName">
                        <Form.Label>FirstName</Form.Label>
                        <Form.Control type="text" name="FirstName" required 
                        defaultValue={this.props.cusfirst}
                        placeholder="FirstName"/>
                    </Form.Group>
                    <Form.Group controlId="LastName">
                        <Form.Label>LastName</Form.Label>
                        <Form.Control type="text" name="LastName" required
                   
                        defaultValue={this.props.cuslast} 
                        placeholder="LastName"/>
                    </Form.Group>

                    <Form.Group controlId="country">
                        <Form.Label>country</Form.Label>
                        <Form.Control type="text" name="country" required 
                        defaultValue={this.props.country}
                        placeholder="country"/>
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>phone</Form.Label>
                    
                        <Form.Control type="text" name="phone" required 
                            disabled
                        defaultValue={this.props.cusphone}
                        placeholder="phone"/>
                    </Form.Group>
                    <Form.Group controlId="age">
                        <Form.Label>age</Form.Label>
                        <Form.Control type="text" name="age" required
            
                        defaultValue={this.props.cusage} 
                        placeholder="age"/>
                    </Form.Group>

                    <Form.Group controlId="point">
                        <Form.Label>point</Form.Label>
                        <Form.Control type="text" name="point" required 
                          disabled
                        defaultValue={this.props.point}
                        placeholder="point"/>
                    </Form.Group>
                    <Form.Group controlId="CosRepresantativeId">
                        <Form.Label>CosRepresantativeId</Form.Label>
                        <Form.Control type="text" name="CosRepresantativeId" required 
    
                        defaultValue={this.props.cosrepid}
                        placeholder="CosRepresantativeId"/>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Customer
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}