import { EditOutlined,PlusCircleOutlined } from "@ant-design/icons";
import { Table,PageHeader,Button,Image, Avatar } from "antd"
import { useEffect, useState } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { getAuthorAsync, getAuthorsAsync } from "./authorSlice";
import { CreateAuthor } from "./CreateAuthor";
import { EditAuthor } from "./EditAuthor";

export const Authors = () => {
  const dispatch=useDispatch();
  const [isCreateModalVisible,setIsCreateModalVisible]=useState(false);
  const [isEditModalVisible,setIsEditModalVisible]=useState(false);
  const status=useSelector(state=>state.author.status);
  const authors = useSelector(state=>state.author.authors);
  useEffect(()=>{
    dispatch(getAuthorsAsync());
    
  },[])
  const showEditModal = async(record) => {
   await dispatch(getAuthorAsync(record.id));
    setIsEditModalVisible(true);
  }
  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  }
  const handleOk = () =>{
    setIsEditModalVisible(false);
    setIsCreateModalVisible(false);
  }
  const handleCancel = () => {
    setIsEditModalVisible(false);
    setIsCreateModalVisible(false);
  }
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'English Name',
          dataIndex: 'engName',
          key: 'price',
        },
        {
            title: 'Profile Image',
            dataIndex: 'profileImg',
            key: 'profileImg',
            render:(text,record)=><Avatar size={48}  style src={`${record.profileImg}`}/>
          },
          {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render:(text,record)=><a onClick={()=>showEditModal(record)}><EditOutlined/></a>
          },

      ];
    return (
        <>
        <PageHeader
        className='site-page-header'
        title="Authors List"
        extra={
            [
                <Button type='primary' onClick={showCreateModal}><PlusCircleOutlined/>New Author</Button>,
                <CreateAuthor visible={isCreateModalVisible} onOk={handleOk} onCancel={handleCancel}/>
            ]
        }
        />
        <Table columns={columns} dataSource={authors} loading={status==='loading'}/>
        <EditAuthor visible={isEditModalVisible} onOk={handleOk} onCancel={handleCancel}/>
        </>
    )
}