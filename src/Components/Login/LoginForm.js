import React, { useState } from 'react'
import { AccountContext } from './accountContext';
import Login from './Login';
import Signup from './Signup';

const LoginForm = () => {

    const [active, setActive] = useState("signin");

    const switchToSignup = () =>{
        setActive('signup');

    }
    const switchToSignin = () =>{
        setActive('signin');

    }

    const contextValue = {switchToSignup,switchToSignin}


    return (
      <AccountContext.Provider value={contextValue}>

        <div>
            {active === 'signin' && <Login/>}
            {active === 'signup' && <Signup/>}
        </div>
      </AccountContext.Provider>
    )
}

export default LoginForm
