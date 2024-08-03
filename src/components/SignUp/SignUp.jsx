import { React, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css'
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const SignUp = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [contactNumberError, setContactNumberError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    let payload = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
      "contactNumber": contactNumber
    }

    axios.post(
      'http://localhost:8080/api/auth/signup',
      payload,
    ).then(result => {
      return result.data;
    }).catch(error => {
      return error.message;
    });
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div><LockIcon></LockIcon></div>
        <div>Sign up</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <TextField
          value={firstName}
          id="filled-error"
          label="First Name *"
          onChange={(ev) => setFirstName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{firstNameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <TextField
          value={lastName}
          id="filled-error"
          label="Last Name *"
          onChange={(ev) => setLastName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{lastNameError}</label>
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
        <TextField
          type="password"
          value={confirmPassword}
          id="filled-error"
          label="Confirm Password *"
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{confirmPasswordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <TextField
          value={contactNumber}
          id="filled-error"
          label="Contact Number *"
          onChange={(ev) => setContactNumber(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{contactNumberError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <Button variant="contained" size="medium" className={'inputBox'} onClick={onButtonClick}>
          SIGN UP
        </Button>
        <Link to='/login'>Don't hava an account? Sign Up</Link>
      </div>
    </div>
  )
}

export default SignUp