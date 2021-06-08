import {
  Grid,
  TextField,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function AssignGrade(props) {
  const [AplusMarks, setAplusMarks] = useState("");
  const [AMarks, setAMarks] = useState("");
  const [AminMarks, setAminMarks] = useState("");
  const [BpluseMarks, setBpluseMarks] = useState("");
  const [BMarks, setBMarks] = useState("");
  const [BminMarks, setBminMarks] = useState("");
  const [CpluseMarks, setCpluseMarks] = useState("");
  const [CMarks, setCMarks] = useState("");
  const [CminMarks, setCminMarks] = useState("");
  const [EMarks, setEMarks] = useState("");
  const [gpa, setGpa] = useState("");
  const [gradeType, setGradeType] = useState("")

  const [toggleButton, setToggleButton] = useState();


  let gradeId = uuidv4();
  let ModuleId = props.match.params.id;

  useEffect(() => {

    axios.get(`https://obesystemtesting.azurewebsites.net/api/module/${ModuleId}`).then((res) => {
      console.log(res);
      console.log(res.data);
      setToggleButton(res.data.gradeId)
    });
   
  }, [toggleButton])


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      id: gradeId,
      AplusMarks:parseInt(AplusMarks),
      AMarks:parseInt(AMarks),
      AminMarks:parseInt(AminMarks),
      BpluseMarks:parseInt(BpluseMarks),
      BMarks:parseInt(BMarks),
      BminMarks:parseInt(BminMarks),
      CpluseMarks:parseInt(CpluseMarks),
      CMarks:parseInt(CMarks),
      CminMarks:parseInt(CminMarks),
      EMarks:parseInt('0'),
      gpa:parseFloat('3'),
      grade_type:''

      
    };

    console.log("data sending for grad >>>>>>", data)

    const gradeData = {
        gradeId:gradeId
    }

    console.log(JSON.stringify(data));

    axios.post("https://obesystemtesting.azurewebsites.net/api/grade", data).then((res) => {

      
    });
    
    // axios.put(`https://obesystemtesting.azurewebsites.net/api/grade/${gradeId}`, data)
    



    axios.put(`https://obesystemtesting.azurewebsites.net/api/module/${ModuleId}`, gradeData).then((res) => {
      console.log(res);
      console.log(res.data);
    });

   
  };

  const useStyle = makeStyles((theme) => ({
    root: {
      "& .MuiFormControl-root": {
        width: "80%",
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyle();

  const onDeleteGrade = (event) =>{

    const deleteData={
      gradeId:null
    }

    axios.put(`https://obesystemtesting.azurewebsites.net/api/module/${ModuleId}`, deleteData);
    

  }

  return (
    <Container>
      <form className={classes.root} onSubmit={handleSubmit}>

        
      <div style={{justifyContent:'center', display:'flex'}}>
           
    
             { toggleButton && <Button
                
                variant="contained"
                color="secondary"
                // size="large"
                onClick={onDeleteGrade}
              >
                Delete Assigned Values
              </Button>}
            </div>

        
     
        <Grid container>
          <Grid item xs={6}>
            <Typography align='center' variant="h6" gutterBottom>
             Higher
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography align='center' variant="h6" gutterBottom>
              Lower
            </Typography>
          </Grid>



          <Grid item xs={6}>
          <TextField
             variant="outlined"
              name="AplusMarks"
              label="Top Marks"
              type="AplusMarks"
              value='100'
              variant="filled"
              disabled
              size='small'
              
            />
            <TextField
             variant="outlined"
              label="AMarks"
              name="A Min Marks"
              size='small'
              disabled
              value={`${parseInt(AplusMarks) - 1}` }
            />
            <TextField
             variant="outlined"
              label="A- Min Marks"
              name="AminMarks"
              value={`${parseInt(AMarks) - 1}`}
              disabled
              size='small'
            />
            <TextField
             variant="outlined"
              label="B+ Min Marks"
              name="BplusMarks"
              value={`${parseInt(AminMarks) - 1}`}
              disabled
              size='small'
            />
            <TextField
             variant="outlined"
              label="B Min Marks"
              name="BMarks"
              value={`${parseInt(BpluseMarks) - 1}`}
              disabled
              size='small'
            />
            <TextField
            size='small'
             variant="outlined"
              label="B- Min Marks"
              name="min_ca_marks"
              value={`${parseInt(BMarks) - 1}`}
              disabled
            />
            <TextField
             variant="outlined"
              label="C+ Min Marks"
              name="CplusMarks"
              value={`${parseInt(BminMarks) - 1}`}
              disabled
              size='small'
            />
            <TextField
            size='small'
             variant="outlined"
              label="C Min Marks"
              name="CMarks"
              value={`${parseInt(CpluseMarks) - 1}`}
              disabled
            />
            <TextField
            size='small'
             variant="outlined"
              label="C- Min Marks"
              name="CminMarks"
              value={`${parseInt(CMarks) - 1}`}
              disabled
            />
            <TextField
            size='small'
             variant="outlined"
              label="E Min Marks"
              name="EminMarks"
              value={`${parseInt(CminMarks) - 1}`}
              disabled
            />

       </Grid>

       
       <Grid item xs={6}>
            <TextField
            size='small'
             variant="outlined"
            type="AplusMarks"
             variant="outlined"
              name="AplusMarks"
              label="A+ Min Marks"
              onChange={(e) => setAplusMarks(e.target.value)}
            />
            <TextField
            size='small'
             variant="outlined"
              label="A Min Marks"
              name="A Min Marks"
              onChange={(e) => setAMarks(e.target.value)}
              size='small'
            />
            <TextField
            size='small'
             variant="outlined"
              label="A- Min Marks"
              name="AminMarks"
              onChange={(e) => setAminMarks(e.target.value)}
            />
            <TextField
            size='small'
             variant="outlined"
              label="B+ Min Marks"
              name="BplusMarks"
              onChange={(e) => setBpluseMarks(e.target.value)}
            />
            <TextField
            size='small'
             variant="outlined"
              label="B Min Marks"
              name="BMarks"
              onChange={(e) => setBMarks(e.target.value)}
            />
            <TextField
            size='small'
             variant="outlined"
              label="B- Min Marks"
              name="min_ca_marks"
              onChange={(e) => setBminMarks(e.target.value)}
            />
            <TextField
            size='small'
             variant="outlined"
              label="C+ Min Marks"
              name="CplusMarks"
              onChange={(e) => setCpluseMarks(e.target.value)}
            />
            <TextField
            size='small'
             variant="outlined"
              label="C Min Marks"
              name="CMarks"
              onChange={(e) => setCMarks(e.target.value)}
            />
            <TextField
            size='small'
             variant="outlined"
              label="C- Min Marks"
              name="CminMarks"
              onChange={(e) => setCminMarks(e.target.value)}
            />
            <TextField
            size='small'
             variant="outlined"
             variant="filled"
              label="E Min Marks"
              name="EminMarks"
              value='0'
              disabled
              onChange={(e) => setEMarks(e.target.value)}
            />


          </Grid>
         </Grid>


              <div style={{justifyContent:'center', display:'flex'}}>
            { !toggleButton && <Button
                type="submit"
                text="submit"
                variant="contained"
                color="primary"
                // size="large"
              >
                Submit
              </Button>}
    
            
            </div>
         
              </form>


    </Container>
  );
}

export default AssignGrade;
