import React from 'react';
import SideBar from './Components/SideBar/SideBar';
import Header from './Components/Header/Header';
import "./App.css"
import { BrowserRouter, Switch,Route, Redirect} from 'react-router-dom';
import Login from './Components/Login/Login'
import Signup from './Components/Login/Signup'
import Analysis from './Components/Navigation/Analysis/Analysis'
import Assesment from './Components/Navigation/Assesments/Assesment'
import LoList from './Components/Navigation/LoList/LoList'
import Normalize from './Components/Navigation/Normalize/Normalize'
import PoList from './Components/Navigation/PoList/PoList'
import DefineLo from './Components/Define/DefineLo/DefineLo'
import AssignedPo from './Components/Define/DefineLo/AssignedPo'
import AssignedLo from './Components/Define/AssignedLo/AssignedLo'
import DefinePo from './Components/Define/DefinePo/DefinePo'
import EditPo from './Components/Define/EditPo/EditPo'
import EditLo from './Components/Define/EditLo/EditLo'
import AssignedAssessment from './Components/Define/AssignedAssessment/AssignedAssessment'
import DefineModule from './Components/Navigation/Module/DefineModule/pages/Modules'
import EditModule from './Components/Navigation/Module/EditModule/pages/Modules'
import Module from './Components/Navigation/Module/Module'
import DefineAssessment from './Components/Navigation/Assesments/DefineAssessment/pages/Assessments'
import AssignThreshold from './Components/Define/AssignThreshold/AssignThreshold';

import Student from './Components/Navigation/Students/Students'


import StudentMarks from './Components/Define/StudentMarks/StudentMarks'
import LoginForm from './Components/Login/LoginForm';


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
            <Route path="/Login" exact component={LoginForm} >

            <Redirect to='/module' />
            </Route>
            {/* <Route path="/Signup" exact component={Signup} /> */}
            <Route path="/student" exact component={Student} />
            <Route path="/module/create" exact component={DefineModule} />
            <Route path="/module/definethreshold/:id" exact component={AssignThreshold} />
            <Route path="/module/defineassessment/:id" exact component={AssignedAssessment} />
            <Route path="/module/edit/:id"  component={EditModule} />
            <Route path="/module" exact component={Module} />
            <Route path="/analysis" exact component={Analysis} />
            <Route path="/assesment/definelo/:id" exact component={AssignedLo} />
            <Route path="/assesment" exact component={Assesment} />
            <Route path="/assesment/create" exact component={DefineAssessment} />
            <Route path="/marks" exact component={StudentMarks} />
            <Route path="/loslist/definepo/:id" exact  component={AssignedPo} />
            <Route path="/loslist/edit/:id"  component={EditLo} />
            <Route path="/loslist" exact  component={LoList} />
            <Route path="/poslist/edit/:id"  component={EditPo} />
            <Route path="/poslist" exact  component={PoList} />
            <Route path="/normalize" exact component={Normalize} />
            <Route path="/loslist/definelo" exact component={DefineLo} />
            <Route path="/poslist/definepo" exact component={DefinePo} />         

        </Switch>
         </div>
    </div>
    </BrowserRouter> 
        
        
  );
}


export default App;



