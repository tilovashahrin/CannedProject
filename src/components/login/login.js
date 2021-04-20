import React, {useState} from 'react'; 
import {Box, Button, Form} from 'react-bulma-components'; 
import {useHistory} from 'react-router-dom'; 

import './login.css'; 

const {Label, Field, Input} = Form; 

function Login(props){

  const {removePannel} = props; 

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const history = useHistory(); 

  const onLogin = () => {
    fetch('http://localhost:8080/account/signin', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }), 
      credentials: 'include'
    })
    .then(response => response.json())
    .then((data) => {
      if (data.reqStatus){
        console.log('Login Successful'); 
        history.push('/'); 
        removePannel(); 
        
      }
      else {
        console.log(data); 
        setErrorMessage(data.errorMessage); 
      }
    }); 
  }
  const onSignUp = () => {
    history.push('/signup'); 
    removePannel(); 
  }

  return <div className='login-card'>
    <Box>
      <Field>
        <Label>Email: </Label>
        <Input type='email' placeholder='example@mail.com' onChange={e=> setEmail(e.target.value)} value={email}></Input>
      </Field>
      <Field>
        <Label>Password:</Label>
        <Input type='password' onChange={e => setPassword(e.target.value)} value={password}></Input>
      </Field>
      <Button onClick={onLogin} className="is-outlined is-primary">Log in</Button>
      <p className="help is-danger">{errorMessage}</p>
      <div className='horizontal-line'></div>
      <p>Don't have an account?</p>
      <Button onClick={onSignUp} className="is-outlined is-link">Sign Up</Button>
    </Box>
  </div>
}

export default Login; 