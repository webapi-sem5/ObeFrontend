import { Grid } from "@material-ui/core";
import React from "react";
import Controls from "../Components/controls/Control";
import { useState } from "react";

import axios from "axios";
import * as yup from "yup";
import { withFormik } from "formik";
import { TextField, makeStyles } from "@material-ui/core";

const validationsForm = {
  moduleName: yup.string().required("Required"),
  code: yup.string().required("Required"),
  semester: yup.string().required("Required"),
  lecturer: yup.string().required("Required"),
  gpa: yup.string().required("Required"),
  type: yup.string().required("Select Module Type"),
  department: yup.string().required("Select a Department"),
};

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
  {
    id: "Interdisciplinary Studies",
    title: "Interdisciplinary Studies",
  },
];

function EmpolyeeForm(props) {
  const {
    touched,
    errors,
    handleBlur,
  } = props;

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

    axios.post("https://obesystem.azurewebsites.net/api/module", data).then((res) => {
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
          <TextField
            name="moduleName"
            label="Module Title"
            onChange={(e) => setModule(e.target.value)}
            variant="outlined"
            onBlur={handleBlur}
            helperText={touched.moduleName ? errors.moduleName : ""}
            error={touched.moduleName && Boolean(errors.moduleName)}
          />
          <TextField
            label="Module Code"
            name="code"
            onChange={(e) => setCode(e.target.value)}
            variant="outlined"
            onBlur={handleBlur}
            helperText={touched.code ? errors.code : ""}
            error={touched.code && Boolean(errors.code)}
          />
          <TextField
            label="Semester"
            name="semester"
            onChange={(e) => setSemester(e.target.value)}
            variant="outlined"
            onBlur={handleBlur}
            helperText={touched.semester ? errors.semester : ""}
            error={touched.semester && Boolean(errors.semester)}
          />
          <TextField
            label="Lecturer"
            name="lecturer"
            onChange={(e) => setLecturer(e.target.value)}
            variant="outlined"
            onBlur={handleBlur}
            helperText={touched.lecturer ? errors.lecturer : ""}
            error={touched.lecturer && Boolean(errors.lecturer)}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="gpa"
            label="GPA/Non-GPA"
            onChange={(e) => setGpa(e.target.value)}
            items={typeofCourseItems}
          />

          <Controls.RadioGroup
            name="type"
            label="Type of Module"
            onChange={(e) => setType(e.target.value)}
            items={typeofCourseModule}
          />

          <Controls.Select
            name="department"
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

const Form = withFormik({
  validationSchema: yup.object().shape(validationsForm),
})(EmpolyeeForm);

export default Form;
