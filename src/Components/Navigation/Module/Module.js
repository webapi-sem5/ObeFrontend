import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import "./Module.css";

function Module() {
  var [module, setModule] = useState([]);
  const [assessment, setAssessment] = useState([])

  useEffect(() => {
    axios.get("https://obesystemtesting.azurewebsites.net/api/Module").then((response) => {
      setModule(response.data);
      console.log(response.data);
    });

    axios.get("https://obesystemtesting.azurewebsites.net/api/assessment").then((response) => {
      setAssessment(response.data);
      console.log(response.data);
    });
  }, []);

  const handleDeleteModule = (id) => {
    axios
      .delete(`https://obesystemtesting.azurewebsites.net/api/module/${id}`)
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <TableContainer component={Paper}>
      <div style={{ display: "flex" }}>
        <h3 style={{ textAlign: "center", flex: 1 }}>MODULE LIST</h3>
        <div style={{ flex: 0.1 }}>
          <Button href="/module/create/" variant="contained" color="primary">
            Add Module
          </Button>
        </div>
      </div>

      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
              No
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Module Title
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Module Code
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Semester
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Lecturer
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Date
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Assign
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Edit
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
          {module.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell />
              <TableCell>{index + 1}</TableCell>
              <TableCell align="center">{row.module_name}</TableCell>
              <TableCell align="center">{row.module_code}</TableCell>
              <TableCell align="center">{row.semester}</TableCell>
              <TableCell align="center">{row.lecturer}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell
                style={{ display: "flex", flexDirection: "column" }}
                align="center"
              >
                <Button
                  href={`/module/defineassessment/${row.id}`}
                  variant="contained"
                  color="secondary"
                >
                  Assessment
                </Button>
                <Button
                  href={`/module/definethreshold/${row.id}`}
                  variant="contained"
                  color="secondary"
                >
                  Threshold
                </Button>
                <Button
                  href={`/module/definegrade/${row.id}`}
                  variant="contained"
                  color="secondary"
                >
                  Grade
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button href={`/module/edit/${row.id}`}>
                  <EditIcon />
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => handleDeleteModule(row.id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        
      </Table>



      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
              No
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Module Title
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Module Code
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Semester
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Assigned Assessments
            </TableCell>
       
        
          </TableRow>
        </TableHead>
        <TableBody>
          {assessment.map((row, index) => (
            
            <TableRow key={row.id}>
              <TableCell />
              <TableCell>{index + 1}</TableCell>
              <TableCell align="center">{row.module ? row.module.module_name : null}</TableCell>
              <TableCell align="center">{row.module ? row.module.module_code : null}</TableCell>
              <TableCell align="center">{row.module ? row.module.semester : null}</TableCell>


              <TableCell align="center">{row.assessment_name}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>

        
      </Table>

     

      
    </TableContainer>
  );
}

export default Module;
