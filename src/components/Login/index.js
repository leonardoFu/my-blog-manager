import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles'
import { lightBlue } from 'material-ui/colors'
import { login } from '../../service/user';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const styles = (theme) => ({
  wrapper: {
    flex: '1 1 100%',
    display: 'flex',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: lightBlue[100],
    fontSize: '1rem'
  },
  formControl: {
    height: 50,
    margin: '15px auto',
  },
  form: {
    display:'flex',
    width: 300,
    height: 400,
    alignItems: 'center',
    // background: cyan[50],
    borderRadius: 5,
    '& h1': {
      textAlign: 'center',
      fontWeight: 500
    }
  }
})
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rememberMe: false,
      username: '',
      password: '',
    };

    this.handleRemember = this.handleRemember.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.changeUserName = this.fieldChange.bind(this, 'username');
    this.changePassWord = this.fieldChange.bind(this, 'password');
  }

  fieldChange(fieldName, e){
    this.setState({
      [fieldName]: e.target.value
    })
  }
  handleLogin(){
    login(this.state);
  }
  handleRemember(e, checked){
    this.setState({
      rememberMe: checked
    });
  }
  render() {
    const { props: { classes } } = this;
    return <div className = { classes.wrapper }>
      <div className = { classes.form }>
        <div>
          <h1><Icon color = "primary">home</Icon><span>博客后台管理</span></h1>
          <FormControl fullWidth className = { classes.formControl }>
            <InputLabel htmlFor="username">用户名</InputLabel>
            <Input id = "username" onChange = {this.changeUserName}></Input>
          </FormControl>
          <FormControl fullWidth className = { classes.formControl }>
            <InputLabel htmlFor="password">密码</InputLabel>
            <Input type = "password" id = "password" onChange = {this.changePassWord}></Input>
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={this.state.rememberMe} onChange = {this.handleRemember}/>}
            label="记住我">
          </FormControlLabel>
          <FormControl fullWidth className = { classes.formControl }>
            <Button raised onClick = {this.handleLogin}> 登录</Button>
          </FormControl>
        </div>
      </div>
    </div>
  }
}
export default withStyles(styles)(Login);
