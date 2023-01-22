import logo from './logo.svg';
import './App.css';
import { FiPhoneCall } from 'react-icons/fi';
import Home from'./Home';
import {Department} from './Department';
import {Customer} from './Customer';
import {CosRepresantative} from './CosRepresantative';
import {Box} from './Box';
import {Score} from './Score';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  
  return (

    <BrowserRouter>
    
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
     <  FiPhoneCall  size="40" color="black"/>&nbsp; &nbsp; &nbsp; CALL-CENTER 
     </h3>
     <Navigation/>
     <Switch>
      <Route path='/Home' component={Home} exact/>
       <Route path='/department' component={Department} />
       <Route path='/CosRepresantative' component={CosRepresantative}/>
       <Route path='/Customer' component={Customer}/>
       <Route path='/Box' component={Box}/>
       <Route path='/Score' component={Score}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
