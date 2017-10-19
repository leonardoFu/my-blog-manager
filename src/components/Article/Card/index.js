import React, { Component } from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Dropdown from 'common/Dropdown';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';
const styles = (theme) => ({
    spacer: {
      'flex': '1 1 100%',
    },
    title: {
      flex: '0 0 auto'
    },
    actions: {
      color: theme.palette.secondary[900],
    },
    'preview-root': {
      backgroundColor: theme.palette.secondary[300],
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.secondary[500],
      }
    },
    textContainer: {
    },
    textArea: {
      width: '96%',
      height: '600px',
      left: '50%',
      border: '1px solid #ccc',
      borderRadius: 5,
      overflowY: 'scroll',
      resize: 'none',
      fontSize: '1rem',
      padding: 15,
      '&:focus': {
        outline: 'none'
      }
    },
    'card-actions-root': {
      justifyContent: 'flex-end',
      paddingRight: 20
    }
});

class ArticleCard extends Component{
  constructor(props){
    super(props);
    this.state = {
      isPreview : false,
      articleText: ''
    }
  }
  handleTextKeydown = (e) => {
    let { state: { articleText } } = this;
    switch(e.keyCode) {
      case 9:
        e.preventDefault();
        articleText += '\t';
        this.setState({
          articleText
        });
        break;
      default:

    }

  }
  handleTextChange = (e) => {
    let { state: { articleText } } = this;
    if(e.nativeEvent.data) {
      articleText += e.nativeEvent.data
    } else {
      switch (e.nativeEvent.inputType) {
        case 'deleteContentBackward':
          articleText = articleText.slice(0, -1);
          break;
        case 'insertLineBreak':
          articleText = `${articleText}\n`;
          break;
        default:

      }
    }
    this.setState({
      articleText: articleText
    })
  }
  handleEdit = () => {
    this.setState({
      isPreview: false
    });
  }
  handlePreview = () => {
    this.setState({
      isPreview: true
    });
  }
  render(){
    const { props: { classes } } = this;
    let { state: { isPreview, articleText } } = this;
    return (
      <div>
        <Toolbar>
          <div className={classes.title}>
            <Typography type="title" color="inherit">
              文章编辑
            </Typography>

          </div>
          <div className={classes.spacer}>
          </div>
          <div className={classes.actions}>
            {isPreview
              ? <Button
                 raised
                 color="primary"
                 onClick={this.handleEdit}
                >
                  编辑
                </Button>
              : <Button
                 raised
                 classes={{
                   root: classes['preview-root']
                 }}
                 onClick={this.handlePreview}
                >
                  预览
                </Button>
            }
          </div>
        </Toolbar>
        <Card>
          <CardContent className={classes.textContainer}>
            <TextField
              id="full-width"
              label="文章标题"
              style={{width: '50%'}}
              placeholder="Placeholder"
              margin="normal"
            />
            <TextField
              id="full-width"
              label="文章描述"
              placeholder="Placeholder"
              fullWidth

              margin="normal"
            />
            <div style={{display: 'flex'}}>
              <div className={classes.spacer}>
                <Dropdown
                  text="插入"
                  trigger="hover"
                  items={[{text:'123', key: '23'}]}/>
                <Dropdown
                  text="格式"
                  trigger="hover"
                  items={[{text:'12313131', key: '13'}]}/>
              </div>
              <div className={classes.actions}>
              </div>
            </div>
            <textarea
              id="article-text"
              className={classes.textArea}
              value={articleText}
              onKeyDown={this.handleTextKeydown}
              onChange={this.handleTextChange}
            >
            </textarea>
          </CardContent>
          <div style={{textAlign: 'right', paddingRight: '2.3%'}}>
            <FormControlLabel
              control={
                <Switch
                  aria-label="checkedB"
                />
              }
              label="发布"
            >
            </FormControlLabel>
          </div>
          <CardActions classes={{
            root: classes['card-actions-root']
          }}>

            <Button dense color="accent">
              不保存返回
            </Button>
            <Button dense color="primary">
              保存
            </Button>
          </CardActions>
        </Card>

      </div>
    )
  }
}

export default withStyles(styles)(ArticleCard);
