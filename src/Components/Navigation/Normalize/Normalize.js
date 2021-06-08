
import React, { useEffect, useState } from "react";
import {
  FormControl,
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

const Normalize = () => {
  const [assessments, setAssessments] = useState([]);
  const [students, setStudents] = useState([]);
  const [lolist, setlolist] = useState({});
  const [studentlist, setStudentList] = useState({});
  const [endMarks, setendMarks] = useState([]);
  const [module, setModule] = useState([]);
 
  const [assessmentList, setAssessmentList] = useState([]);
  const [moduleBatch, setModuleBatch] = useState({});
  const [batchInfo, setBatchInfo] = useState([]);
  const [status, setStatus] = useState(false);
  const [batch, setBatch] = useState();
  const [allModules, setAllModules] = useState([]);
  const [gradeStatus, setGradeStatus] = useState();
  

  useEffect(() => {


      

   
    axios.get("https://obesystemtesting.azurewebsites.net/api/Assessment").then((response) => {
      setAssessmentList(response.data);
      
    });
    axios.get("https://obesystemtesting.azurewebsites.net/api/module").then((response) => {

      setAllModules(response.data);

      const uniquemodule = new Map([...(response.data).map(mod=>[mod.id,mod.module_name])]);
      setModule([...uniquemodule]);
    });

    

    axios.get("https://obesystemtesting.azurewebsites.net/api/student").then((response) => {
      console.log("This is coming from students ", response.data);
      const uniquebatch = new Map([...(response.data).map(stu=>[stu.batch])]);
      setBatchInfo([...uniquebatch]);
      setStudentList(response.data);
      // setStudents(response.data);

      let obtainedMark = 0;
      let obtainedEndExam = 0;
      let studentMarks = [];

      students.filter(stu => stu.status===true).map((student) => {
        obtainedMark = 0;
        obtainedEndExam = 0;
        student.assessments.forEach((assessment) => {
          if (assessment.assessment_name !== "End Exam") {
            obtainedMark = obtainedMark + assessment.student_marks;
          } else {
            obtainedEndExam = obtainedEndExam + assessment.student_marks;
          }
        });
        

        const grade = gradeStatus[0] ? calculateGrade(obtainedMark+obtainedEndExam): '';
        const gpa = gradeStatus[0] ? calculateGpa(obtainedMark+obtainedEndExam): '';

        studentMarks.push(
          {ca_mark: obtainedMark,
          name: student.name,
          reg_no: student.registration_number,
          end_mark: obtainedEndExam,
          total_mark: obtainedMark + obtainedEndExam,
          grade:grade,
          gpa:gpa
        
        }
          )

        // setendMarks((state) => [
        //   ...state,
        //   {
        //     ca_mark: obtainedMark,
        //     name: student.name,
        //     reg_no: student.registration_number,
        //     end_mark: obtainedEndExam,
        //     total_mark: obtainedMark + obtainedEndExam,
        //   },
        // ]);



      });

      setendMarks(studentMarks);
    
    });
  }, [students.length,status]);


  const calculateGrade =(marks)=>{

      if(marks>= gradeStatus[0].aplusMarks)
        return 'A+'
      if(marks>=gradeStatus[0].aMarks )
        return 'A'
      if(marks>= gradeStatus[0].aminMarks)
        return 'A-'
      if(marks>= gradeStatus[0].bplusMarks )
        return 'B+'
      if(marks>= gradeStatus[0].bMarks)
        return 'B'
      if(marks>= gradeStatus[0].bminMarks)
        return 'B-'
      if(marks>= gradeStatus[0].cpluseMarks)
        return 'C+'
      if(marks>= gradeStatus[0].cMarks )
        return 'C'
      if(marks>= gradeStatus[0].cminMarks )
        return 'C-'
      else
        return 'E'

  }

  const calculateGpa =(marks)=>{

      if(marks>= gradeStatus[0].aplusMarks)
        return '4'
      if(marks>=gradeStatus[0].aMarks )
        return '4'
      if(marks>= gradeStatus[0].aminMarks)
        return '3.7'
      if(marks>= gradeStatus[0].bplusMarks )
        return '3.3'
      if(marks>= gradeStatus[0].bMarks)
        return '3'
      if(marks>= gradeStatus[0].bminMarks)
        return '2.7'
      if(marks>= gradeStatus[0].cpluseMarks)
        return '2.3'
      if(marks>= gradeStatus[0].cMarks )
        return '2'
      if(marks>= gradeStatus[0].cminMarks )
        return '1.5'
      else
        return '0'

  }

  const OnModuleChange = (event) => {
    const selectedModule = event.target.value;

    // setModuleBatch({[name]:value})


    setAssessments(assessmentList.filter((x) => x.moduleId === selectedModule))
    // setStudents(studentlist.filter(x => x.assessments.map((z) => z.moduleId === selectedModule)));

    setStudents(studentlist.map((element) =>{

      return {...element,status:element.batch===batch, lolist:element.lolist.filter((subElement) => subElement.moduleId === selectedModule),
      assessments:element.assessments.filter((subElement) => subElement.moduleId === selectedModule)
      }
    }))

    setGradeStatus(allModules.filter((x) => x.id === selectedModule).map(z => z.grade))

    console.log("grade Details>>>>>>>>", JSON.stringify(gradeStatus))



  //  console.log("Count goes here >>>>>>>>>>>>>", count);
  // console.log("this is the new batch and module >>>>>", JSON.stringify(students,null,4))


  setStatus(false);

  };

  const onBatchChange = (event) => {

    setBatch(event.target.value);
    setStatus(true);

  }

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
            name="batchDetails"
             onChange={onBatchChange}
          >
            <MenuItem value="" disabled>
              Batch
            </MenuItem>
            {batchInfo.map(([batch]) => (
              <MenuItem value={batch}>
                {batch}
              </MenuItem>
            ))}
          </Select>

         { status&&<Select
            value=""
            displayEmpty
            style={{ width: "400px", margin: "20px" }}
            variant="outlined"
            name="moduleDetails"
             onChange={OnModuleChange}
          >
            <MenuItem value="" disabled>
              Module
            </MenuItem>
            {module.map(([id,module_name]) => (
              <MenuItem value={id}>
                {module_name}
              </MenuItem>
            ))}
          </Select>}
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
                style={{ fontWeight: "520", fontSize: "19px" }}
                align="center"
              >
                Registration Number
              </TableCell>
              <TableCell
                style={{ fontWeight: "520", fontSize: "19px" }}
                align="center"
              >
                Student Name
              </TableCell>

              {assessments.length > 0 &&
                assessments.map((assessment) => (
                  <TableCell
                    style={{ fontWeight: "520", fontSize: "19px" }}
                    align="center"
                  >
                    {assessment.assessment_name==='End Exam'? "" : assessment.assessment_name}
                  </TableCell>
                ))}
            </TableRow>

            <TableRow>
              <TableCell
                style={{ fontWeight: "520", fontSize: "19px" }}
                align="center"
              ></TableCell>
              <TableCell
                style={{ fontWeight: "520", fontSize: "19px" }}
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
                              style={{ fontWeight: "520", fontSize: "19px" }}
                              align="center"
                            >
                              {lo.lo_code}
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell
                              style={{ fontWeight: "520", fontSize: "19px" }}
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
          </Table>
            
          
          <Table>
          <TableBody>
            <TableCell
              style={{ fontWeight: "520", fontSize: "19px" }}
              align="center"
            ></TableCell>
            <TableCell
              style={{ fontWeight: "520", fontSize: "19px" }}
              align="center"
            ></TableCell>

            {students.length > 0 &&
              students.filter(stu => stu.status===true).slice(0, 1).map((student) => (
                <>
                  {student.lolist &&
                    student.lolist.map((lo) => (
                      <TableCell
                        style={{ fontWeight: "520", fontSize: "19px" }}
                        align="center"
                      >
                        {lo.lo_code}
                      </TableCell>
                    ))}
                </>
              ))}

            {students.length > 0 &&
              students.filter(stu => stu.status===true).map((student) => (
                <TableRow>
                  <TableCell align="center">
                    {student.registration_number}
                  </TableCell>

                  <TableCell align="center">{student.name}</TableCell>

                  {student.lolist &&
                    student.lolist.map((lo) => (
                      <TableCell align="center">{lo.student_marks}</TableCell>
                    ))}
                </TableRow>
              ))}

            <TableCell
              style={{ fontWeight: "520", fontSize: "19px" }}
              align="center"
            >
              Registration Number
            </TableCell>
            <TableCell
              style={{ fontWeight: "520", fontSize: "19px" }}
              align="center"
            >
              Student Name
            </TableCell>
            <TableCell
              style={{ fontWeight: "520", fontSize: "19px" }}
              align="center"
            >
              CA Marks
            </TableCell>
            <TableCell
              style={{ fontWeight: "520", fontSize: "19px" }}
              align="center"
            >
              End Exam Marks
            </TableCell>
            <TableCell
              style={{ fontWeight: "520", fontSize: "19px" }}
              align="center"
            >
              Total Marks
            </TableCell>
            <TableCell
              style={{ fontWeight: "520", fontSize: "19px" }}
              align="center"
            >
              Grade
            </TableCell>
            <TableCell
              style={{ fontWeight: "520", fontSize: "19px" }}
              align="center"
            >
              GPA
            </TableCell>

            {endMarks.slice(0, students.length).map((i) => (
              <>
                <TableRow>
                  <TableCell align="center">{i.reg_no}</TableCell>

                  <TableCell align="center">{i.name}</TableCell>

                  <TableCell align="center">{i.ca_mark}</TableCell>
                  <TableCell align="center">{i.end_mark}</TableCell>
                  <TableCell align="center">{i.total_mark}</TableCell>
                  <TableCell align="center">{i.grade}</TableCell>
                  <TableCell align="center">{i.gpa}</TableCell>
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

