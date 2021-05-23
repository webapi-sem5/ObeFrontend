import { Grid } from '@material-ui/core';
import React from 'react';
import Controls from '../Components/controls/Control';
import { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";



function AssessmentForm() {


    const UUID = uuidv4() ;


    const [type, setType] = useState('')
    const [marks, setMarks] = useState('')
   


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
             Assessment_name : type,
             Marks : parseInt(marks),
        }


        axios.post("https://localhost:44333/api/assessment",data)
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
                    <Controls.Input
                    name='Assessment Name'
                    label='Type:Final Evaluation,Practical,Assignment,Workshop,Project'
                    onChange={(e)=>setType(e.target.value)}
                    // options={getTypeCollection}
                    />
               </Grid>
               <Grid item xs ={6}>

               <Controls.Input  
                label="Marks"
                name='marks'
                onChange={(e)=>setMarks(e.target.value)}
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

export default AssessmentForm
