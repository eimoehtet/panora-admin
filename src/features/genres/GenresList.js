import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import {Table,PageHeader,Button,Space} from 'antd'
import { useEffect, useState } from 'react'
import { CreateGenre } from './CreateGenres';
import { getGenreAsync, getGenresAsync } from './genresSlice';
import { useSelector,useDispatch } from 'react-redux';
import { EditGenres } from './EditGenres';
export const GenresList = () => {
    const [isModalVisible,setIsModalVisible] = useState(false); 
    const [editModalVisible,setEditModalVisible]=useState(false);
    const dispatch=useDispatch();
    const genres=useSelector(state=>state.genre.genres);
    useEffect(()=>{
        dispatch(getGenresAsync());
    },[])
 
   
    const columns=[
        {
            title:"ID",
            dataIndex:"id",
            key:"id"
            
        },
        {
            title:"Name",
            dataIndex:"name",
            key:'name'
        },
        {
            title:"Action",
            render:(text,record)=><Space>
                <EditOutlined onClick={()=>{showEditModal(record.id)}}/>
               
            </Space>
        }
    ]
    const showCreateModal = () => {
        setIsModalVisible(true);
    }
    const showEditModal = async(record) => {
        console.log(record)
       await dispatch(getGenreAsync(record));
        setEditModalVisible(true);
    }
    const handleOk=()=>{
        setIsModalVisible(false);
        setEditModalVisible(false);
    }
    const handleCancel = () => {
        setIsModalVisible(false);
        setEditModalVisible(false);
    }
    return(
        <>
        <PageHeader
        className='site-page-header'
        title="Genres List"
        extra={
            [
                <Button type='primary' onClick={showCreateModal}><PlusCircleOutlined/>New Genre</Button>,
                <CreateGenre visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}/>
                
            ]
        }
        />
            
        <Table columns={columns} dataSource={genres}/>
        <EditGenres visible={editModalVisible} onOk={handleOk} onCancel={handleCancel} />
        
        </>
    )
}