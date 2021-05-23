// import { FormControl, FormControlLabel, FormLabel, Radio,RadioGroup as MuiRadioGroup } from '@material-ui/core';
import React from 'react';

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function CheckGroup(props) {

    const {name, label, value, onChange, items} = props;
    return (
       
            <FormControl>
                <FormLabel>{label}</FormLabel>
                <FormGroup row 
                name={name}
                value={value}
                onChange={onChange}>
                 {
                     items.map(
                        (item) => (
                            <FormControlLabel 
                            label={item.titles} 
                             key={item.id}
                              value={item.id} 
                              control={<Checkbox />}
                            />
                        )
                    )
                }
                </FormGroup>
            </FormControl>
       
    )
}
