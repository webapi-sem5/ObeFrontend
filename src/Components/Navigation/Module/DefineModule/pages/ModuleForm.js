import { Grid } from "@material-ui/core";
import React from "react";
import Controls from "../Components/controls/Control";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";

const typeofCourseItems = [
  { id: "1", titles: "GPA" },
  { id: "0", titles: "NON-GPA" },
];

const typeofCourseModule = [
  { id: "General Elective", titles: "General Elective" },
  { id: "Technical Elective", titles: "Technical Elective" },
  { id: "Compulsory Modules", titles: "Compulsory Modules" }
];

const getDepartmentCollection = [
  {
    id: "Electrical and Information Engineering",
    title: "Electrical and Information Engineering",
  },
  {
    id: "Civil and Environmental Engineering",
    title: "Civil and Environmental Engineering",
  },
  {
    id: "Mechanical and Manufacturing Engineering",
    title: "Mechanical and Manufacturing Engineering",
  },
  {
    id: "Interdisciplinary Studies",
    title: "Interdisciplinary Studies",
  },
];

function EmpolyeeForm() {
  const [module, setModule] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState("");
  const [gpa, setGpa] = useState("");
  const [semester, setSemester] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Module_name: module,
      Module_code: code,
      Semester: parseInt(semester),
      Lecturer: lecturer,
      Date: date,
      Department: department,
      Gpa: parseInt(gpa) ? true : false,
      Module_type: type,
    };

    console.log(data);

    axios.post("https://localhost:44333/api/module", data).then((res) => {
      console.log(res);
      console.log(res.data);
    });
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
          <Controls.Input
            name="Name"
            label="Module Title"
            onChange={(e) => setModule(e.target.value)}
          />
          <Controls.Input
            label="Module Code"
            name="Code"
            onChange={(e) => setCode(e.target.value)}
          />
          <Controls.Input
            label="Semester"
            name="Semester"
            onChange={(e) => setSemester(e.target.value)}
          />
          <Controls.Input
            label="Lecturer"
            name="Lecturer"
            onChange={(e) => setLecturer(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="Gpa"
            label="GPA/Non-GPA"
            onChange={(e) => setGpa(e.target.value)}
            items={typeofCourseItems}
          />

          <Controls.RadioGroup
            name="Type"
            label="Type of Module"
            onChange={(e) => setType(e.target.value)}
            items={typeofCourseModule}
          />

          <Controls.Select
            name="Department"
            label="Department"
            onChange={(e) => setDepartment(e.target.value)}
            options={getDepartmentCollection}
          />
          <Controls.DatePicker
            name="Date"
            label="Date"
            onChange={(e) => setDate(e.target.value)}
          />


          <div>
            <Controls.Button
              variant="contained"
              color="primary"
              size="large"
              text="submit"
              type="submit"
            />
          </div>
        </Grid>
      </Grid>
    </form>
  );
}

export default EmpolyeeForm;
