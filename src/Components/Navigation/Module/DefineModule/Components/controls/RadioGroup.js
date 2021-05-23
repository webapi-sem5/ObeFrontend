// import { FormControl, FormControlLabel, FormLabel, Radio,RadioGroup as MuiRadioGroup } from '@material-ui/core';
import React from 'react';

import Radio from '@material-ui/core/Radio';
import { RadioGroup as MuiRadioGroup }from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioGroup(props) {

    const {name, label, value, onChange, items} = props;
    return (
       
            <FormControl>
                <FormLabel>{label}</FormLabel>
                <MuiRadioGroup row 
                name={name}
                value={value}
                onChange={onChange}>
                 {
                     items.map(
                        (item) => (
                            <FormControlLabel key={item.id} value={item.id} control={<Radio /> }label={item.titles} />
                        )
                    )
                }
                </MuiRadioGroup>
            </FormControl>
       
    )
}
