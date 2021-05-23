import {TextField} from '@material-ui/core';
import React from 'react';

export default function input(props) {

    const {name, label, value, onChange} = props;
    return (
        <TextField  autoComplete='off'
                    
                    variant="outlined"
                    label={label}
                    name={name}
                    value={value}
                    onChange={onChange}
                    
        />
    )
}
