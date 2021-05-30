import React from "react";
import { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import * as yup from "yup";
import { withFormik } from "formik";

const validationsForm = {
  name: yup.string().required("Required"),
  batch: yup.string().required("Required"),
  registration_number: yup.string().required("Required")
  
};

function Student(props) {

  const {
    touched,
    errors,
    handleBlur,
  } = props;

  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [batch, setBatch] = useState("");
  var [student, setStudent] = useState([]);
  const [selectStudent, setSelectStudent] = useState([]);
  const [batchId, setBatchId] = useState()
  

  useEffect(() => {
    axios.get("https://obesystem.azurewebsites.net/api/student").then((response) => {
      console.log(response);
      setSelectStudent(response.data);
      const studentBatch = new Map([...(response.data).map(stud=>[stud.batch])]);
      console.log("This is from student batch >>>>>>>>", studentBatch)
      setStudent([...studentBatch]); 
      console.log(response.data);
    });


  }, []);

  const handleDeleteLo = (id) => {
    axios
      .delete(`https://obesystem.azurewebsites.net/api/student/${id}`)
      .then((response) => {
        console.log(response.data);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: name,
      registration_number: registrationNumber,
      batch: parseFloat(batch),
    };
    console.log(data);

    axios.post("https://obesystem.azurewebsites.net/api/student", data).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const OnStudentChange = (event) => {
    const batch = event.target.value;
    setBatchId(batch);
   
  };

  return (
    <>
    
          <Select
            displayEmpty
            style={{ width: "100px", margin:"20px" }}
            variant="outlined"
            value=''
            onChange={OnStudentChange}
            
          >
            <MenuItem value="" disabled>Batch</MenuItem>
            {student.map(([batch]) => {
              return(<MenuItem value={batch}>
                {batch}
              </MenuItem>)
            })}
          </Select>

      <form onSubmit={handleSubmit}>
        <div className="definelo_main">
          <TextField
            style={{ flex: 0.9 }}
            label="Name"
            name="name"
            id="outlined-start-adornment"
            className=""
            fullWidth
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            helperText={touched.name ? errors.name : ""}
            error={touched.name && Boolean(errors.name)}
          />

          <div style={{ display: "flex" }}>
            <TextField
              style={{ flex: 0.5 }}
              label="Registration Number"
              id="outlined-start-adornment"
              className=""
              name="registration_number"
              onChange={(e) => setRegistrationNumber(e.target.value)}
              variant="outlined"
              onBlur={handleBlur}
              helperText={touched.registration_number ? errors.registration_number : ""}
              error={touched.registration_number && Boolean(errors.registration_number)}
            />

            <TextField
              style={{ flex: 0.5 }}
              label="Batch"
              name="batch"
              id="outlined-start-adornment"
              className=""
              fullWidth
              variant="outlined"
              onBlur={handleBlur}
              helperText={touched.batch ? errors.batch : ""}
              error={touched.batch && Boolean(errors.batch)}
              onChange={(e) => setBatch(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            // onClick={refreshPage}
            type="submit"
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
        </div>
      </form>

      <TableContainer component={Paper}>
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
                Registration Number
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "18px" }}
                align="center"
              >
                Name
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "18px" }}
                align="center"
              >
                Batch
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectStudent.filter(stu => stu.batch === batchId ).map((row, index) => (
              <TableRow key={row.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.registration_number}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.batch}</TableCell>

                <TableCell align="center">
                  <Button onClick={() => handleDeleteLo(row.id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const StudentForm = withFormik({
  validationSchema: yup.object().shape(validationsForm),
})(Student);

export default StudentForm;
