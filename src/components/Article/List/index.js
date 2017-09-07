import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { createAction } from 'utils/reducerUtils';
import { ARTICLE_LIST_REQUEST } from 'constants/ActionTypes';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableSelection,
  TableRowDetail,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SelectionState,
  SortingState,
  PagingState,
  DragDropContext,
  RowDetailState,
  ColumnOrderState
} from '@devexpress/dx-react-grid';
import { TableCell } from 'material-ui';
import classNames from 'classnames';
import Menu, { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Loading from 'common/Loading'
import cols from 'constants/ArticleCols';
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


class EnhancedTableToolbar extends Component {
  constructor(props) {
    super(props);
    this.showMenu = this.showMenu.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.changeClass = this.changeClass.bind(this);
    this.state = {
      open: false,
      anchorEl: null,
      currentCls: 'all',
      title: '全部文章'
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.options !== this.props.options){
      let selected = false;
      nextProps.options.forEach(v => {
        if(v.id === this.state.currentCls){
          this.setState({
            title: v.name
          })
          selected = true;
        }
      })
      if(!selected) {
        this.setState({
          title: '全部文章',
          currentCls: 'all'
        })
      }
    }
  }
  changeClass(current){
    this.setState({
      currentCls: current,
      open: false
    })
    if(this.props.onClick) {
      this.props.onClick(current === 'all' ? '' : current);
    }
  }
  handleRequestClose(){
    this.setState({
      open: false
    })
  }
  showMenu(e){
    this.setState({
      open: true,
      anchorEl: e.currentTarget
    });
  }
  render(){
    const { numSelected, options = [], classes } = this.props;
    let { state: { anchorEl, open, title, currentCls } } = this;
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
            <Typography type="title">{title}</Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          ) : <IconButton aria-label="Menu" onClick={this.showMenu}>
            <MoreVertIcon />
          </IconButton>}
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onRequestClose={this.handleRequestClose}
            MenuListProps={{
              style: {
                width: 200,
              },
            }}
          >
          <MenuItem key="all" selected={currentCls === 'all'} onClick={this.changeClass.bind(null, 'all')}>
            全部
          </MenuItem>
          {options.map(option => {
            return <MenuItem
              key={option.id}
              selected={option.id === currentCls}
              onClick={this.changeClass.bind(null, option.id)}>
              {`${option.name}(${option.count})`}
            </MenuItem>
          })}
        </Menu>
        </div>

      </Toolbar>
    );
  }
};


EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

class ArticleTable extends Component {
  constructor(props) {
    super(props);
    this.onClassChange = this.onClassChange.bind(this);
    this.state = {
      currentPage: 0,
      selected: [],
      selectedIds: [],
      total: 0,
      data: [],
      selectedCls: null,
      order: 'desc',
      orderBy: 'created_time'
    };

    this.rowTemplate = ({ row }) => <div style = {{ paddingLeft: '48px' }}>{`文章简述：${row.description || ''}`}</div>;
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        data: nextProps.data,
        total: nextProps.total
      })
  }
  onClassChange(classId){
    const { props: { dispatch } } = this;
    let { state: { order, orderBy } } = this;
    dispatch(createAction(ARTICLE_LIST_REQUEST, {
      pageNum: 1,
      order,
      orderBy,
      classId
    }))
  }
  changeSorting = sorting => {
    const { props: { dispatch } } = this;
    dispatch(createAction(ARTICLE_LIST_REQUEST, {
      pageNum: 1,
      order: sorting[0] ? sorting[0].direction : '',
      orderBy: sorting[0] ? sorting[0].columnName : ''
    }))
    this.setState({
      order: sorting[0] ? sorting[0].direction : '',
      orderBy: sorting[0] ? sorting[0].columnName : ''
    });
  }

  onCurrentPageChange = (currentPage) => {
    const { props: { dispatch } } = this;
    let { state: { order, orderBy } } = this;
    dispatch(createAction(ARTICLE_LIST_REQUEST, {
      pageNum: currentPage + 1,
      order: order || '',
      orderBy: orderBy || '',
    }));
    this.setState({
      currentPage,
      selected: []
    })
  }
  onSelectionChange = (selection) => {
    let { state: { data } } = this;
    this.setState({
      selected: selection,
      selectedIds: selection.map(v => data[v].id)
    });
  }
  render(){
    let { state: { selected, data, total, currentPage, selectedIds,  order, orderBy } } = this;
    const { props: { loading, classes: options } } = this;
    return (<div >
        <EnhancedTableToolbar
          numSelected={selected.length}
          selectedIds={selectedIds}
          options={options}
          onClick={this.onClassChange}
        >
        </EnhancedTableToolbar>
        <Paper style = {{ overflowX: 'auto', position: 'relative' }}>
        <Grid
          rows={data}
          columns={cols}
        >
          <ColumnOrderState defaultOrder={['title','articleCls','keywords','pv','created_time','operators']} />
          <DragDropContext
            containerTemplate={() => {}}
            columnTemplate={() => {}}
          />
          <TableView tableCellTemplate={({ row, column, style }) => {
            if (column.name === 'pv') {
              return <TableCell style={{textAlign: column.align, paddingRight: 8, ...style}}>
                {row.pv}
              </TableCell>
            }
            else if (column.name === 'created_time') {
              return <TableCell style={{textAlign: column.align, paddingRight: 8, ...style}}>
                {column.getCellData(row)}
              </TableCell>
            } else if (column.name === 'operators') {
              return <TableCell style={{textAlign: column.align, paddingRight: 24, ...style}}>
                {column.getCellData(row)}
              </TableCell>
            }
            }}
            allowColumnReordering
          />
          <SortingState sorting={[{ columnName: orderBy, direction: order }]} onSortingChange={this.changeSorting}/>
          <PagingState
            pageSize={10}
            totalCount={total}
            onCurrentPageChange={this.onCurrentPageChange}
            currentPage={currentPage}
          />
          <RowDetailState />
          <SelectionState
            selection={selected}
            onSelectionChange={this.onSelectionChange}
          />
          <TableHeaderRow allowSorting allowDragging/>
          <TableRowDetail template={this.rowTemplate}/>
          <TableSelection />
          <PagingPanel />
        </Grid>
        {loading ? <Loading /> : null}
      </Paper>

      </div>
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
    const { props: { list, total, loading, classes, dispatch } } = this;
    return (
      <div>
        <ArticleTable
          data={list}
          total={total || 0}
          loading= {loading}
          dispatch={dispatch}
          classes={classes}
        >
        </ArticleTable>
      </div>
    )
  }
}

const mepStateToProps = ({article}) => ({
  list: article.list,
  total: article.total,
  loading: article.loading,
  classes: article.classes
});

export default connect(mepStateToProps)(Articles);
