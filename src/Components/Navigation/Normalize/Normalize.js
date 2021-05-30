import React, { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
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
import axios from "axios";
import { Tab } from "bootstrap";

const Normalize = () => {
  const [assessments, setAssessments] = useState([]);
  const [students, setStudents] = useState([]);
  const [lolist, setlolist] = useState({});
  const [studentlist, setStudentList] = useState({});
  const [endMarks, setendMarks] = useState([]);
  const [module, setModule] = useState([]);

  const [assessmentList, setAssessmentList] = useState([]);

  useEffect(() => {
    console.log("endMarks when use effect starts");
    console.log(endMarks);
    axios.get("https://obesystem.azurewebsites.net/api/Assessment").then((response) => {
      setAssessmentList(response.data);
    });
    axios.get("https://obesystem.azurewebsites.net/api/module").then((response) => {
      const uniquemodule = new Map([
        ...response.data.map((mod) => [mod.id, mod.module_name]),
      ]);
      setModule([...uniquemodule]);
    });

    axios.get("https://obesystem.azurewebsites.net/api/lolist").then((response) => {
      console.log("This is coming from students ", response.data);
      setStudentList(response.data);
      // setStudents(response.data);

      let obtainedMark = 0;
      let obtainedEndExam = 0;
      let assessmentName = "";

      students.map((z) => {
        obtainedMark = 0;
        obtainedEndExam = 0;
        assessmentName = "";

        z.assessment.map((x) => (x.assessment_name = assessmentName));
        z.student.forEach((y) => {
          if (assessmentName !== "End Exam") {
            obtainedMark = obtainedMark + y.student_marks;
          } else {
            obtainedEndExam = obtainedEndExam + y.student_marks;
          }
          setendMarks((state) => [
            ...state,
            {
              ca_mark: obtainedMark,
              name: y.name,
              reg_no: y.registration_number,
              end_mark: obtainedEndExam,
              total_mark: obtainedMark + obtainedEndExam,
            },
          ]);
        });
      });
      console.log("endMarks when use effect finished ");
      console.log(endMarks);
    });
  }, [students.length]);

  const OnModuleChange = (event) => {
    const selectedModule = event.target.value;
    setAssessments(assessmentList.filter((x) => x.moduleId === selectedModule));
    setStudents(studentlist.filter((x) => x.moduleId === selectedModule));
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
            {module.map(([id, module_name]) => (
              <MenuItem value={id}>{module_name}</MenuItem>
            ))}
          </Select>
        </div>
      </FormControl>

      <TableContainer component={Paper}>
        <div style={{ display: "flex" }}>
          <h3 style={{ textAlign: "center", flex: 1.2 }}>NORMALIZE FORM</h3>
        </div>

        <Table aria-label="collapsible table">
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

              {assessments.length > 0 &&
                assessments.map((assessment) => (
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "18px" }}
                    align="center"
                  >
                    {assessment.assessment_name}
                  </TableCell>
                ))}
            </TableRow>

            <TableRow>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "18px" }}
                align="center"
              ></TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "18px" }}
                align="center"
              ></TableCell>

              {assessments.length > 0 &&
                assessments.map((assessment) => (
                  <TableCell>
                    {assessment.lolist &&
                      assessment.lolist.map((lo) => (
                        <TableRow>
                          <TableRow>
                            <TableCell
                              style={{ fontWeight: "bold", fontSize: "18px" }}
                              align="center"
                            >
                              {lo.lo_code}
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell
                              style={{ fontWeight: "bold", fontSize: "18px" }}
                              align="center"
                            >
                              {lo.weight}
                            </TableCell>
                          </TableRow>
                        </TableRow>
                      ))}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>

          <TableBody>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            ></TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            ></TableCell>

            {students.length > 0 &&
              students.map((lo) => (
                <>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "18px" }}
                    align="center"
                  >
                    {lo.lo_name}
                  </TableCell>
                </>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              {students.length > 0 &&
                students.slice(0, 1).map((row) =>
                  row.student.map((z) => (
                    <TableRow>
                      <>
                        <TableCell align="center">
                          {z.registration_number}
                        </TableCell>

                        <TableCell align="center">{z.name}</TableCell>

                        <TableCell align="center">{z.student_marks}</TableCell>
                      </>
                    </TableRow>
                  ))
                )}

              {students.length > 0 &&
                students.slice(1, students.length).map((row) => (
                  <TableCell>
                    {row.student.map((z) => (
                      <TableRow>
                        <TableCell align="center">{z.student_marks}</TableCell>
                      </TableRow>
                    ))}
                  </TableCell>
                ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
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
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              CA Marks
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              End Exam Marks
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Total Marks
            </TableCell>

            {endMarks.slice(0, students.length).map((i) => (
              <>
                <TableRow>
                  <TableCell align="center">{i.reg_no}</TableCell>

                  <TableCell align="center">{i.name}</TableCell>

                  <TableCell align="center">{i.ca_mark}</TableCell>
                  <TableCell align="center">{i.end_mark}</TableCell>
                  <TableCell align="center">{i.total_mark}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Normalize;



// import React, { useEffect, useState } from "react";
// import {
//   FormControl,
//   MenuItem,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@material-ui/core";
// import Paper from "@material-ui/core/Paper";
// import axios from "axios";

// const Normalize = () => {
//   const [assessments, setAssessments] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [lolist, setlolist] = useState({});
//   const [studentlist, setStudentList] = useState({});
//   const [endMarks, setendMarks] = useState([]);
//   const [module, setModule] = useState([]);
 
//   const [assessmentList, setAssessmentList] = useState([]);

//   useEffect(() => {
//     console.log("endMarks when use effect starts");
//     console.log(endMarks);
//     axios.get("https://obesystem.azurewebsites.net/api/Assessment").then((response) => {
//       setAssessmentList(response.data);
      
//     });
//     axios.get("https://obesystem.azurewebsites.net/api/module").then((response) => {
//       const uniquemodule = new Map([...(response.data).map(mod=>[mod.id,mod.module_name])]);
//       setModule([...uniquemodule]);
//     });

//     axios.get("https://obesystem.azurewebsites.net/api/student").then((response) => {
//       console.log("This is coming from students ", response.data);
//       setStudentList(response.data);
//       // setStudents(response.data);

//       let obtainedMark = 0;
//       let obtainedEndExam = 0;

//       students.map((student) => {
//         obtainedMark = 0;
//         obtainedEndExam = 0;
//         student.assessments.forEach((assessment) => {
//           if (assessment.assessment_name !== "End Exam") {
//             obtainedMark = obtainedMark + assessment.student_marks;
//           } else {
//             obtainedEndExam = obtainedEndExam + assessment.student_marks;
//           }
//         });
//         setendMarks((state) => [
//           ...state,
//           {
//             ca_mark: obtainedMark,
//             name: student.name,
//             reg_no: student.registration_number,
//             end_mark: obtainedEndExam,
//             total_mark: obtainedMark + obtainedEndExam,
//           },
//         ]);
//       });
//       console.log("endMarks when use effect finished ");
//       console.log(endMarks);
//     });
//   }, [students.length]);

//   const OnModuleChange = (event) => {
//     const selectedModule = event.target.value
//     setAssessments(assessmentList.filter((x) => x.moduleId === selectedModule))
//     setStudents(studentlist.filter(x => x.assessments.map((z) => z.moduleId === selectedModule)));
//   };

//   return (
//     <div>
//        <FormControl
//         variant="outlined"
//         style={{ marginTop: "20px", width: "200px" }}
//         className="app__dropdown"
//       >
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <Select
//             value=""
//             displayEmpty
//             style={{ width: "400px", margin: "20px" }}
//             variant="outlined"
//              onChange={OnModuleChange}
//           >
//             <MenuItem value="" disabled>
//               Module
//             </MenuItem>
//             {module.map(([id,module_name]) => (
//               <MenuItem value={id}>
//                 {module_name}
//               </MenuItem>
//             ))}
//           </Select>

         

//         </div>
//       </FormControl>
      
//       <TableContainer component={Paper}>
//         <div style={{ display: "flex" }}>
//           <h3 style={{ textAlign: "center", flex: 1.2 }}>NORMALIZE FORM</h3>
//         </div>

//         <Table aria-label="collapsible table">
//           <TableHead>
//             <TableRow>
//               <TableCell
//                 style={{ fontWeight: "bold", fontSize: "18px" }}
//                 align="center"
//               >
//                 Registration Number
//               </TableCell>
//               <TableCell
//                 style={{ fontWeight: "bold", fontSize: "18px" }}
//                 align="center"
//               >
//                 Student Name
//               </TableCell>

//               {assessments.length > 0 &&
//                 assessments.map((assessment) => (
//                   <TableCell
//                     style={{ fontWeight: "bold", fontSize: "18px" }}
//                     align="center"
//                   >
//                     {assessment.assessment_name}
//                   </TableCell>
//                 ))}
//             </TableRow>

//             <TableRow>
//               <TableCell
//                 style={{ fontWeight: "bold", fontSize: "18px" }}
//                 align="center"
//               ></TableCell>
//               <TableCell
//                 style={{ fontWeight: "bold", fontSize: "18px" }}
//                 align="center"
//               ></TableCell>
              
//               {assessments.length > 0 &&
//                 assessments.map((assessment) => (
//                   <TableCell>
//                     {assessment.lolist &&
//                       assessment.lolist.map((lo) => (
//                         <TableRow>
//                           <TableRow>
//                             <TableCell
//                               style={{ fontWeight: "bold", fontSize: "18px" }}
//                               align="center"
//                             >
//                               {lo.lo_code}
//                             </TableCell>
//                           </TableRow>

//                           <TableRow>
//                             <TableCell
//                               style={{ fontWeight: "bold", fontSize: "18px" }}
//                               align="center"
//                             >
//                               {lo.weight}
//                             </TableCell>
//                           </TableRow>
//                         </TableRow>
//                       ))}
//                   </TableCell>
//                 ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             <TableCell
//               style={{ fontWeight: "bold", fontSize: "18px" }}
//               align="center"
//             ></TableCell>
//             <TableCell
//               style={{ fontWeight: "bold", fontSize: "18px" }}
//               align="center"
//             ></TableCell>

//             {students.length > 0 &&
//               students.slice(0, 1).map((student) => (
//                 <>
//                   {student.lolist &&
//                     student.lolist.map((lo) => (
//                       <TableCell
//                         style={{ fontWeight: "bold", fontSize: "18px" }}
//                         align="center"
//                       >
//                         {lo.lo_code}
//                       </TableCell>
//                     ))}
//                 </>
//               ))}

//             {students.length > 0 &&
//               students.map((student) => (
//                 <TableRow>
//                   <TableCell align="center">
//                     {student.registration_number}
//                   </TableCell>

//                   <TableCell align="center">{student.name}</TableCell>

//                   {student.lolist &&
//                     student.lolist.map((lo) => (
//                       <TableCell align="center">{lo.student_marks}</TableCell>
//                     ))}
//                 </TableRow>
//               ))}

//             <TableCell
//               style={{ fontWeight: "bold", fontSize: "18px" }}
//               align="center"
//             >
//               Registration Number
//             </TableCell>
//             <TableCell
//               style={{ fontWeight: "bold", fontSize: "18px" }}
//               align="center"
//             >
//               Student Name
//             </TableCell>
//             <TableCell
//               style={{ fontWeight: "bold", fontSize: "18px" }}
//               align="center"
//             >
//               CA Marks
//             </TableCell>
//             <TableCell
//               style={{ fontWeight: "bold", fontSize: "18px" }}
//               align="center"
//             >
//               End Exam Marks
//             </TableCell>
//             <TableCell
//               style={{ fontWeight: "bold", fontSize: "18px" }}
//               align="center"
//             >
//               Total Marks
//             </TableCell>

//             {endMarks.slice(0, students.length).map((i) => (
//               <>
//                 <TableRow>
//                   <TableCell align="center">{i.reg_no}</TableCell>

//                   <TableCell align="center">{i.name}</TableCell>

//                   <TableCell align="center">{i.ca_mark}</TableCell>
//                   <TableCell align="center">{i.end_mark}</TableCell>
//                   <TableCell align="center">{i.total_mark}</TableCell>
//                 </TableRow>
//               </>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default Normalize;

