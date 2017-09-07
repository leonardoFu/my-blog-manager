import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { createAction } from 'utils/reducerUtils';
import {
  ARTICLE_LIST_REQUEST,
  DEL_ARTICLES_REQUEST,
  CLEAR_ARTICLES_ERROR
} from 'constants/ActionTypes';
import Dialog, {
  DialogActions,
  DialogTitle
} from 'material-ui/Dialog';
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
import Button from 'material-ui/Button';
import { TableCell } from 'material-ui';
import Snackbar from 'material-ui/Snackbar';
import classNames from 'classnames';
import Menu, { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import CloseIcon from 'material-ui-icons/Close';
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
      backgroundColor: theme.palette.secondary[400],
    },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.secondary[900],
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
    this.showDelDialog = this.showDelDialog.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.changeClass = this.changeClass.bind(this);
    this.handleDelArticles = this.handleDelArticles.bind(this);
    this.state = {
      openClsSelection: false,
      openDelDialog: false,
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
      openClsSelection: false
    })
    if(this.props.onClick) {
      this.props.onClick(current === 'all' ? '' : current);
    }
  }
  handleDelArticles(){
    const { props: { selectedIds } } = this;
    let { state: { currentCls } } = this;
    this.setState({
      openDelDialog: false
    }, () => {
      this.props.onDelArticles(selectedIds, currentCls === 'all' ? '' : currentCls )
    });

  }
  handleRequestClose(){
    this.setState({
      openClsSelection: false,
      openDelDialog: false
    })
  }
  showDelDialog(){
    this.setState({
      openDelDialog: true
    })
  }
  showMenu(e){
    this.setState({
      openClsSelection: true,
      anchorEl: e.currentTarget
    });
  }
  render(){
    const { numSelected, options = [], classes } = this.props;
    let { state: { anchorEl, openClsSelection, openDelDialog, title, currentCls } } = this;
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
            <IconButton aria-label="Delete" onClick={this.showDelDialog}>
              <DeleteIcon />
            </IconButton>
          ) : <IconButton aria-label="Menu" onClick={this.showMenu}>
            <MoreVertIcon />
          </IconButton>}
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={openClsSelection}
            onRequestClose={this.handleRequestClose}
            MenuListProps={{
              style: {
                width: 200,
              },
            }}
          >
          <MenuItem
            key="all"
            selected={currentCls === 'all'}
            onClick={this.changeClass.bind(null, 'all')}
          >
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
        <Dialog open={openDelDialog} onRequestClose={this.handleRequestClose}>
          <DialogTitle>确定删除选中的文章？(删除后不能恢复)</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="default">
              怂了
            </Button>
            <Button onClick={this.handleDelArticles} color="primary">
              别拦着我
            </Button>
          </DialogActions>
        </Dialog>
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
    this.onDelArticles = this.onDelArticles.bind(this);
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
        total: nextProps.total,
        selectedIds: nextProps.delSuccess ? [] : this.state.selectedIds,
        selected: nextProps.delSuccess ? [] : this.state.selected
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
  onDelArticles(selectedIds, classId){
    const { props: { dispatch } } = this;
    let { state: { order, orderBy, currentPage } } = this;
    dispatch(createAction(DEL_ARTICLES_REQUEST, {
      order,
      orderBy,
      selectedIds,
      classId,
      pageNum: currentPage
    }));
  }
  changeSorting = sorting => {
    const { props: { dispatch } } = this;
    if(sorting[0]) {
      let { direction, columnName } = sorting[0];
      if(columnName === 'articleCls') {
        return;
      }

      dispatch(createAction(ARTICLE_LIST_REQUEST, {
        pageNum: 1,
        order: direction || '',
        orderBy: columnName || ''
      }))
      this.setState({
        order: direction || '',
        orderBy: columnName || ''
      });
    }
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
    const { props: { loading, classes: options, dispatch } } = this;
    return (<div >
        <EnhancedTableToolbar
          numSelected={selected.length}
          selectedIds={selectedIds}
          options={options}
          dispatch={dispatch}
          onDelArticles={this.onDelArticles}
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

const containerStyles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});
class Articles extends Component {
  constructor(props){
    super(props);
    this.state = {
      errText: ''
    }
  }

  componentDidMount() {
    const { props: { dispatch } } = this;
    dispatch(createAction(ARTICLE_LIST_REQUEST, {
      pageNum: 1,
      order: 'desc',
      orderBy: 'created_time'
    }))
  }
  componentWillReceiveProps(nextProps) {
    const { props: { dispatch } } = this;
    this.setState({
      errText: nextProps.error
    }, () => {
      dispatch(createAction(CLEAR_ARTICLES_ERROR))
    })
  }
  render(){
    const { props: {
       list,
       total,
       loading,
       error,
       articleClses,
       classes,
       dispatch,
       delSuccess
    }} = this;
    let { state: { errText } } = this;
    return (
      <div>
        <ArticleTable
          data={list}
          total={total || 0}
          loading= {loading}
          dispatch={dispatch}
          classes={articleClses}
          delSuccess={delSuccess}
        >
        </ArticleTable>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={!!error}
          autoHideDuration={6e3}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{errText}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleRequestClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}

const mepStateToProps = ({article}) => ({
  list: article.list,
  total: article.total,
  loading: article.loading,
  articleClses: article.classes,
  error: article.error,
  delSuccess: article.delSuccess
});

export default connect(mepStateToProps)(withStyles(containerStyles)(Articles));
