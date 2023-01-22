import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddBoxModal} from './AddBoxModal';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MdDeleteForever,MdCreate } from 'react-icons/md';
import { FcFeedback } from 'react-icons/fc';


export class Box extends Component{
    constructor(props){
        super(props);
        this.state={boxs:[], cus:[],cosrep:[],addModalShow:false, editModalShow:false}
    }
    refreshList(){
        fetch(process.env.REACT_APP_API+'requestComplaints')
        .then(response=>response.json())
        .then(data=>{
            this.setState({boxs:data});
        });
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'customers')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cus:data});
        });
        fetch(process.env.REACT_APP_API+'cosRepresantatives')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cosrep:data});
        });

        //{<LocationOnIcon/>}
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
    deletebox(boxid){
        if(window.confirm('Are you sure?')){ 
            fetch(process.env.REACT_APP_API+'requestComplaints/'+boxid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
            alert("SUCCESS");
        }else{
        alert("Something Wrong!");
        }
    }
    AcsessName(element) {
        if (element==null){
            return null;
        }
       const result= this.state.cus.find(({ customerId }) => customerId === element);
       /*
         <td>{(this.AcsessName(box.customerId).firstName)}</td>
                      
                          <td>{this.AcsessName2(this.AcsessName(box.customerId).cosRepresantativeId).firstName}</td>
       */
       return result.firstName;
         
          }
          AcsessName2(element) {
         
           const result2= this.state.cosrep.find(({ cosRepresantativeId }) => cosRepresantativeId === element);
           return result2;
             
              }
    render(){
        //this.AcsessName(box.customerId
        const {boxs, boxid,boxtype,boxtext,cusname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <h3 >
     <  FcFeedback  size="40" color="black"/>&nbsp; &nbsp; Requests Or RequestComplaints 
     </h3>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>

                        <th>ID </th>
                        <th>Type</th>
                        <th>Text</th>
                        <th>Customer Name</th>
                     
                           <th>Delete</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        
                    {this.state.boxs.map(box=>
                        <tr key={box.requestComplaintId}>
                            <td>{box.requestComplaintId}</td>
                            <td>{box.type}</td>
                            <td>{box.text}</td>
                            <td>{(box.customerId)}</td>
                          
                         
                            <td>            
<ButtonToolbar>
 <Button className="mr-2" variant="danger"
    onClick={()=>this.deletebox(box.requestComplaintId)}>
 <MdDeleteForever size="23"  />
  
 </Button>
</ButtonToolbar>
                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary' 
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add requestorcomplaint <MdCreate  size="30"/></Button>

                    <AddBoxModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}