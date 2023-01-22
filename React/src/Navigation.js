import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/Home">
                Home
                </NavLink>
           
    
                <NavLink className="d-inline p-2 bg-dark text-white" to="/department">
                Department
                </NavLink>
           
                <NavLink className="d-inline p-2 bg-dark text-white" to="/cosRepresantative">
                &nbsp; &nbsp; Costumer Represantative
                </NavLink>
                    
                <NavLink className="d-inline p-2 bg-dark text-white" to="/customer">
                &nbsp; &nbsp;Customer
                </NavLink>

                <NavLink className="d-inline p-2 bg-dark text-white" to="/box">
                &nbsp; &nbsp;Request Or Complaint
                </NavLink>
                
                <NavLink className="d-inline p-2 bg-dark text-white" to="/Score">
                &nbsp; &nbsp;Score of Represantatives
                </NavLink>

                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}