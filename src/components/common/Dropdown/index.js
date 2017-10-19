import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';

const styles = (theme) => ({
  'btn-root': {
    '&:hover': {
      background: 'transparent'
    }
  },
  root: {
    marginTop: '20px'
  }
})

/**
 * 下拉菜单公共组件
 * 接收prop:
 * items{Array} 下拉菜单的选项
 * @type {Object}
 */
class Dropdown extends Component{
  constructor(props){
    super(props);
    this.state = {
      showMenu: false,
      anchorEl: null,
      selectedIndex: null
    }
  }

  handleHiddenMenu = () => {
    this.setState({
      showMenu: false
    });
  }
  handleBtnHover = (e) => {
    if(this.props.trigger === 'hover') {
      this.setState({
        showMenu: true,
        anchorEl: e.target
      });
    }
  }
  handleBtnClick = (e) => {
    if(this.props.trigger !== 'hover') {
      this.setState({
        showMenu: true,
        anchorEl: e.target
      });
    }
  }
  checkIsSelected = (index) => {
    if(!this.props.selection) {
      return false;
    }
    return index === this.state.selectedIndex || this.props.defaultSelection;
  }
  render(){
    const { props: { classes, color, items, className, text} } = this;
    const btnCls = classNames(classes['btn-root'], className);
    return (
      <Button
        color={color}
        className={btnCls}
        onClick={this.handleBtnClick}
        onMouseOver={this.handleBtnHover}

      >
        {text}
        <ArrowDropDown></ArrowDropDown>
        <Popover
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.showMenu}
          onRequestClose={this.handleHiddenMenu}
          PaperProps={{
            onMouseLeave: () => {
              this.handleHiddenMenu();
            }
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          {items.map((item) => (
            <MenuItem
              key={item.key}
              selected={this.checkIsSelected(item.key)}
              onClick={event => {
                this.setState({
                  selectedIndex: item.key
                });
                item.onClick(event, item.key)
              }}
            >
              {item.text}
            </MenuItem>
          ))}
        </Popover>
      </Button>
    )
  }
}

export default withStyles(styles)(Dropdown);
