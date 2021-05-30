import * as React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "../Header/Header.css";
import "./SideBar.css";
import { Link } from "react-router-dom";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AppsIcon from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TableChartIcon from "@material-ui/icons/TableChart";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import logo from "../../Assets/images/logo.png";

const SideBar = (props) => {

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="sidebar__main">
      <List disabePadding>
        <ListItem
          style={{ marginBottom: "30px" }}
          className="firebase, item, itemCategory"
        >
          <div className="sidebar__logo">
            <img
              style={{ height: "150px", marginLeft: "25px" }}
              src={logo}
              alt="logo"
            />
          </div>
        </ListItem>

        <Link style={{ color: "black", textDecoration: "none" }} to="/" onClick={refreshPage}>
        <ListItem button className="item">
          <ListItemIcon className="itemIcon">
            {" "}
            <AccountCircleIcon />{" "}
          </ListItemIcon>
          <ListItemText className={{ primary: "itemPrimary" }}>
            Profile
          </ListItemText>
        </ListItem>
        </Link>

        <Divider className="divider" />

        <React.Fragment key="Information">
          <ListItem className="categoryHeader">
            <ListItemText className={{ primary: "categoryHeaderPrimary" }}>
              Information
            </ListItemText>
          </ListItem>

          <Link style={{ color: "black", textDecoration: "none" }} to="/module">
            <ListItem key="Module" button className="item" >
              <ListItemIcon className="itemIcon">
                <ChromeReaderModeIcon />,
              </ListItemIcon>
              <ListItemText className={{ primary: "itemPrimary" }}>
                Modules
              </ListItemText>
            </ListItem>
          </Link>

          <Link
            style={{ color: "black", textDecoration: "none" }}
            to="/assesment"
          >
            <ListItem key="Assessments" button className="item" >
              <ListItemIcon className="itemIcon">
                <AssignmentIcon />,
              </ListItemIcon>
              <ListItemText className={{ primary: "itemPrimary" }}>
                Assessments
              </ListItemText>
            </ListItem>
          </Link>

          <Link
            style={{ color: "black", textDecoration: "none" }}
            to="/poslist"
          >
            <ListItem key="POs" button className="item" >
              <ListItemIcon className="itemIcon">
                <AppsIcon /> ,
              </ListItemIcon>
              <ListItemText className={{ primary: "itemPrimary" }}>
                POs
              </ListItemText>
            </ListItem>
          </Link>

          <Link
            style={{ color: "black", textDecoration: "none" }}
            to="/loslist"
          >
            <ListItem key="LOs" button className="item" >
              <ListItemIcon className="itemIcon">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText className={{ primary: "itemPrimary" }}>
                LOs
              </ListItemText>
            </ListItem>
          </Link>

          <Link
            style={{ color: "black", textDecoration: "none" }}
            to="/student"
          >
            <ListItem key="Student" button className="item" >
              <ListItemIcon className="itemIcon">
                <GroupAddOutlinedIcon />
              </ListItemIcon>
              <ListItemText className={{ primary: "itemPrimary" }}>
                Students
              </ListItemText>
            </ListItem>
          </Link>

          <Link style={{ color: "black", textDecoration: "none" }} to="/marks">
            <ListItem key="Student Marks" button className="item" >
              <ListItemIcon className="itemIcon">
                <CastForEducationIcon />
              </ListItemIcon>
              <ListItemText className={{ primary: "itemPrimary" }}>
                Student Marks
              </ListItemText>
            </ListItem>
          </Link>

          <Divider className="divider" />
        </React.Fragment>

        <ListItem className="categoryHeader">
          <ListItemText className={{ primary: "categoryHeaderPrimary" }}>
            Reports
          </ListItemText>
        </ListItem>

        <Link
          style={{ color: "black", textDecoration: "none" }}
          to="/normalize"
        >
          <ListItem key="Normalize" button className="item" >
            <ListItemIcon className="itemIcon">
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText className={{ primary: "itemPrimary" }}>
              Normalize
            </ListItemText>
          </ListItem>
        </Link>

        <Link style={{ color: "black", textDecoration: "none" }} to="/analysis">
          <ListItem key="Analysis" button className="item" >
            <ListItemIcon className="itemIcon">
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText className={{ primary: "itemPrimary" }}>
              Analysis
            </ListItemText>
          </ListItem>
        </Link>

        {/* <ListItem
                  key="Test Lab"
                  button
                  className="item">
                  <ListItemIcon className="itemIcon"><PhonelinkSetupIcon /></ListItemIcon>
                  <ListItemText
                    className={{primary: "itemPrimary"}}>
                      <Link style={{color:"black", textDecoration:"none"}} to="/" rel="noopener noreferrer">
                      Test Lab
                      </Link>
                   
                  </ListItemText>
                </ListItem> */}
      </List>
    </div>
  );
};

export default SideBar;
