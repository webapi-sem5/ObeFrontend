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
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

function LoList() {
  var [lolist, setLolist] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:44333/api/Lolist").then((response) => {
      console.log(response);
      setLolist(response.data);
      console.log(response.data);
    });
  }, []);

  const handleDeleteLo = (id) => {
    axios
      .delete(`https://localhost:44333/api/lolist/${id}`)
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <TableContainer component={Paper}>
      <div style={{ display: "flex" }}>
        <h3 style={{ textAlign: "center", flex: 1 }}>LEARNING OUTCOME LIST</h3>

        <div style={{ flex: 0.1 }}>
          <Button href="/loslist/definelo" variant="contained" color="primary">
            {" "}
            Define LO
          </Button>
        </div>
      </div>

      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              No
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              LO Code
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              LO Name
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
              Weight
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
             Assigned PO
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "18px" }}
              align="center"
            >
              PO
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
          {lolist.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.lo_code}</TableCell>
              <TableCell align="center">{row.lo_name}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.weight}</TableCell>
              {row.polist.map(po => (


                <TableCell align="center">{po.po_code}</TableCell>
              )) }
              <TableCell align="center">
                <Button
                  href={`/loslist/definepo/${row.id}`}
                  variant="contained"
                  color="secondary"
                >
                  Assign PO
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button href={`/loslist/edit/${row.id}`}>
                  <EditIcon />
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => handleDeleteLo(row.id)}>
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

export default LoList;
