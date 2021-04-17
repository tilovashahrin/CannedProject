import React, {useState} from 'react'; 
import {Box, Button, Form} from 'react-bulma-components'; 
import {useHistory} from 'react-router-dom'; 

import './login.css'; 

const {Label, Field, Input} = Form; 

function Login(props){

  const {removePannel} = props; 

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const history = useHistory(); 

  const onLogin = () => {
    // server & client checks 
    history.push('/'); 
    removePannel(); 
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
      <div className='horizontal-line'></div>
      <p>Don't have an account?</p>
      <Button onClick={onSignUp} className="is-outlined is-link">Sign Up</Button>
    </Box>
  </div>
}

export default Login; 