import React, { useContext, useState } from "react";
import { Grid, Paper, Typography, TextField, Button, Link } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ruhunu from "./ruhunu1.png";
import axios from "axios";
import { AccountContext } from "./accountContext";

const Signup = () => {

    const {switchToSignin} = useContext(AccountContext)

  const [displayName, setDisplayName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: email,
      username:username,  
      displayName: displayName,
      password: password,
    };

    console.log(user);

    axios
      .post("https://obesystem.azurewebsites.net/api/user/register", user)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
      });
  };

  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };

  const marginTop = { marginTop: 5 };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <img src={ruhunu} alt="logo" />
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField 
          fullWidth label="Name" 
          placeholder="Enter your name" 
          onChange={(e)=> setDisplayName(e.target.value)}
          />
          <TextField 
          fullWidth 
          label="Username" 
          placeholder="Enter username" 
          onChange={(e)=> setUsername(e.target.value)}
          />
        <TextField
            type='email'
            fullWidth
            label="Email"
            placeholder="Enter your email"
            onChange={(e)=> setEmail(e.target.value)}
        />

          <FormControl component="fieldset" style={marginTop}>
            <FormLabel component="legend">Position</FormLabel>
            <RadioGroup
              aria-label="position"
              name="position"
              style={{ display: "initial" }}
            >
              <FormControlLabel
                value="Lecturer"
                control={<Radio />}
                label="Lecturer"
              />
              <FormControlLabel
                value="Staff"
                control={<Radio />}
                label="Staff"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            type='password'
            fullWidth
            label="Password"
            placeholder="Enter password with special character"
            onChange={(e)=> setPassword(e.target.value)}
            error='Enter password with special character'

          />
          <TextField
            fullWidth
            label="Confirm Password"
            placeholder="Confirm your password"
          />
          <FormControlLabel
            control={<Checkbox name="checkedA" />}
            label="I accept the terms and conditions."
          />
          <Button type="submit" variant="contained" color="primary">
            Sign up
          </Button>
          <Typography>
            {" "}
            Do you have an account ?<Link onClick={switchToSignin} >Sign In</Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;
