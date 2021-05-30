import React from "react";
import { useState } from "react";
import "./DefineLo.css";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import * as yup from "yup";
import { withFormik } from "formik";

const validationsForm = {
  Lo_code: yup.string().required("Required"),
  Lo_name: yup.string().required("Required"),
  description: yup.string().required("Required"),
  Weight: yup.string().required("Required")
  
};

function DefineLo(props) {
  const {
    touched,
    errors,
    handleBlur,
  } = props;


  const [LoCode, setLoCode] = useState("");
  const [LoName, setLoName] = useState("");
  const [Description, setDescription] = useState("");
  const [Weight, setWeight] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Lo_code: LoCode,
      Lo_name: LoName,
      Description: Description,
      Weight: parseFloat(Weight),
    };
    console.log(data);

    axios.post("https://obesystem.azurewebsites.net/api/Lolist", data).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="definelo_main">
        <div style={{ display: "flex" }}>
          <TextField
            style={{ flex: 0.1 }}
            label="LO Code"
            name='Lo_code'
            id="outlined-start-adornment"
            className=""
            name="Lo_code"
            onChange={(e) => setLoCode(e.target.value)}
            variant="outlined"
            onBlur={handleBlur}
            helperText={touched.Lo_code ? errors.Lo_code : ""}
            error={touched.Lo_code && Boolean(errors.Lo_code)}
          />

          <TextField
            style={{ flex: 0.9 }}
            label="LO Name"
            name="Lo_name"
            id="outlined-start-adornment"
            className=""
            fullWidth
            variant="outlined"
            onChange={(e) => setLoName(e.target.value)}
            onBlur={handleBlur}
            helperText={touched.Lo_name ? errors.Lo_name : ""}
            error={touched.Lo_name && Boolean(errors.Lo_name)}
          />

          <TextField
            style={{ flex: 0.2 }}
            label="Weight"
            name="Weight"
            id="outlined-start-adornment"
            className=""
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            helperText={touched.Weight ? errors.Weight : ""}
            error={touched.Weight && Boolean(errors.Weight)}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <FormControl
          fullWidth
          className=""
          variant="outlined"
          style={{ marginTop: "20px" }}
        >
          <InputLabel
            name="Description"
            htmlFor="outlined-adornment-amount"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Description
          </InputLabel>
          <OutlinedInput
            onChange={(e) => setDescription(e.target.value)}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
      </div>
    </form>
  );
}

const DefineLoForm = withFormik({
  validationSchema: yup.object().shape(validationsForm),
})(DefineLo);

export default DefineLoForm;
