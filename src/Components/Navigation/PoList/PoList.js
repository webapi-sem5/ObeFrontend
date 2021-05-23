import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PoList() {
  var [polist, setPolist] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:44333/api/Polist").then((response) => {
      console.log(response);
      setPolist(response.data);
      console.log(response.data);
    });
  }, []);

  const handleDeletePo = (id) => {
    axios
      .delete(`https://localhost:44333/api/polist/${id}`)
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <TableContainer component={Paper}>
      <div style={{ display: "flex" }}>
        <h3 style={{ textAlign: "center", flex: 1 }}>PROGRAMME OUTCOME LIST</h3>

        <div style={{ flex: 0.1 }}>
          <Button href="/poslist/definepo" variant="contained" color="primary">
            {" "}
            Define PO
          </Button>
        </div>
      </div>
      <Table aria-label="collapsible table">
        <TableHead>
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
              Edit
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
                <Button href={`/poslist/edit/${row.id}`}>
                  <EditIcon />
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => handleDeletePo(row.id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
