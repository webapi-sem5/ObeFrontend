import {TextField} from '@material-ui/core';
import * as yup from "yup";
import { withFormik } from 'formik';
import React from 'react';

const validationsForm = {
    name: yup.string().required("Required"),
  
  };
 function input(props) {
     const {name, label, value, onChange} = props;


    return (
        <TextField  
                    autoComplete='off'
                    
                    variant="outlined"
                    label={label}
                    name={name}
                    value={value}
                    onChange={onChange}
                    
        />
    )
}

const Input = withFormik({

    validationSchema: yup.object().shape(validationsForm),
  
  })(input);

  export default (Input)
