import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

function AssignedLo(props) {
  var [lolist, setLolist] = useState([]);
  var [lolists, setLolists] = useState([]);
  const [clicked, setclicked] = useState(false);
  const [deleted, setdeleted] = useState(false);
   const [moduleid, setModuleid] = useState();
 

  let poid = props.match.params.id;

  useEffect(() => {
    axios.get("https://localhost:44333/api/Lolist").then((response) => {
      console.log(response);
      setLolist(response.data);
      console.log(response.data);
      axios.get(`https://localhost:44333/api/Assessment/${poid}`).then((response)=>{
     setModuleid(response.data.moduleId)
    })


    // setLolists(response.data.filter((lo )=> {return(lo.moduleId===null || lo.moduleId===moduleid)}))
     

    });
  }, []);


  const handleAssignLo = (id) => {
    setclicked(true);

    
    // const dataid = {
    //   moduleid:moduleid
    // }

     
    
    
    const data = {
      assessmentid: poid,
      lolistid: id,
    };
    
    console.log(">>>>>>>>>>", data);

   axios.get(`https://localhost:44333/api/Assessment/${poid}`).then((response)=>{
     setModuleid(response.data.moduleid)
     axios.put(`https://localhost:44333/api/lolist/${id}`, {moduleId:response.data.moduleId});
      });

      axios.post("https://localhost:44333/api/assessmentlos", data);

    // .then(
    //   axios.spread((...allData) => {
    //     const putdata = allData[0]
    //     const postdata = allData[1]
    //     const getdata = allData[2]

    //     console.log(putdata)
    //     console.log(postdata)
    //     console.log(getdata)
    //   })
    // )
  
  };

  const handleDeleteLo = (id) => {
    setdeleted(true);

    axios
      .delete(`https://localhost:44333/api/assessmentlos/${id}`)
      .then((response) => {
        console.log(response.data);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setdeleted(false);
    setclicked(false);
  };

  return (
    <TableContainer component={Paper}>
      <div style={{ display: "flex" }}>
        <h3 style={{ textAlign: "center", flex: 1 }}>LEARNING OUTCOME LIST</h3>
      </div>

      <Table aria-label="collapsible table">
        <TableHead>
          <Snackbar
            open={clicked}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              Program Outcome assigned successfully
            </Alert>
          </Snackbar>
          <Snackbar
            open={deleted}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              Program Outcome deleted successfully
            </Alert>
          </Snackbar>
          <TableRow>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              No
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              LO Code
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              LO Name
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Description
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Weight
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Add
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
          
          {lolist.filter((lo )=> {return(lo.moduleId===null || lo.moduleId===moduleid)}).map((row, index) => (
            <TableRow key={row.id}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.lo_code}</TableCell>
              <TableCell align="center">{row.lo_name}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.weight}</TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => handleAssignLo(row.id)}
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => handleDeleteLo(row.id)}
                  variant="contained"
                  color="secondary"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AssignedLo;
