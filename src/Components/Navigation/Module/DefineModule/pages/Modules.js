import React from "react";
import ModuleForm from "./ModuleForm";
import PageHeader from "../Components/PageHeader";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { Paper, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

function Module() {
  const classes = useStyle();
  return (
    <>
      <PageHeader
        title="Module"
        subTitle="Module Details & Information"
        icon={<LibraryBooksIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <ModuleForm />
      </Paper>
    </>
  );
}

export default Module;
