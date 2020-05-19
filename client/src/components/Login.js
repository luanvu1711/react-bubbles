import React, {useState} from "react";
import {axiosWithAuth} from '../util/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [cred, setCred] = useState({
    credentials: {
      username: "",
      password: ""
    }
  });

  const handleChange = (e) => {
    setCred({
      credentials: {
        ...cred.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
    .post('/login', cred.credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      props.history.push('/bubbles');
    })
    .catch(err => {
      console.log('Err is: ', err)
    })
    .finally(() => {
      window.location.reload();
    })
  }
  return (
    <>
      <form onSubmit={login}>
        <input 
        type="text"
        name="username"
        placeholder="Username"
        value={cred.credentials.username}
        onFocus={e => e.target.placeholder = ''}
        onBlur={e => e.target.placeholder = 'Username'}
        onChange={handleChange}
        />

        <input 
        type="text"
        name="password"
        placeholder="Password"
        value={cred.credentials.password}
        onFocus={e => e.target.placeholder = ''}
        onBlur={e => e.target.placeholder = 'Password'}
        onChange={handleChange}
        />
      <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
