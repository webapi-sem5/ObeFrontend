import React from 'react'
import {Button as MuiButton} from "@material-ui/core";



export default function Button(props) {

    const {text,size,color,variant,onClick, ...other } = props;
    return (
        <MuiButton
        variant ={variant}
        size={size}
        color={color}
        onClick={onClick}
        {...other}
        >
            {text}
        </MuiButton>
    )
}
