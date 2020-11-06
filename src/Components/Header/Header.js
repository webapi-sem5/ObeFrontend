import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import React from 'react';
import './Header.css';



const Header =(props) =>{

    const categories = {

          children: [
        
            { dp: 'Electrical and Information Engineering', lec:'DR.M.R Udawalpola',dat:'2020.06.11'},
        

          ],
       
     
    };


    return (
        
      <div className="header__main">
          <List>
              <div className="header__left">
               
                <ListItem> 
                  <ListItemText>
                    Department : 
                  </ListItemText>
                  <ListItemText>
                       Electrical and Information Engineering
                  </ListItemText>
              </ListItem>

              <ListItem>
                  <ListItemText>
                    Lecturer : 
                  </ListItemText>
                  <ListItemText>
                       DR M.R Udawalpola
                  </ListItemText>
              </ListItem>

              </div>

              <div className="header__right">
              <ListItem>
                  <ListItemText>
                    Date : 
                  </ListItemText>
                  <ListItemText>
                       11.06.2020
                  </ListItemText>
              </ListItem>

              <ListItem>
                  <ListItemText>
                   Semester : 
                  </ListItemText>
                  <ListItemText>
                       5
                  </ListItemText>
              </ListItem>
              </div>
               
          </List>
          
      
     
     
    </div>
    )
}

export default Header;
