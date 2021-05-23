import React from "react";
import { useState, useEffect } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { arraySplice } from "redux-form";

function DefinePo(props) {
  const [po, setPo] = useState({});

  let PoId = props.match.params.id;

  useEffect(() => {
    axios.get(`https://localhost:44333/api/Polist/${PoId}`).then((res) => {
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",res.data);
      setPo(res.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();


    const data = { ...po };
    console.log(data);

    axios
      .put(`https://localhost:44333/api/Polist/${PoId}`, data)
      .then((res) => {
        console.log(res.data);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPo({ [name]: value });
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
            name="po_code"
            value={po.po_code}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            style={{ flex: 0.9 }}
            label="PO Name"
            name="po_name"
            id="outlined-start-adornment"
            className=""
            fullWidth
            variant="outlined"
            value={po.po_name}
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
            name="Description"
            htmlFor="outlined-adornment-amount"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Description
          </InputLabel>
          <OutlinedInput
            name="description"
            value={po.description}
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

export default DefinePo;
