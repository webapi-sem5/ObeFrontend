import React from "react";
import { useState, useEffect } from "react";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
// import { DataGrid } from '@material-ui/data-grid';

function EditLo(props) {
  var LoId = props.match.params.id;

  const [lo, setLo] = useState({});
  const [Weight, setWeight] = useState("");

  useEffect(() => {
    axios.get(`https://obesystemtesting.azurewebsites.net/api/Lolist/${LoId}`).then((res) => {
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",res.data);
      setLo(res.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      ...lo,
    };
    console.log(data);

    axios
      .put(`https://obesystemtesting.azurewebsites.net/api/Lolist/${LoId}`, data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  const handleInputChange = (event) => {
    const { weight, name, value } = event.target;
    var Weight = parseFloat(event.target.value);

    setLo({ ...lo, [name]: value, weight: Weight });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="definelo_main">
        <div style={{ display: "flex" }}>
          <TextField
            style={{ flex: 0.1 }}
            label="LO Code"
            value={lo.lo_code}
            id="outlined-start-adornment"
            className=""
            name="lo_code"
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            style={{ flex: 0.9 }}
            label="LO Name"
            name="lo_name"
            id="outlined-start-adornment"
            value={lo.lo_name}
            className=""
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />

          <TextField
            style={{ flex: 0.2 }}
            label="Weight"
            name="weight"
            id="outlined-start-adornment"
            //   value={lo.weight}
            className=""
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
        </div>

        <FormControl
          fullWidth
          className=""
          variant="outlined"
          style={{ marginTop: "20px" }}
        >
          <InputLabel
            value={lo.description}
            name="description"
            htmlFor="outlined-adornment-amount"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Description
          </InputLabel>
          <OutlinedInput
            name="description"
            onChange={handleInputChange}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit" variant="contained" color="secondary">
          Update
        </Button>
      </div>
    </form>
  );
}

export default EditLo;
