import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
const styles = (theme) => ({
  list: {
    width: '70%'
  }
})

class Articles extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { props: { classes } } = this;
    let contentCls = classNames('wrapper', classes.list);

    return  (
      <div className = {contentCls}>
        <Typography type="display3" gutterBottom>
          文章列表
      </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Articles);
