import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(no, pocode, poname, description, moredetails) {
  return {
    no,
    pocode,
    poname,
    description,
    moredetails,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.no}
        </TableCell>
        <TableCell align="right">{row.pocode}</TableCell>
        <TableCell align="right">{row.poname}</TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.moredetails}</TableCell>
        <TableCell align="right"> <EditIcon/> </TableCell>
        <TableCell align="right"><DeleteIcon/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                        <TableCell>The description part goes here...</TableCell>
                   </TableRow>
               
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    pocode: PropTypes.number.isRequired,
    poname: PropTypes.number.isRequired,
    description: PropTypes.number.isRequired,
    moredetails: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData(1, "LO", "LO", "Description", "Learning Outcome"),
  createData(2, "LO", "LO", "Description", "Learning Outcome"),
  createData(3, "LO", "LO", "Description", "Learning Outcome"),
  createData(4, "LO", "LO", "Description", "Learning Outcome"),
  createData(5, "LO", "LO", "Description", "Learning Outcome"),
  createData(6, "LO", "LO", "Description", "Learning Outcome"),
  createData(7, "LO", "LO", "Description", "Learning Outcome"),
 
];

function LoList() {
  return (
    <TableContainer component={Paper}>
         <h3 style={{textAlign:"center"}}>LEARNING OUTCOME LIST</h3>
      <Table aria-label="collapsible table">
         
        <TableHead >
          <TableRow>
            <TableCell  />
            <TableCell  style={{fontWeight:"bold", fontSize:"18px"}}  >No</TableCell>
            <TableCell  style={{fontWeight:"bold", fontSize:"18px"}} align="right">LO Code</TableCell>
            <TableCell style={{fontWeight:"bold", fontSize:"18px"}}  align="right">LO Name</TableCell>
            <TableCell  style={{fontWeight:"bold", fontSize:"18px"}} align="right">Description</TableCell>
            <TableCell style={{fontWeight:"bold", fontSize:"18px"}}  align="right">More Details</TableCell>
            <TableCell style={{fontWeight:"bold", fontSize:"18px"}}  align="right">Edit</TableCell>
            <TableCell style={{fontWeight:"bold", fontSize:"18px"}}  align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default LoList;
