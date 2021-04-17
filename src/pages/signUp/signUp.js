import React, {Component} from 'react'; 
import {Form, Button} from 'react-bulma-components'; 
import $ from 'jquery'; 
import './signUp.css'; 
const {Field, Input, Label} = Form; 

class SignUp extends Component{

  constructor(props){
    super(props); 
    this.state = {
      username: '',
      email: '', 
      password: '', 
      verifyPassword: ''
    };
    this.onSubmission = this.onSubmission.bind(this);  
  }

  updatUsername(e){
    if (e.target.value){
      this.setState({username: e.target.value}); 
    }
    else{
      this.setState({username: ''}); 
    }
  }

  updateField(e){
    if (e.target.value){
      this.setState({[e.target.name]: e.target.value}); 
    }
    else{
      this.setState({[e.target.name]: ''}); 
    }
  }

  onSubmission(){
    let success = true; 

    if (!(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email))){
      $('#email-help').removeClass('hide')
      $('.email-field').addClass('is-danger'); 
      $('.email-field').removeClass('is-success'); 
      success = false; 
    }
    else{
      $('.email-field').addClass('is-success'); 
      $('.email-field').removeClass('is-danger'); 
      $('#email-help').addClass('hide')
    } 

    if (!new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/).test(this.state.password)){
      $('.password-field').addClass('is-danger');
      $('.password-field').removeClass('is-success'); 
      $('#password-help').removeClass('hide')
      success = false; 
    }
    else{
      $('.password-field').addClass('is-success'); 
      $('.password-field').removeClass('is-danger');
      $('#password-help').addClass('hide')
    }

    if (this.state.verifyPassword !== this.state.password){
      success = false; 
      $('#verify-help').removeClass('hide')
      $('.verify-field').addClass('is-danger'); 
      $('.verify-field').removeClass('is-success'); 
    } 
    else if (success){
      $('.verify-field').addClass('is-success'); 
      $('.verify-field').removeClass('is-danger'); 
      $('#verify-help').addClass('hide')
    }

    if (success){
      // send info to the backend
    }

  }


  render(){
    return <div className="signup-page">
      <div className="signup-form">
        <Field>
          <Label>
            Username: 
          </Label>
          <Input 
            placeholder='Joe Shmoe'
            name='username' 
            onChange={(e) => this.updateField(e)} 
            value={this.state.username}/>
        </Field>
        
        <Field>
          <Label>
            Email: 
          </Label>
          <Input 
            className="email-field" 
            name='email'
            type='email' 
            placeholder='example@mail.com' 
            onChange={(e) => this.updateField(e)} 
            value={this.state.email}></Input>    
          <p id="email-help" className="hide help is-danger">Please enter a valid email address.</p>
        </Field>

        <Field>
          <Label>
            Create Password: 
          </Label>
          <Input 
            className="password-field" 
            name='password'
            type='password' 
            onChange={(e)=> this.updateField(e)} 
            value={this.state.password}></Input>
          <p id="password-help" className="hide help is-danger">Please enter a valid password. <br/> Valid passwords contain at least 1 upper and lowercase letter and number. Minimum length is 8 characters long.</p>
        </Field>

        <Field>
          <Label>
            Verify Password: 
          </Label>
          <Input 
            className="verify-field" 
            name='verifyPassword'
            type='password' 
            onChange={(e) => this.updateField(e)} 
            value={this.state.verifyPassword}></Input>
          <p id="verify-help" className="hide help is-danger">Passwords do not match.</p>
        </Field>
        <Field>
          <Button onClick={this.onSubmission}>
            Sign Up!
          </Button>
        </Field>
      </div>
    </div>
  }
}

export default SignUp; 