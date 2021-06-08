import { Grid } from '@material-ui/core';
import React from 'react';
import Controls from '../Components/controls/Control';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import * as yup from "yup";
import { withFormik } from "formik";
import { TextField, makeStyles } from "@material-ui/core";

const validationsForm = {
    assessmentName: yup.string().required("Required"),
    marks: yup.string().required("Required"),
    
  };




function AssessmentForm(props) {
    const {
        touched,
        errors,
        handleBlur,
      } = props;


    const UUID = uuidv4() ;


    const [type, setType] = useState('')
    const [marks, setMarks] = useState('')
   


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
             Assessment_name : type,
             Marks : parseInt(marks),
        }


        axios.post("https://obesystemtesting.azurewebsites.net/api/assessment",data)
        .then((res) => {
          console.log(res)
          console.log(res.data)
        })
    }

    
    const useStyle = makeStyles(theme => ({
        root:{
            '& .MuiFormControl-root':{
                width:'80%',
                margin: theme.spacing(1)
            }
        }
    }))
    
 
    
    const classes = useStyle();
    
   
   
    return (
       <form className={classes.root} onSubmit={handleSubmit}>
           <Grid container>
               <Grid item xs= {6}>
                    <TextField
                    name='assessmentName'
                    label='Type:Final Evaluation,Practical,Assignment,Workshop,Project'
                    onChange={(e)=>setType(e.target.value)}
                    // options={getTypeCollection}
                    variant="outlined"
                    onBlur={handleBlur}
                    helperText={touched.assessmentName ? errors.assessmentName : ""}
                    error={touched.assessmentName && Boolean(errors.assessmentName)}
                    />
               </Grid>
               <Grid item xs ={6}>

               <TextField
                label="Marks"
                name='marks'
                onChange={(e)=>setMarks(e.target.value)}
                variant="outlined"
                // onBlur={handleBlur}
                helperText={touched.marks ? errors.marks : ""}
                error={touched.marks && Boolean(errors.marks)}
                
                />

            
                <div>
                <Controls.Button
                variant = 'contained'
                color='primary'
                size='large'
                text='submit'
                type='submit'
                />

            </div>

               </Grid>
            
           </Grid>
       </form>
    )
}

const AssessForm = withFormik({
    validationSchema: yup.object().shape(validationsForm),
  })(AssessmentForm);

export default AssessForm
