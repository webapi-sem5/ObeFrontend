import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default function AssignedPo(props) {
  var [polist, setPolist] = useState([]);
  const [clicked, setclicked] = useState(false);
  const [deleted, setdeleted] = useState(false);

  let loid = props.match.params.id;

  useEffect(() => {
    axios.get("https://localhost:44333/api/Polist").then((response) => {
      console.log(response);
      setPolist(response.data);
      console.log(response.data);
    });
  }, []);

  const handleAssignPo = (id) => {
    const data = {
      lolistid: loid,
      polistid: id,
    };

    setclicked(true);
    console.log(">>>>>>>>>>", data);

    axios
      .post("https://localhost:44333/api/LolistPos", data)
      .then((response) => {
        console.log(response.data);
      });
  };

  const handleDeletePo = (id) => {
    setdeleted(true);

    axios
      .delete(`https://localhost:44333/api/lolistpos/${id}`)
      .then((response) => {
        console.log(response.data);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setdeleted(false);
    setclicked(false);
  };

  return (
    <TableContainer component={Paper}>
      <div style={{ display: "flex" }}>
        <h3 style={{ textAlign: "center", flex: 1 }}>PROGRAMME OUTCOME LIST</h3>
      </div>
      <Table aria-label="collapsible table">
        <TableHead>
          <Snackbar
            open={clicked}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              Program Outcome assigned successfully
            </Alert>
          </Snackbar>
          <Snackbar
            open={deleted}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              Program Outcome deleted successfully
            </Alert>
          </Snackbar>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
              No
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              PO Code
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              PO Name
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Description
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Add
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {polist.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.po_code}</TableCell>
              <TableCell align="center">{row.po_name}</TableCell>
              <TableCell align="center">{row.description}</TableCell>

              <TableCell align="center">
                <Button
                  onClick={() => handleAssignPo(row.id)}
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => handleDeletePo(row.id)}
                  variant="contained"
                  color="secondary"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
