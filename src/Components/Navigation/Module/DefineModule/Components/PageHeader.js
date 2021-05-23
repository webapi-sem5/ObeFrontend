import React from 'react'
import {Paper,Card,Typography, makeStyles} from  '@material-ui/core';



const useStyles = makeStyles(theme => ({
    root:{
        backgroundColor:'#fdfdff'
    },
    PageHeader:{
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2)
    },
    PageIcon:{
        display:'inline-block',
        padding:theme.spacing(2),
        color:'#3c44b1'
    },
    PageTitle:{
        paddingLeft:theme.spacing(4),
        '& .MuiTypography-subtitle2': {
            opacity:'0.5'
        }

    }
}))




function PageHeader(props) {

    const classes = useStyles();

    const {title,subTitle,icon} = props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className= {classes.PageHeader}>
                <Card className={classes.PageIcon}>
                    {icon}
                </Card>
                <div className={classes.PageTitle}>
                    <Typography  
                    variant='h6'
                    component='div'
                    >{title}</Typography>

                    <Typography
                    variant='subtitle2'
                    component='div'
                    >{subTitle}</Typography>
                </div>
            </div>
            
        </Paper>
    )
}



export default PageHeader;

