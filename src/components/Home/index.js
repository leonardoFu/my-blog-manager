import logo from '@/logo.svg';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { cyan } from 'material-ui/colors'
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Avatar from 'material-ui/Avatar';
import AccountCircle from 'material-ui-icons/AccountCircle'
import { CLOSE_MENU, OPEN_MENU } from 'constants/ActionTypes';
import { createAction } from 'utils/reducerUtils';
import './home.css';
import AppRoutes from 'routes/appRoutes';
import Menu from 'common/Menu';
import { withRouter } from 'react-router-dom'

const styles = (theme) => ({
  colorPrimary: {
    'background-color': '#2196f3'
  },
  root: {
    width: 'calc(100% - 251px)',
    right: 0,
    animation: 'appBarIn .5s cubic-bezier(0.46, 0.03, 0.52, 0.96)'
  },
  rootClose: {
    width: '100%',
    right: 0,
    animation: 'appBarOut .5s cubic-bezier(0.46, 0.03, 0.52, 0.96) '
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  userAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: cyan[300],
  },
  contentPadding: {
    animation: 'contentPadding .5s cubic-bezier(0.46, 0.03, 0.52, 0.96)',
    'animation-fill-mode': 'forwards'
  },
  contentFull: {
    animation: 'contentFull .5s cubic-bezier(0.46, 0.03, 0.52, 0.96)',
    'animation-fill-mode': 'forwards'
  },
})

class IndexPage extends Component{
  constructor(props){
    super(props);
    this.toogleSideBar = this.toogleSideBar.bind(this);
  }
  toogleSideBar(){
      const { props: { menu, dispatch } } = this;
      dispatch(createAction(menu.open ? CLOSE_MENU : OPEN_MENU));
  }
  render(){

    const { props: { classes, menu } } = this;
    let headerCls = classNames('App-content'
    , { [classes.contentPadding]: menu.open
      , [classes.contentFull]: !menu.open})
    return <div className="App">
      <Menu></Menu>
      <AppBar position="fixed" color="primary" classes={{
        colorPrimary: classes.colorPrimary,
        root: menu.open ? classes.root : classes.rootClose }}>
        <Toolbar>
          <IconButton className={classes.menuButton}
            onClick={this.toogleSideBar}
             color="contrast"
             aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            { menu.appTitle }
          </Typography>
          <Avatar className={classes.userAvatar}>
            <AccountCircle></AccountCircle>
          </Avatar>
        </Toolbar>
      </AppBar>
      <div className={headerCls}>
        {AppRoutes}
      </div>
    </div>
  }
}

export default withRouter(connect(({menu}) => ({menu}))(withStyles(styles)(IndexPage)));
