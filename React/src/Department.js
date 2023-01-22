import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import { MdEdit,MdDeleteForever,MdCreate,MdClose,MdList } from 'react-icons/md';
import { FcDepartment } from 'react-icons/fc';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';
import {ListDepModal} from './ListDepModal';

export class Department extends Component{
    constructor(props){
        super(props);
        this.state={deps:[], cosrep:[],addModalShow:false,listModalShow:false, editModalShow:false}
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
  
    deleteDep(depid){
        if(window.confirm('Are you sure?')){
      console.log(depid);
      
            fetch(process.env.REACT_APP_API+'departments/'+depid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {deps, depid,depname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        let listModalClose=()=>this.setState({listModalShow:false});
       
        return(
            <div >
                <h3 >
     <  FcDepartment  size="40" color="black"/>&nbsp; &nbsp; Departments 
     </h3>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Department ID</th>
                        <th>Department Name</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {this.state.deps.map(dep=>
                        <tr key={dep.departmentId}>
                            <td>{dep.departmentId}</td>
                            <td>{dep.departmentName}</td>
                            <td>





                        
 
<ButtonToolbar>

        <Button className="mr-2" variant="danger"
    
    onClick={()=>this.deleteDep(dep.departmentId)}>
         
 <MdDeleteForever size="30" />
 </Button>
 
 <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        depid:dep.departmentId,depname:dep.departmentName
  })}>
        <MdEdit size="30"/>
        </Button>
        <Button className="mr-2" variant="success"
    onClick={()=>this.setState({listModalShow:true,
        depid:dep.departmentId,depname:dep.departmentName
  })}>
       <MdList size="30"/>
        </Button>
        <EditDepModal show={this.state.editModalShow}
        onHide={editModalClose}
        depid={depid}
        depname={depname}
        ></EditDepModal>

 
        <ListDepModal show={this.state.listModalShow}
        onHide={listModalClose}
        depid={depid}
        depname={depname}>
            </ListDepModal>
</ButtonToolbar>
     </td>  
</tr>
                            
                            
   
                            )}
                            
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Department <MdCreate size="30"/></Button>

                    <AddDepModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}