import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { v4 as uuidv4 } from "uuid";
import { useStaticState } from "@material-ui/pickers";

const StudentMarks = () => {
  var [assessments, setAssessments] = useState([]);
  var [assessment, setAssessment] = useState({});
  var [lolist, setlolist] = useState([]);
  var [regNo, setRegNo] = useState();
  var [name, setName] = useState();
  var [marks, setMarks] = useState();
  var [lomark, setLomark] = useState({});
  var [assessmentId, setAssessmentId] = useState();
  const [students, setStudents] = useState([]);
  const [studentId, setStudentid] = useState();
  const [student, setStudent] = useState({});

  const [studentBatch, setStudentBatch] = useState([]);

  const [batchId, setBatchId] = useState();

  const [moduleAss, setModuleAss] = useState([]);

  const [moduleName, setModuleName] = useState([]);

  const [uniqueModule, setUniqueModule] = useState([]);  
  const [uniqueStudent, setUniqueStudent] = useState([]);

  useEffect(() => {
    // console.log('useEffect',lomark.mark)
    axios.get("https://obesystem.azurewebsites.net/api/Assessment").then((response) => {
      console.log("This is coming from Assessment ", response.data);
      const uniquemodule =  new Map([...(response.data).map(stud=>[stud.module.module_name])]);
      setUniqueModule([...uniquemodule]);
      setAssessments(response.data);
      setModuleName((state) => [
        ...state,
        response.data.map((x) => x.module.module_name),
      ]);

      console.log("Module Name Array >>>>", moduleName);
    });

    axios
      .get("https://obesystem.azurewebsites.net/api/student/")
      .then((response) => {
        const uniquestudent = new Map([...(response.data).map(stud=>[stud.batch])]);
         setUniqueStudent([...uniquestudent]);
        setStudents(response.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [assessment]);

  const OnAssessmentChange = (event) => {
    const assessmentId = event.target.value;
    setAssessmentId(assessmentId);
    axios
      .get(`https://obesystem.azurewebsites.net/api/Assessment/${assessmentId}`)
      .then((response) => {
        console.log("This is coming from Assessment ", response.data);
        setAssessment(response.data);
        setlolist(response.data.lolist);
      });
  };

  const OnModuleChange = (event) => {
    const moduleName = event.target.value;

    setModuleAss(assessments.filter((x) => x.module.module_name === moduleName));
  };

  const OnStudentsChange = (event) => {
    const studentid = event.target.value;
    setStudentid(studentid);

    axios
      .get(`https://obesystem.azurewebsites.net/api/student/${studentid}`)
      .then((response) => {
        console.log("This is coming from Assessment ", response.data);
        setStudent(response.data);
      });
  };

  const OnStudentChange = (event) => {
    const batchStudent = event.target.value;
    setBatchId(batchStudent);

    setStudentBatch(students.filter((x) => x.batch === batchStudent));
  };

  const handleLoMarks = (id) => {
    const assessmentStudent = {
      studentid: studentId,
      assessmentid: assessmentId,
      assessment_marks: parseFloat(marks),
    };

    // console.log("This student sending data")
    console.log("This Assessment sending data", assessmentStudent);

    // axios
    //   .put(`https://obesystem.azurewebsites.net/api/student/${studentId}`, data)
    //   .then((response) => {
    //     console.log('Add student success');
    axios
      .post("https://obesystem.azurewebsites.net/api/assessmentstudents", assessmentStudent)
      .then((response) => {
        console.log("assessmentStudent added success");
        for (const [key, value] of Object.entries(lomark)) {
          const studentlo = {
            studentid: studentId,
            lolistid: key,
            lo_marks: parseFloat(value),
          };
          console.log({ studentlo });
          axios
            .post("https://obesystem.azurewebsites.net/api/studentlolists", studentlo)
            .then((response) => {
              console.log(`lo id ${key} inserted into server student lo `);
            })
            .catch((e) => {
              console.log(e.response);
            });
        }
      });
    // });
  };

  //   const refreshPage = ()=>{
  //     window.location.reload();
  //  }

  const handleChange = (event) => {
    let marks = [...lomark.mark];
    console.log(marks.length);
    marks[marks.length] = event.target.value;
    console.log("handle change : ", marks);
    setLomark({ mark: marks });
  };

  return (
    <div>
      <FormControl
        variant="outlined"
        style={{ marginTop: "20px", width: "200px" }}
        className="app__dropdown"
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Select
            value=""
            displayEmpty
            style={{ width: "400px", margin: "20px" }}
            variant="outlined"
            onChange={OnModuleChange}
          >
            <MenuItem value="" disabled>
              Module
            </MenuItem>
            {uniqueModule.map(([module_name]) => (
              <MenuItem value={module_name}>
                {module_name}
              </MenuItem>
            ))}
          </Select>

          <Select
            value=""
            displayEmpty
            style={{ width: "400px", margin: "20px" }}
            variant="outlined"
            onChange={OnAssessmentChange}
          >
            <MenuItem value="" disabled>
              Assessment
            </MenuItem>

            {moduleAss.map((assessment) => (
              <MenuItem value={assessment.id}>
                {assessment.assessment_name}
              </MenuItem>
            ))}
          </Select>

          <Select
            value=""
            displayEmpty
            style={{ width: "400px", margin: "20px" }}
            variant="outlined"
            onChange={OnStudentChange}
          >
            <MenuItem value="" disabled>
              Batch
            </MenuItem>

            {uniqueStudent.map(([batchName]) => (
              <MenuItem value={batchName}>{batchName}</MenuItem>
            ))}
          </Select>

          <Select
            value=""
            displayEmpty
            style={{ width: "400px", margin: "20px" }}
            variant="outlined"
            onChange={OnStudentsChange}
          >
            <MenuItem value="" disabled>
              Student
            </MenuItem>
            <MenuItem value={null}>New</MenuItem>
            {studentBatch.map((student) => (
              <MenuItem value={student.id}>{student.name}</MenuItem>
            ))}
          </Select>
        </div>
      </FormControl>

      <TableContainer component={Paper}>
        <div style={{ display: "flex" }}>
          <h3 style={{ textAlign: "center", flex: 1.2 }}>ASSESSMENT</h3>
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
                Marks
              </TableCell>
              {lolist.length > 0 &&
                lolist.map((lo) => (
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "18px" }}
                    align="center"
                  >
                    {lo.lo_code}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={assessment.id}>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{assessment.assessment_name}</TableCell>
              <TableCell align="center">{assessment.marks}</TableCell>
              {/* <TableCell align="center"> <EditIcon /></TableCell> */}

              {lolist.length > 0 &&
                lolist.map((lo) => (
                  <TableCell align="center">{lo.weight}</TableCell>
                ))}
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
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
                Student Name
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow key={student.id}>
              <TableCell align="center">
                <Input
                  value={student.registration_number}
                  name="registration_number"
                  label="Registration Number"
                  onChange={(e) => {
                    setRegNo(e.target.value || student.registration_number);
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Input
                  value={student.name}
                  name="name"
                  label="Student Name"
                  onChange={(e) => {
                    setName(e.target.value || student.name);
                  }}
                />
              </TableCell>

              <TableCell align="center" key={assessment.id}>
                <Input
                  name="student_marks"
                  label="Assessment Marks"
                  onChange={(e) => setMarks(e.target.value)}
                />
              </TableCell>

              {lolist.length > 0 &&
                lolist.map((lo, i) => (
                  <>
                    <TableCell align="center">
                      <Input
                        type="text"
                        name="lo_marks"
                        label="LO Marks"
                        key={lo.id}
                        onChange={({ target }) =>
                          setLomark((state) => ({
                            ...state,
                            [`${lo.id}`]: target.value,
                          }))
                        }
                        value={lomark[`${lo.id}`]}
                      />
                    </TableCell>
                  </>
                ))}

              <TableCell align="center">
                <Button
                  onClick={handleLoMarks}
                  // onClick={refreshPage}
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StudentMarks;
