import React, {Component} from 'react';
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {MENU_ITEMS as data, ITEM_TYPES as types} from 'constants/MenuItems';
import { createAction } from 'utils/reducerUtils';
import { CLOSE_MENU, TOOLBAR_TITLE } from 'constants/ActionTypes'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './menu.css';

const style = {
  list: {
    width: 250,
    flex: 'initial',
  },
  padding: {
    'margin-top': 10
  },
  menu: {
    position: 'fixed',
    height: '100%',
    left: 0,
    background: 'white',
    borderRight: '1px solid #ccc',
    zIndex: 5,
    animation: 'menuOpen .5s cubic-bezier(0.46, 0.03, 0.52, 0.96)'
  },
  menuClose: {
    transform: 'translateX(-100%)',
    animation: 'menuClose .5s cubic-bezier(0.46, 0.03, 0.52, 0.96)'
  }
}

const MenuItem = ({text, icon, link, ...othProps}) => {
  // if(link){
  //   othProps.component = "a";
  //   othProps.href = link;
  // }
  delete othProps.type;
  return <Link to = {link}><ListItem button {...othProps} >
    {icon ? <ListItemIcon>{icon}</ListItemIcon>: null}
      <ListItemText primary={text} />
  </ListItem>
  </Link>
}

class Menu extends Component{
  constructor(props){
    super(props);
    this.renderItems = this.renderItems.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      selectedKey: null
    }
  }
  handleSelect(key){
    this.setState({
      selectedKey: key
    })
  }
  handleClose(){
    const { props: { dispatch } } = this;
    dispatch(createAction(CLOSE_MENU));
  }
  renderItems(items = []){
    const { props: { dispatch } } = this;
    return items.map((item, index) => {
      switch(item.type){
        case types.ITEM:
          return <MenuItem key = {index}
            selected={index === this.state.selectedKey}
            onClick={() => {
              dispatch(createAction(TOOLBAR_TITLE, item.text));
              this.handleSelect.call(null, index)
            }}
            {...item} >
          </MenuItem>
        case types.DIVIDER:
          return <Divider key = {index}></Divider>
        case types.SUB_HEAD:
          return <ListSubheader key = {index}>{item.text}</ListSubheader>
        default:
          return <MenuItem key = {index} {...item}>
          </MenuItem>
      }
    })
  }
  render(){
    let items = this.renderItems(data);

    let { props: { open, classes } } = this;
    let menuCls = classNames([classes.menu], {[classes.menuClose]: !open});
    return (
        <div className={menuCls}>
          <List className={classes.list} classes = {{
            padding: classes.padding
          }}>
            {items}
          </List>
        </div>
      )
  }
}

export default connect(({menu}) => ({open: menu.open}))(withStyles(style)(Menu));
