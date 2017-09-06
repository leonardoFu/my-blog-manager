import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import { createAction } from 'utils/reducerUtils';
import { ARTICLE_LIST_REQUEST } from 'constants/ActionTypes';
import classNames from 'classnames';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import columns from 'constants/ArticleCols';
import DeleteIcon from 'material-ui-icons/Delete';
import { Link } from 'react-router-dom';
/**
 * 表头组件，支持访问量的排序
 */
class TableHeader extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event , property);
  }

  render(){
    const { props: { onSelectAll, orderBy, order, selectedNum: num} } = this;
    return (
      <TableHead>
        <TableRow>
          <TableCell checkbox>
            <Checkbox
              indeterminate={num > 0 && num < 5}
              checked={num === 5}
              onChange={onSelectAll}
            />
          </TableCell>
          {columns.map(column => {
            let title = '';
            if(column.numeric){
              title = <TableSortLabel
                active={orderBy === column.id}
                direction={order}
                onClick={this.createSortHandler(column.id)}
              >
                {column.label}
              </TableSortLabel>
            } else {
              title = column.label;
            }

            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                disablePadding={column.disablePadding}
              >
                {title}
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    )
  }
}

const toolbarStyles = theme => {
  console.log(theme.palette);
  return {
    root: {
      paddingRight: 2,
    },
    highlight: {
      color: 'white',
      backgroundColor: theme.palette.accent[200],
    },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
  };
}


let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} 项选中</Typography>
        ) : (
          <Typography type="title">文章列表</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        ) : null}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

class ArticleTable extends Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      orderBy: 'created_time',
      order: 'desc',
      selected: [],
      data: [],
      selectedCls: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.state.data){
      this.setState({
        data: nextProps.data
      })
    }
  }
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleSort(event , property){
    let newOrder = 'desc';
    const { props: { dispatch } } = this;
    let { state: { order, orderBy } } = this;

    if(property === orderBy && newOrder ===order){
      newOrder = 'asc';
    }

    let queryParam = {
      pageNum: 1,
      order: newOrder,
      orderBy: property,
    }
    dispatch(createAction(ARTICLE_LIST_REQUEST, queryParam))
    this.setState({
      order: newOrder,
      orderBy: property
    });
  }

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;
  render(){

    let { state: { data, order, orderBy, selected } } = this;

    return (
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length}>
        </EnhancedTableToolbar>
        <Table>
          <TableHeader
            numSelected={selected.length}
            order = {order}
            orderBy = {orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleSort}
            >
            </TableHeader>
            <TableBody>
            {data.map(n => {
              const isSelected = this.isSelected(n.id);
              let { created_time } = n
              created_time = new Date(created_time);
              let timeStr = `${created_time.getFullYear()}
              -${created_time.getMonth() + 1}
              -${created_time.getDate()}`
              return (
                <TableRow
                  hover
                  onClick={event => this.handleClick(event, n.id)}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex="-1"
                  key={n.id}
                  selected={isSelected}
                >
                  <TableCell checkbox>
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell disablePadding>{n.title}</TableCell>
                  <TableCell>{n.class ? n.class.name : ''}</TableCell>
                  <TableCell>{n.keywords}</TableCell>
                  <TableCell>{n.description}</TableCell>
                  <TableCell numeric>{n.pv}</TableCell>
                  <TableCell numeric>{timeStr}</TableCell>
                  <TableCell><Link to = {`/article/${n.id}`}>编辑</Link></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

class Articles extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { props: { dispatch } } = this;
    dispatch(createAction(ARTICLE_LIST_REQUEST, {
      pageNum: 1,
      order: 'desc',
      orderBy: 'created_time'
    }))
  }
  render(){
    const { props: { list, dispatch } } = this;
    return (
      <div>
        <ArticleTable data={list} dispatch={dispatch}></ArticleTable>
      </div>
    )
  }
}

const mepStateToProps = ({article}) => ({
  list: article.list,
  total: article.total
});

export default connect(mepStateToProps)(Articles);
