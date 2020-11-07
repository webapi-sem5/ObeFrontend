import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import '../Header/Header.css'
import './SideBar.css'
import { Link } from 'react-router-dom';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AppsIcon from '@material-ui/icons/Apps';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TableChartIcon from '@material-ui/icons/TableChart';


const SideBar = (props) => {

    const categories = [
        {
          id: 'Information',
          children: [
            {id: 'Module', icon: <ChromeReaderModeIcon />, active: true, link:"/module"},
            { id: 'Assesments', icon: <AssignmentIcon />, link:"/assesments" },
            { id: 'POs', icon: <AppsIcon /> , link:"/poslist"},
            { id: 'LOs', icon: <DashboardIcon /> , link:"/loslist"},
            { id: 'CA Marks', icon: <CastForEducationIcon /> , link:"/camarks"},

            // {
            //   id: 'Information',
            //   icon: <SettingsInputComponentIcon />,
            // },
          ],
        },
        {
          id: 'Reports',
          children: [
            { id: 'Normalize', icon: <TableChartIcon />, link:"/normalize" },
            { id: 'Analysis', icon: <EqualizerIcon />, link:"/analysis" },
            { id: 'Test Lab', icon: <PhonelinkSetupIcon />, link:"/" },
          ],
        },
      ];
   
  
    return (

      <div className="sidebar__main">
           
        <List disabePadding>

          <ListItem style={{marginBottom: "30px"}} className="firebase, item, itemCategory">
              <div className="sidebar__logo">
                    <img style={{height:"150px", marginLeft:"25px"}} src="https://lh3.googleusercontent.com/proxy/pkhCWzB0-b_XB42uW2HnuVUygV3OEqK0rvQ9HLWK6eru2oAbqWyblIFCOti_WpnWLjt58NgZnEvATIbavjdwag" alt=""/>
              </div>
          </ListItem>

          {/* <ListItem className="item, itemCategory">
            <ListItemIcon className="itemIcon">
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText
              className= {{primary : "itemPrimary"}} >
              Profile
            </ListItemText>
          </ListItem> */}

                <ListItem
                  button
                  className="item">
                  <ListItemIcon className="itemIcon"> <AccountCircleIcon /> </ListItemIcon>
                  <ListItemText
                    className={{primary: "itemPrimary"}}>
                    Profile
                  </ListItemText>
                </ListItem>

          {categories.map(({ id, children }) => (
            <React.Fragment key={id}>

              <ListItem className="categoryHeader">
                <ListItemText
                  className={{primary: "categoryHeaderPrimary"}}>
                  {id}
                </ListItemText>
              </ListItem>

              {children.map(({ id: childId, icon, active,link }) => (
                  
                <ListItem
                  key={childId}
                  button
                  className="item">
                  <ListItemIcon className="itemIcon">{icon}</ListItemIcon>
                  <ListItemText
                    className={{primary: "itemPrimary"}}>
                      <Link style={{color:"black", textDecoration:"none"}} to={link}>
                      {childId}
                      </Link>
                   
                  </ListItemText>
                </ListItem>
              ))}
  
              <Divider className="divider" />
            </React.Fragment>
          ))}
        </List>
    
        
      </div>

    );
  }

  export default SideBar;