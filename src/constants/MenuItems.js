import React from 'react';
import HomeIcon from 'material-ui-icons/Home';
import BookIcon from 'material-ui-icons/Book';
import EditIcon from 'material-ui-icons/Edit';
import CommentIcon from 'material-ui-icons/Comment';

const ITEM_TYPES = {
  ITEM: Symbol(),
  SUB_HEAD: Symbol(),
  DIVIDER: Symbol()
}

const MENU_ITEMS = [{
  type: ITEM_TYPES.SUB_HEAD,
  text: '豪爷小站后台管理v0.0.1'
}, {
  type: ITEM_TYPES.DIVIDER
}, {
  type: ITEM_TYPES.ITEM,
  text: '首页',
  link: '/',
  icon:  <HomeIcon />
}, {
  type: ITEM_TYPES.SUB_HEAD,
  text: '文章管理'
}, {
  type: ITEM_TYPES.ITEM,
  text: '文章列表',
  link: '/article/list',
  icon: <BookIcon />
}, {
  type: ITEM_TYPES.ITEM,
  text: '写文章',
  link: '/add_article',
  icon: <EditIcon />
}, {
  type: ITEM_TYPES.ITEM,
  text: '查看评论',
  link: 'comments',
  icon: <CommentIcon />
}];

export {
  MENU_ITEMS,
  ITEM_TYPES
};
