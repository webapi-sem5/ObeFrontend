import { Grid, TextField, Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function AssignThreshold(props) {
  const [endMarks, setendMarks] = useState("");
  const [caMarks, setcaMarks] = useState("");
  const [minEndMarks, setminEndMarks] = useState("");
  const [minCaMarks, setminCaMarks] = useState("");
  const [minTotalMarks, setminTotalMarks] = useState("");
  const [minPoMarks, setminPoMarks] = useState("");
  const [minLoMarks, setminLoMarks] = useState("");
  const [minAttendance, setminAttendance] = useState();

  let thresholdId = uuidv4();
  let ModuleId = props.match.params.id;

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      id: thresholdId,
      end_marks: parseInt(endMarks),
      ca_marks: parseInt(caMarks),
      min_end_marks: parseFloat(minEndMarks),
      min_ca_marks: parseFloat(minCaMarks),
      min_total_marks: parseFloat(minTotalMarks),
      min_po_marks: parseFloat(minPoMarks),
      min_lo_marks: parseFloat(minLoMarks),
      min_attendance: parseFloat(minAttendance),
      moduleid: ModuleId,
    };

    console.log(data);

    axios.post("https://localhost:44333/api/threshold", data).then((res) => {
      console.log(res);
      console.log(res.data);
    });

    const dataId = {
      thresholdid: thresholdId,
    };

    axios.put(`https://localhost:44333/api/module/${ModuleId}`, dataId);
  };

  const useStyle = makeStyles((theme) => ({
    root: {
      "& .MuiFormControl-root": {
        width: "80%",
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyle();

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="end_marks"
            label="End Marks"
            onChange={(e) => setendMarks(e.target.value)}
          />
          <TextField
            label="CA Marks"
            name="ca_marks"
            onChange={(e) => setcaMarks(e.target.value)}
          />
          <TextField
            label="Minimum End Marks"
            name="min_end_marks"
            onChange={(e) => setminEndMarks(e.target.value)}
          />
          <TextField
            label="Minimum CA Marks"
            name="min_ca_marks"
            onChange={(e) => setminCaMarks(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Minimum Total Marks"
            name="min_total_marks"
            onChange={(e) => setminTotalMarks(e.target.value)}
          />

          <TextField
            label="Minimum PO Marks"
            name="min_po_marks"
            onChange={(e) => setminPoMarks(e.target.value)}
          />

          <TextField
            label="Minimum LO Marks"
            name="min_lo_marks"
            onChange={(e) => setminLoMarks(e.target.value)}
          />

          <TextField
            label="Minimum Attendance"
            name="min_attendance"
            onChange={(e) => setminAttendance(e.target.value)}
          />

          <div>
            <Button
              type="submit"
              text="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}

export default AssignThreshold;
