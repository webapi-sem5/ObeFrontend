import React from "react";
import { useState } from "react";
import "./DefinePo.css";
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
  Po_code: yup.string().required("Required"),
  Po_name: yup.string().required("Required"),
  description: yup.string().required("Required")
  
};

function DefinePo(props) {
  const {
    touched,
    errors,
    handleBlur,
  } = props;

  const [PoCode, setPoCode] = useState("");
  const [PoName, setPoName] = useState("");
  const [Description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  //const [Lolists, setLolists] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Po_code: PoCode,
      Po_name: PoName,
      Description: Description,
      Weight: parseFloat(weight),
    };
    console.log(data);

    axios.post("https://obesystemtesting.azurewebsites.net/api/Polist", data).then((res) => {
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
            label="PO Code"
            id="outlined-start-adornment"
            className=""
            name="Po_code"
            onChange={(e) => setPoCode(e.target.value)}
            variant="outlined"
            onBlur={handleBlur}
            helperText={touched.Po_code ? errors.Po_code : ""}
            error={touched.Po_code && Boolean(errors.Po_code)}
          />

          <TextField
            style={{ flex: 0.9 }}
            label="PO Name"
            name="Po_name"
            id="outlined-start-adornment"
            className=""
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            helperText={touched.Po_name ? errors.Po_name : ""}
            error={touched.Po_name && Boolean(errors.Po_name)}
            onChange={(e) => setPoName(e.target.value)}
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
            name='description'
            onChange={(e) => setDescription(e.target.value)}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            labelWidth={60}
            onBlur={handleBlur}
            helperText={touched.description ? errors.description : ""}
            error={touched.description && Boolean(errors.description)}


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

const DefinePoForm = withFormik({
  validationSchema: yup.object().shape(validationsForm),
})(DefinePo);

export default DefinePoForm;
