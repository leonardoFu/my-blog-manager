import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {MENU_ITEMS as data, ITEM_TYPES as types} from 'constants/MenuItems';
import { createAction } from 'utils/reducerUtils';
import { CLOSE_MENU } from 'constants/action_types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
const style = {
  list: {
    width: 250,
    flex: 'initial',
  },
}

const MenuItem = ({text, icon, link, ...othProps}) => {
  if(link){
    othProps.component = "a";
    othProps.href = link;
  }
  delete othProps.type;
  return <ListItem button {...othProps}>
    {icon ? <ListItemIcon>{icon}</ListItemIcon>: null}
    <ListItemText primary={text} />
  </ListItem>
}

class Menu extends Component{
  constructor(props){
    super(props);
    this.renderItems = this.renderItems.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillReceiveProps(nextProps) {
  }
  handleClose(){
    const { props: { dispatch } } = this;
    dispatch(createAction(CLOSE_MENU));
  }
  renderItems(items = []){
    return items.map((item, index) => {
      switch(item.type){
        case types.ITEM:
          return <MenuItem key = {index} {...item}>
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
    return (
      <Drawer
        open={open}

        onRequestClose={this.handleClose}
      >
        <List className = {classes.list} >
          {items}
        </List>

      </Drawer>)
  }
}

export default connect(({menu}) => ({open: menu.open}))(withStyles(style)(Menu));
