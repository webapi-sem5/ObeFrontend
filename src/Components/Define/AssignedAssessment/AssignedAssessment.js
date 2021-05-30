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

function AssignedAssessment(props) {
  var [assessment, setAssessment] = useState([]);
  const [clicked, setclicked] = useState(false);

  let moduleId = props.match.params.id;

  useEffect(() => {
    axios.get("https://obesystem.azurewebsites.net/api/Assessment").then((response) => {
      console.log("This is coming from Assessment ", response.data);
      setAssessment(response.data);
    });
  }, []);

  const handleAssignModule = (id) => {
    const data = {
      moduleid: moduleId,
    };

    setclicked(true);
    console.log(">>>>>>>>>>", data);

    axios
      .put(`https://obesystem.azurewebsites.net/api/Assessment/${id}`, data)
      .then((response) => {
        console.log(response.data);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setclicked(false);
  };

  return (
    <TableContainer component={Paper}>
      <div style={{ display: "flex" }}>
        <h3 style={{ textAlign: "center", flex: 1.2 }}>ASSESSMENTS LIST</h3>
      </div>

      <Table aria-label="collapsible table">
        <TableHead>
          <Snackbar
            open={clicked}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              Module assigned successfully
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
              Assessment Name
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Marks
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Add
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assessment.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.assessment_name}</TableCell>
              <TableCell align="center">{row.marks}</TableCell>
              {/* <TableCell align="center"> <EditIcon /></TableCell> */}

              <TableCell align="center">
                <Button
                  onClick={() => handleAssignModule(row.id)}
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AssignedAssessment;
