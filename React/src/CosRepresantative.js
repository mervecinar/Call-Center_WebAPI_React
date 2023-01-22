import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import { MdEdit,MdDeleteForever,MdCreate,MdClose,MdList } from 'react-icons/md';
import { FcCustomerSupport} from 'react-icons/fc';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCosRepModal} from './AddCosRepModal';
import {EditCosRepModal} from './EditCosRepModal';
import {ListCosBoxModal} from './ListCosBoxModal';

export class CosRepresantative extends Component{

    constructor(props){
        super(props);
        this.state={cosrep:[],deps:[], listModalShow:false,addModalShow:false, editModalShow:false}
        
       // this.handleSubmit=this.handleSubmit.bind(this);
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'cosRepresantatives')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cosrep:data});
        });
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'departments')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
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
    deleteCosRep(cosrepid){
        if(window.confirm('Are you sure?')){
     
      
            fetch(process.env.REACT_APP_API+'cosRepresantatives/'+cosrepid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    AcsessName(element) {
        if (element==null){
            return null;
        }
       const result= this.state.deps.find(({ departmentId }) => departmentId === element);
       return result.departmentName;
         
          }

    render(){
        const a=0;
        const {cosrep, cosrepid,cosrepfirst,cosreplast,cosrepcountry,depid}=this.state;
     
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        let listModalClose=()=>this.setState({listModalShow:false});
        return(
            <div >
                  <h3 >
     <  FcCustomerSupport  size="40" color="black"/>&nbsp; &nbsp; Customer Represantatives 
     </h3>
                
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Represantative Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Country </th>
                        <th>Department</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {this.state.cosrep.map(cosr=>

                        <tr key={cosr.cosRepresantativeId}>
                            <td>{cosr.cosRepresantativeId}</td>
                            <td>{cosr.firstName}</td>
                            <td>{cosr.lastName}</td>
                            <td>{cosr.country}</td>
                            <td>{this.AcsessName(cosr.departmentId)}</td>
                            <td>
                            

                               
<ButtonToolbar>


 <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteCosRep(cosr.cosRepresantativeId)}>
  <MdDeleteForever size ="30"/>
 </Button>
 <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        cosrepid:cosr.cosRepresantativeId,cosrepfirst:cosr.firstName,cosreplast:cosr.lastName,cosrepcountry:cosr.country,depid:cosr.departmentId,
  })}> 
         <MdEdit size ="30"/>
        </Button>
        <Button className="mr-2" variant="success" 
    onClick={()=>this.setState({listModalShow:true,
      cosrepid:cosr.cosRepresantativeId,
  })}>
        <MdList size ="30"/>
        </Button>
        <EditCosRepModal show={this.state.editModalShow}
        onHide={editModalClose}
        cosrepid={cosrepid}
        cosrepfirst={cosrepfirst}
        cosreplast={cosreplast}
        cosrepcountry={cosrepcountry}
        depid={depid}
        ></EditCosRepModal>

   
        <ListCosBoxModal show={this.state.listModalShow}
        onHide={listModalClose}
        cosrepid={cosrepid}>
            </ListCosBoxModal>

</ButtonToolbar>
</td>

                            </tr>)}
                          
                  </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add cosRepresantative <MdCreate size ="30"/></Button>

                    <AddCosRepModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}