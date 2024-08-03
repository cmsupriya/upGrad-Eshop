import { React, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    let payload = {
      "username": email,
      "password": password,
    }

    axios.post(
      'http://localhost:8080/api/auth/signin',
      payload,
    ).then(result => {
      localStorage.setItem("token", result.data.token);
      return result.data;
    }).catch(error => {
      return error.message;
    });
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div><LockIcon></LockIcon></div>
        <div>Sign in</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <TextField
          value={email}
          id="filled-error"
          label="Email Address *"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <TextField
          type="password"
          value={password}
          id="filled-error"
          label="Password *"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <Button variant="contained" size="medium" className={'inputBox'} onClick={onButtonClick}>
          SIGN IN
        </Button>
        <Link to='/signup'>Don't hava an account? Sign Up</Link>
      </div>
    </div>
  )
}

export default Login