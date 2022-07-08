import { EyeOutlined } from "@ant-design/icons";
import { Table,Space } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksAsync } from "./bookSlice";
import {Link} from 'react-router-dom'

export const Books = () =>{
  const dispatch=useDispatch();
  const books=useSelector(state=>state.book.books)
  useEffect(()=>{
    dispatch(getBooksAsync());
  },[])
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
          },
          {
            title: 'Action',
            render : (text,record)=><Space>
              <Link to={`/books/${record.id}`}><EyeOutlined/></Link>
            </Space>
          },

      ];
    return (
        <>
        <h1>Books List</h1>
        <Table columns={columns} dataSource={books}/>
        </>
    )
}
