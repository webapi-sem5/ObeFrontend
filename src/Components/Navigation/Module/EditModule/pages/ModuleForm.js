import { Grid } from "@material-ui/core";
import React from "react";
import Controls from "../Components/controls/Control";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";

const typeofCourseItems = [
  { id: "1", titles: "GPA" },
  { id: "0", titles: "NON-GPA" },
];

const typeofCourseModule = [
  { id: "General Elective", titles: "General Elective" },
  { id: "Technical Elective", titles: "Technical Elective" },
  { id: "Compulsory Modules", titles: "Compulsory Modules" },
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
];

function EmpolyeeForm({ moduleId }) {
  const [module, setModule] = useState({});

  useEffect(() => {
    axios.get(`https://localhost:44333/api/module/${moduleId}`).then((res) => {
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",res.data);
      setModule(res.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      ...module,
    };

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);

    axios
      .put(`https://localhost:44333/api/module/${moduleId}`, data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModule({ ...module, [name]: value });
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
            onChange={handleInputChange}
            name="module_name"
            label="Module Title"
            value={module.module_name}
          />
          <Controls.Input
            label="Module Code"
            onChange={handleInputChange}
            name="module_code"
            value={module.module_code}
          />
          <Controls.Input
            label="Semester"
            name="semester"
            value={module.semester}
          />
          <Controls.Input
            label="Lecturer"
            onChange={handleInputChange}
            name="lecturer"
            value={module.lecturer}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="gpa"
            label="GPA/Non-GPA"
            value={module.gpa}
            items={typeofCourseItems}
          />

          <Controls.RadioGroup
            onChange={handleInputChange}
            name="module_type"
            label="Type of Module"
            value={module.module_type}
            items={typeofCourseModule}
          />

          <Controls.Select
            onChange={handleInputChange}
            name="department"
            label="Department"
            value={module.department}
            options={getDepartmentCollection}
          />
          <Controls.DatePicker
            onChange={handleInputChange}
            name="date"
            label="Date"
            value={module.date}
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
