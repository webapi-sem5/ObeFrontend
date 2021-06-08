import React, { useContext, useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ruhunu from "./ruhunu1.png";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { AccountContext } from "./accountContext";

const Login = () => {

    const {switchToSignup} = useContext(AccountContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
        email: email,
        password:password

    };

    console.log(user);

    axios.post("https://obesystemtesting.azurewebsites.net/api/user/login", user).then((res) => {
      console.log(res);
      console.log(res.data.token);
      localStorage.setItem('token', res.data.token);
    });
  };

  const paperStyle = {
    padding: 20,
    height: "80vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };
  const headerStyle = { margin: 0 };

  return (
    <form
     onSubmit={handleSubmit}
     >
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <img src={ruhunu} alt="logo" />
            <h2 style={headerStyle}>Sign In</h2>
          </Grid>
          <TextField
            name="email"
            label="Email"
            type='email'
            placeholder="Enter email"
            fullWidth
            required
            onChange={(e)=>setEmail(e.target.value)}

          />
          <TextField
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            onChange={(e)=>setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            
            
          >
            Sign in
          </Button>

          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            {" "}
            Do you have an account ?<Link onClick={switchToSignup} >Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </form>
  );
};

export default Login;
