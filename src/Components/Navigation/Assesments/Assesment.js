import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

function Assessment() {
  var [assessment, setAssessment] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:44333/api/Assessment").then((response) => {
      console.log("This is coming from Assessment ", response.data);
      setAssessment(response.data);
    });
  }, []);

  const handleDeleteAssessment = (id) => {
    axios
      .delete(`https://localhost:44333/api/assessment/${id}`)
      .then((response) => {
        console.log(response.data);
       
      });

  };

  const handleDeleteLo = (id) => {

    const dataid = {
      moduleid:null
    }
    
    
    axios
    .put(`https://localhost:44333/api/lolist/${id}`, dataid)
    .then((response) => {
      console.log(response.data);
    });

    axios
      .delete(`https://localhost:44333/api/assessmentlos/${id}`)
      .then((response) => {
        console.log(response.data);

      });

  };


  return (
  
    <div>
          <TableContainer component={Paper}>
      <div style={{ display: "flex" }}>
        <h3 style={{ textAlign: "center", flex: 1.2 }}>ASSESSMENTS LIST</h3>
        <div style={{ flex: 0.2 }}>
          <Button href="/assesment/create" variant="contained" color="primary">
            {" "}
            Add Assessment
          </Button>
        </div>
      </div>

      

      <Table aria-label="collapsible table">
        <TableHead>
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
              Module Name
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
              Assigned LO
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              LO
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
          {assessment.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.assessment_name}</TableCell>
              <TableCell align="center">{row.module ? row.module.module_name : null}</TableCell>
              <TableCell align="center">{row.marks}</TableCell>
              <TableCell align="center">{row.lolist.map(lo=>lo.lo_code)} </TableCell>
              <TableCell  align="center">
                <Button
               
                
                  href={`/assesment/definelo/${row.id}`}
                  variant="contained"
                  color="secondary"
                >
                  Assign LO
                </Button>
                <Button
               
                onClick={() => handleDeleteLo(row.lolist.map(lo=>lo.id))}
                variant="contained"
                color="secondary"
                >
                 Delete LO
                </Button>
              </TableCell>

              <TableCell align="center">
                <Button onClick={() => handleDeleteAssessment(row.id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {/* <TableContainer>
      <Table>
        <TableBody>
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
              Student Name
            </TableCell>

        </TableBody>
      </Table>
    </TableContainer> */}
      
    </div>

  );
}

export default Assessment;
