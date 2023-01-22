import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCusModal} from './AddCusModal';
import {EditCusModal} from './EditCusModal';
import {ListCusBoxModal} from './ListCusBoxModal';
import { MdEdit,MdDeleteForever,MdCreate,MdClose,MdList,MdPeople } from 'react-icons/md';

export class Customer extends Component{

    constructor(props){
        super(props);
        this.state={cosrep:[],cus:[],box:[],listModalShow:false,  addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'customers')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cus:data});
        });
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'cosRepresantatives')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cosrep:data});
        });
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
    AcsessName(element) {
        if (element==null){
            return null;
        }
       const result= this.state.cosrep.find(({ cosRepresantativeId }) => cosRepresantativeId === element);
    
       return result.firstName;
         
          }

  
    deleteCus(cusid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'customers/'+cusid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {cus, cusid,cusfirst,cuslast,country,cusphone,cusage,point,cosrepid}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        let listModalClose=()=>this.setState({listModalShow:false});
        return(
            <div >
                <h3 >
     <  MdPeople  size="40" color="black"/>&nbsp; &nbsp; Customers 
     </h3>
                
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Customer Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>phone</th>
                        <th>Country</th>
                        <th>age</th>
                         <th>Represantative</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {this.state.cus.map(c=>
                        <tr key={c.customerId}>
                            <td>{c.customerId}</td>
                            <td>{c.firstName}</td>
                            <td>{c.lastName}</td>
                            <td>{c.phone}</td>
                            <td>{c.country}</td>
                            <td>{c.age}</td>
                            <td>{this.AcsessName(c.cosRepresantativeId)}</td>
                            <td>

<ButtonToolbar>
 <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteCus(c.customerId)}>
  <MdDeleteForever size="30"/>
 </Button>
 <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        cusid:c.customerId,cusfirst:c.firstName,cuslast:c.lastName,cusphone:c.phone,cusage:c.age,
        point:c.point,cosrepid:c.cosRepresantativeId, country:c.country
  })}>
            <MdEdit size="30"/>
        </Button>

         <Button className="mr-2" variant="success"
    onClick={()=>this.setState({listModalShow:true,
        cusid:c.customerId
  })}>
       <MdList size="30"/>
        </Button>
        <EditCusModal show={this.state.editModalShow}
        onHide={editModalClose}
        cusid={cusid}
        cusfirst={cusfirst}
        cuslast={cuslast}
        cusphone={cusphone}
        cusage={cusage}
        point={point}
        country={country}
        cosrepid={cosrepid}
       
        ></EditCusModal>
  
        <ListCusBoxModal show={this.state.listModalShow}
        onHide={listModalClose}
        cusid={cusid}
        >
            </ListCusBoxModal>


</ButtonToolbar>
                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Customer<MdCreate  size="30"/> </Button>

                    <AddCusModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}