import React from 'react';
import './Login.css';

const LoginComponent = (props) => {
    let userName;
    let password;
    return (<div className="loginComponentParent">
        <input type="text" ref={(input) => userName = input} placeholder="Enter Username"></input>
        <input type="password" ref={(input) => password = input} placeholder="Enter Password"></input>
        <div><button onClick={() => props.loginClicked(userName.value, password.value)}>Login</button></div>
    </div>)
}

export default LoginComponent;