//文章列表的列定义
import React from 'react';
import { Link } from 'react-router-dom';

export default [{
  name: 'title',
  title: '标题'
}, {
  name: 'articleCls',
  title: '分类',
  getCellData: row => {
    const articleCls = row.class;
    return articleCls.name || '';
  }
}, {
  name: 'keywords',
  title: '关键字'
}, {
  name: 'pv',
  align: 'right',
  title: '访问量'
}, {
  name: 'created_time',
  title: '创建时间',
  align: 'right',
  getCellData: row => {
    const { created_time } = row;
    let timeStr = new Date(created_time);
    return `${timeStr.getFullYear()}-${timeStr.getMonth() - 1}-${timeStr.getDate()}`;
  }
}, {
  name: 'operators',
  title: '操作',
  align: 'right',
  getCellData: row => (<Link to={`/articles/${row.id}`}>编辑</Link>)
}]
