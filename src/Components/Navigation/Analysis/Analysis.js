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
  TableRow,
} from "@material-ui/core";

import axios from "axios";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

const Analysis = () => {
  const [assessments, setAssessments] = useState([]);
  const [students, setStudents] = useState([]);
  const [lolist, setlolist] = useState({});
  // const [studentlist, setStudentList] = useState({});

  const [trues, setTrues] = useState();
  const [falses, setFalses] = useState();
  const [total, setTotal] = useState();
  const [batchInfo, setBatchInfo] = useState([]);
  const [module, setModule] = useState([]);
  const [studentlist, setStudentList] = useState([]);
  const [status, setStatus] = useState(false);
  const [batch, setBatch] = useState();

  useEffect(() => {
    axios.get("https://obesystemtesting.azurewebsites.net/api/Assessment").then((response) => {
      console.log("This is coming from Assessment ", response.data);
      setAssessments(response.data);
      setlolist(response.data.lolist);
      // setStudentList(response.data.studentlist);
      const uniquemodule = new Map([...(response.data).map(mod=>[mod.module.id,mod.module.module_name])]);
      setModule([...uniquemodule]);

      axios.get("https://obesystemtesting.azurewebsites.net/api/student").then((response) => {
        console.log("This is coming from students ", response.data);
        const uniquebatch = new Map([...(response.data).map(stu=>[stu.batch])]);
      setBatchInfo([...uniquebatch]);
        setStudentList(response.data);

        let falseCounter = 0;
        let counter = 0;

        students.filter(stu => stu.status===true).map((student) => {
          console.log(
            student.lolist.filter((x, i) => {
              return x.status;
            }).length < student.lolist.length
              ? true
              : false
          );
          var sheep = [
            student.lolist.filter((x, i) => {
              return x.status;
            }).length < student.lolist.length
              ? true
              : false,
          ];
          for (var i = 0; i < sheep.length; i++) {
            if (sheep[i] === true) {
              counter += 1;
            } else {
              falseCounter += 1;
            }
          }
        });
        console.log("Counter >>>>>>>>>>>>", counter);
        console.log(" Counter >>>>>>>>>>>>", falseCounter);

        setTrues(falseCounter);
        setFalses(counter);
        setTotal(falseCounter + counter);
      });
    });
  }, [students.length,status]);

  const OnModuleChange = (event) => {
    const selectedModule = event.target.value;

    // // setModuleBatch({[name]:value})


    // setAssessments(assessmentList.filter((x) => x.moduleId === selectedModule))
    // // setStudents(studentlist.filter(x => x.assessments.map((z) => z.moduleId === selectedModule)));

    setStudents(studentlist.map((element) =>{

      return {...element,status:element.batch===batch, lolist:element.lolist.filter((subElement) => subElement.moduleId === selectedModule),
      assessments:element.assessments.filter((subElement) => subElement.moduleId === selectedModule)
      }
    }))

  //  console.log("Count goes here >>>>>>>>>>>>>", count);
  console.log("this is the new batch and module >>>>>", JSON.stringify(students,null,4))



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

      <TableContainer>
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
              Name
            </TableCell>

            {students.length > 0 &&
              students.filter(stu => stu.status===true).slice(0, 1).map((student) => (
                <>
                  {student.lolist &&
                    student.lolist.map((lo) => (
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "18px" }}
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
                      <TableCell align="center">
                        {lo.status ? "Pass" : "Fail"}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div></div>

      <Grid container>
        <Grid item xs={6}>
          <h3 align="center">LO ATTAINMENT</h3>

          <Doughnut
            style={{ width: "100px" }}
            data={{
              datasets: [
                {
                  backgroundColor: ["#7dc96c", "#FF6384"],
                  data: [trues, falses],
                  cutoutPercentage: [50],
                },
              ],

              labels: ["Pass", "Fail"],

              Option: {
                title: {
                  display: true,
                  text: "LO ATTAINMENT",
                  fontSize: 25,
                },
              },
            }}
          />


          
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </div>
  );
};

export default Analysis;
