import React, { useEffect, useState } from "react";
import {
  Grid,
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
  const [studentlist, setStudentList] = useState({});

  const [trues, setTrues] = useState();
  const [falses, setFalses] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    axios.get("https://localhost:44333/api/Assessment").then((response) => {
      console.log("This is coming from Assessment ", response.data);
      setAssessments(response.data);
      setlolist(response.data.lolist);
      setStudentList(response.data.studentlist);

      axios.get("https://localhost:44333/api/student").then((response) => {
        console.log("This is coming from students ", response.data);
        setStudents(response.data);

        let falseCounter = 0;
        let counter = 0;

        students.map((student) => {
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
  }, [students.length]);

  return (
    <div>
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
              students.slice(0, 1).map((student) => (
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
              students.map((student) => (
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
