import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel, FormHelperText } from 'material-ui/Form';
import { LinearProgress } from 'material-ui/Progress';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { Redirect } from 'react-router-dom';
import { LOGIN_REQUEST } from 'constants/action_types';
import styles from './style';
import Cookies from 'js-cookie';
import { SESSION_KEY } from 'constants/server'
import * as errorTexts from 'constants/errorText';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rememberMe: false,
      username: '',
      password: '',
      showSnack: false,
      errorMsg:'',//需要用到toast提醒用户的错误
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
    this.hideErrorMsg = this.hideErrorMsg.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { loginState } = nextProps;
    if(!loginState.success && !loginState.requestPedding){
      // "Failed to fetch"
      if(loginState.error === 'Failed to fetch'){
        this.setState({
          errorMsg: errorTexts.NET_ERROR
        })
      } else {
        let error = {
          username: errorTexts.FAILED
        }
        this.setState({
          password: '',
          error
        })
      }
    } else if(loginState.success){
      let sid = Cookies.get(SESSION_KEY);
      if(this.state.rememberMe) Cookies.set(SESSION_KEY, sid, {expires: 7});
    }

    this.setState({
      completed: 0
    })
  }
  componentWillUnmount() {
    clearInterval(window.timer);
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

  hideErrorMsg(){
    this.setState({
      errorMsg: false
    });
  }
  handleLogin(){
    if(!this.checkBeforeLogin()) return;
    const { props: { dispatch } } = this;
    window.timer = setInterval(this.progress, 500);

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
    let { state: { error, username, password, errorMsg }} = this;
    if(loginState.success){
      return <Redirect to="/" ></Redirect>
    }
    return <div className={classes.fixWrap}>
      <div className={classes['login-wrapper']}>
        <div className={classes.form}>
          <div >
            <h1>
              <span>Welcome</span>
              <Icon color="primary" className={classes['home-icon']}>home</Icon>
            </h1>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="username">用户名</InputLabel>
              <Input id="username"
                value={username}
                autoFocus={true}
                error={error.username ? true : false}
                onChange={this.changeUserName}>
                </Input>
              {error.username ? <FormHelperText>{error.username}</FormHelperText> : null}
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="password">密码</InputLabel>
              <Input type="password"
                id="password"
                value={password}
                error={error.password ? true : false}
                onChange={this.changePassWord}>
                </Input>
                {error.password ? <FormHelperText>{error.password}</FormHelperText> : null}
            </FormControl>
            <FormControlLabel
              control={<Checkbox checked={ this.state.rememberMe }
                onChange={this.handleRemember}/>}
              label="记住我">
            </FormControlLabel>
            <FormControl fullWidth className={classes.formControl}>
              <Button  onClick={this.handleLogin}
                disabled={loginState.requestPedding}>登录</Button>
              {loginState.requestPedding
                ? <LinearProgress classes={{
                  primaryColor: classes.primaryColor
                }}
                 color="primary"
                 mode="determinate"
                 value={this.state.completed} />
                : null}
            </FormControl>
          </div>
        </div>
      </div>
      <div className={classes['blur-back']}></div>
      <div className={classes.footer}>
        <p>后台管理系统 For 豪爷的小站</p>
        <p>Powered by Leo</p>
      </div>
      <Snackbar anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onRequestClose={this.hideErrorMsg}
          message={<span id="message-id">{errorMsg}</span>}
          autoHideDuration={3000}
          open={!!errorMsg}
          action={<IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.hideErrorMsg}>
              <CloseIcon />
            </IconButton>}  >
      </Snackbar>
    </div>
  }
}

const mapStateToProps = (state) =>{
  return {
    loginState: state.login
  }
}
export default connect(mapStateToProps)(withStyles(styles)(Login));
