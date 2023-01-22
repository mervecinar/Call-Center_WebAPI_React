import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditCosRepModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event ){
        event.preventDefault();
        fetch('https://localhost:7186/api/CosRepresantatives/'+this.props.cosrepid ,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                cosRepresantativeId:event.target.cosRepresantativeId.value,
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
            Edit CosRepresantative
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={8}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="cosRepresantativeId">
                        <Form.Label>cosRepresantativeId</Form.Label>
                        <Form.Control  type="text" name="cosRepresantativeId" required
                        disabled
                        defaultValue={this.props.cosrepid} 
                        placeholder="cosRepresantativeId"/>
                    </Form.Group>

                    <Form.Group controlId="FirstName">
                        <Form.Label>FirstName</Form.Label>
                        <Form.Control type="text" name="FirstName" required 
                        defaultValue={this.props.cosrepfirst}
                        placeholder="FirstName"/>
                    </Form.Group>
                    <Form.Group controlId="LastName">
                        <Form.Label>LastName</Form.Label>
                        <Form.Control type="text" name="LastName" required 
                        defaultValue={this.props.cosreplast}
                        placeholder="LastName"/>
                    </Form.Group>
                    <Form.Group controlId="Country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" name="Country" required 
                        defaultValue={this.props.cosrepcountry}
                        placeholder="Country"/>
                    </Form.Group>
                    <Form.Group controlId="DepartmentId">c
                        <Form.Label>DepartmentId</Form.Label>
                        <Form.Control type="text" name="depid" required 
                      
                        defaultValue={this.props.depid}
                        placeholder="DepartmentId"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update cosRepresantative
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