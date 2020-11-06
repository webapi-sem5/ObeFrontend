import React from 'react';
import SideBar from './Components/SideBar/SideBar';
import Header from './Components/Header/Header';
import "./App.css"
import { BrowserRouter, Switch,Route} from 'react-router-dom';
import Login from './Components/Login/Login'
import Module from './Components/Navigation/Module/Module'
import Analysis from './Components/Navigation/Analysis/Analysis'
import Assesments from './Components/Navigation/Assesments/Assesments'
import CaMarks from './Components/Navigation/CaMarks/CaMarks'
import LoList from './Components/Navigation/LoList/LoList'
import Normalize from './Components/Navigation/Normalize/Normalize'
import PoList from './Components/Navigation/PoList/PoList'


function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <div className="app__home">
        <Header/>
         <SideBar />

        </div>
       
         
      
         <div className="app__component">
         <Switch>
            <Route path="/module" component={Module} />
            <Route path="/analysis" component={Analysis} />
            <Route path="/assesments" component={Assesments} />
            <Route path="/camarks" component={CaMarks} />
            <Route path="/lolist" component={LoList} />
            <Route path="/poslist"  component={PoList} />
            <Route path="/normalize" component={Normalize} />
         
       </Switch>

         </div>
         
      

       
    </div>
    </BrowserRouter> 
        
        
  );
}

export default App;

