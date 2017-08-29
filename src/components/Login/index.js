import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel, FormHelperText } from 'material-ui/Form';
import { connect } from 'react-redux';
import background from '../../images/login-background.jpg';
import { LOGIN_REQUEST } from 'constants/action_types';
import { LinearProgress } from 'material-ui/Progress';

const errorTexts = {
  NO_PASS: '请输入密码',
  NO_NAME: '请输入用户名',
  FAILED: '用户名/密码不正确'
}
const styles = (theme) => ({
  'blur-back': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    'background': `url(${background})`,
    'background-size': 'cover',
    transform:'scale(1.1)',
    filter: 'blur(10px)',
    zIndex: -1
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  footer: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    width: '100%',
    color: '#9E9E9E',
    'background-color': 'rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
    zIndex: 10
  },
  'login-wrapper': {
    flex: '1 1 100%',
    display: 'flex',
    position:'relative',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    'background-color': `rgba(179, 229, 252, 0.1)`,
    fontSize: '1rem',
    zIndex: 5,
  },
  formControl: {
    height: 50,
    margin: '15px auto',
  },
  'home-icon': {
    position:'relative',
    fontSize: '2.5rem',
    verticalAlign:'sub',
  },
  form: {
    display:'flex',
    position:'relative',
    top: '-10%',
    width: 300,
    height: 500,
    alignItems: 'start',
    // background: cyan[50],
    borderRadius: 5,
    '& h1': {
      textAlign: 'center',
      fontWeight: 500
    },
  }
})
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rememberMe: false,
      username: '',
      password: '',
      showSnack: false,
      error: {
        username: null,
        password: null
      },
      completed: 0
    };

    this.handleRemember = this.handleRemember.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.changeUserName = this.fieldChange.bind(this, 'username');
    this.changePassWord = this.fieldChange.bind(this, 'password');
    this.closeSnack = this.closeSnack.bind(this);
    this.checkBeforeLogin = this.checkBeforeLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.loginState.success && !nextProps.loginState.requestPedding){
        let error = {
          username: errorTexts.FAILED
        }
        this.setState({
          password: '',
          error
        })
    } else {
      this.setState({
        completed: 0
      })
    }
  }
  fieldChange(fieldName, e){
    this.setState({
      [fieldName]: e.target.value
    })
  }
  closeSnack(){
    this.setState({
      showSnack: false
    })
  }
  checkBeforeLogin(){
    let { state: { password, username }} = this;
    let error = {};
    let result = true;
    if(!password){
      result = false;
      error.password = errorTexts.NO_PASS;
    }
    if(!username){
      result = false;
      error.username = errorTexts.NO_NAME;
    }
    this.setState({
      error
    })
    return result;
  }
  progress = () => {
    const { completed } = this.state;
    if (completed > 100) {
      this.setState({ completed: 100 });
    } else {
      const diff = Math.round((100 - completed) / 5);
      this.setState({ completed: completed + diff });
    }
  };
  handleLogin(){
    if(!this.checkBeforeLogin()) return;
    const { props: { dispatch } } = this;
    this.timer = setInterval(this.progress, 500);

    let action = {
      type: LOGIN_REQUEST,
      payload: this.state
    }

    dispatch(action);
  }
  handleRemember(e, checked){
    this.setState({
      rememberMe: checked
    });
  }
  render() {
    const { props: { classes, loginState } } = this;
    let { state: { error, username, password }} = this;
    return <div>
      <div className = { classes['login-wrapper'] }>
        <div className = { classes.form }>
          <div>
            <h1>
              <span>Welcome</span>
              <Icon color = "primary" className = { classes['home-icon'] }>home</Icon>
            </h1>
            <FormControl fullWidth className = { classes.formControl }>
              <InputLabel htmlFor="username">用户名</InputLabel>
              <Input id = "username"
                value = {username}
                autoFocus = {true}
                error = {error.username ? true : false}
                onChange = {this.changeUserName}>
                </Input>
              {error.username ? <FormHelperText>{error.username}</FormHelperText> : null}
            </FormControl>
            <FormControl fullWidth className = { classes.formControl }>
              <InputLabel htmlFor="password">密码</InputLabel>
              <Input type = "password"
                id = "password"
                value = {password}
                error = {error.password ? true : false}
                onChange = {this.changePassWord}>
                </Input>
                {error.password ? <FormHelperText>{error.password}</FormHelperText> : null}
            </FormControl>
            <FormControlLabel
              control={<Checkbox checked={ this.state.rememberMe }
                onChange = {this.handleRemember}/>}
              label="记住我">
            </FormControlLabel>
            <FormControl fullWidth className = { classes.formControl }>
              <Button  onClick = { this.handleLogin }
                disabled = {loginState.requestPedding}> 登录</Button>
              {loginState.requestPedding
                ? <LinearProgress color="primary" mode="determinate" value={this.state.completed} />
                : null}
            </FormControl>
          </div>
        </div>
      </div>
      <div className = { classes['blur-back'] }></div>
      <div className = { classes.footer }>
        <p>后台管理系统 For 豪爷的小站</p>
        <p>Powered by Leo</p>
      </div>
    </div>
  }
}

const mapStateToProps = (state) =>{
  return {
    loginState: state.login
  }
}
export default connect(mapStateToProps)(withStyles(styles)(Login));
