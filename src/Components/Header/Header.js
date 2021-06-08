import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import  Breadcrumbs  from '../../Utils/Breadcrumbs';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100px',
    paddingTop: '20px',
    paddingLeft: '250px',
   
    color: 'black'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));




const Header = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [username, setUsername] = useState();
  

  useEffect(() => {
    axios.get("https://obesystemtesting.azurewebsites.net/api/user/").then((res) => {
      console.log(res);
      console.log(res.data.username);
      setUsername(res.data.username);

      if(window.location.pathname === '/module' ){
        setActiveStep(1)
        
      }
      else if(window.location.pathname === '/assesment'){
        setActiveStep(2)
        
      }
      else if(window.location.pathname === '/loslist'){
        setActiveStep(3)
      }
      else if(window.location.pathname === '/poslist'){
        setActiveStep(4)
      }
      else if(window.location.pathname === '/student' || window.location.pathname === '/marks'){
        setActiveStep(5)
      }
      else if(window.location.pathname === '/normalize'){
        setActiveStep(6)
      }
      else if(window.location.pathname === '/analysis'){
        setActiveStep(7)
      }
     
    });
    
  }, [window.location.pathname, activeStep])

  const classes = useStyles();
  

  


  console.log("This is from module  props >>>>>>", window.location.pathname)

  

 

  return (
    <div className={classes.root} style={{height:'150px'}}>
       <div style={{ display: "flex" }}>
        <h3 style={{ textAlign: "center", flex: 1.2 }}></h3>
        <div style={{ flex: 0.2 }}>
          <div style={{display:"flex"}}>
          {username && <Button href="/" variant="outlined" color="default">
            {" "}
            {username}
          </Button>}
          
          {username &&<Button href="/login" onClick={() => localStorage.clear()} variant="contained" color="primary">
            {" "}
            Logout
          </Button>}
          {!username && <Button href="/login" variant="contained" color="primary">
            {" "}
            Login
          </Button>}
          
          {!username &&<Button href="/signup"  variant="contained" color="secondary">
            {" "}
            Signup
          </Button>}
         

          </div>
        </div>
      </div>
      <Stepper activeStep={activeStep}>
        
            <Step >
              <StepLabel >Modules</StepLabel>
            </Step>
            <Step >
              <StepLabel >Assessments</StepLabel>
            </Step>
            <Step >
              <StepLabel >Learning Outcomes</StepLabel>
            </Step>
            <Step >
              <StepLabel >Program Outcomes</StepLabel>
            </Step>
            <Step >
              <StepLabel >Students</StepLabel>
            </Step>
            <Step >
              <StepLabel >Normalize</StepLabel>
            </Step>
            <Step >
              <StepLabel >Analysis</StepLabel>
            </Step>
        
      </Stepper>

      <Breadcrumbs/>
      <hr style={{marginLeft:'-50px'}}/>
   
    </div>
  );
}

export default Header;

