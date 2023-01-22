import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCusModal} from './AddCusModal';
import {EditCusModal} from './EditCusModal';
import {ListCusBoxModal} from './ListCusBoxModal';
import groupBy from 'lodash/groupBy';
import { MdStar } from 'react-icons/md';

export class Score extends Component{

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
    AcsessName(element) {
        if (element==null){
            return null;
        }
       const result= this.state.cosrep.find(({ cosRepresantativeId }) => cosRepresantativeId === element);
    
       return result.firstName;
         
          }

    render(){
        const {cus, cusid,cusfirst,cuslast,cusphone,cusage,point,cosrepid}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        let listModalClose=()=>this.setState({listModalShow:false});
        let grouppedArray = groupBy(cus, 'cosRepresantativeId')
        return(
            <div >
       <h3 >
       &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;<  MdStar  size="80" color="#FFD700"/>&nbsp; &nbsp; Scores of Employees &nbsp; &nbsp;<  MdStar  size="80" color="#FFD700"/>
     </h3>

                


                    {Object.values(grouppedArray).map((values) => {
  var totalpoint = 0;
  var idcos = 0;
  var name = "";
  var count=0;

  for (let i = 0; i < values.length; i++) {
    totalpoint += values[i].point;
    idcos=values[i].cosRepresantativeId;
    count=values.length;

  }

  return (
    <div>
    <Table className="mt-4" striped bordered hover size="sm">
    
                    <thead>
                        <tr >
                        <th>Employee ID</th>
                        <th>NAME </th>
                        <th>SCOR</th>
                        <th>Count of Customer</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr key={idcos}>
                            <td> {idcos}</td>
                            <td>{this.AcsessName(idcos)}</td>
                             <td>{totalpoint}</td>
                             <td>{count}</td>
                    
                        
 </tr>
                    </tbody>

                </Table>
                   
</div>
    
  );
})}
                    
            </div>
        )
    }
}