import { Card ,Row, Col, Button, Image} from "antd"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { getBookAsync } from "./bookSlice";
import { EditBook } from "./EditBook";

export const BookDetails = () => {
    const param=useParams();
    const dispatch=useDispatch();
    const book=useSelector(state=>state.book.book);
    const [isModalVisible,setIsModalVisible]=useState(false);
    useEffect(()=>{
        dispatch(getBookAsync(param?.id));
    },[]);
    const showEditModal= () => {
        setIsModalVisible(true)
    }
    const handleOk = () => {
        setIsModalVisible(false)
    }
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    return(
       <Card title="Book Details" extra={<Button type="primary" onClick={showEditModal}>Edit</Button>}>
        <Row>
        <Col span={8}>   
        <p>ID : {book?.id}</p>
        <p>Title : {book?.title}</p>
        <Image width={200} src={book?.imgUrl}/>
        <p>Description : {book?.description}</p>
        </Col>
        <Col span={8}>
        <p>Pages : {book?.pages}</p>
        <p>Width : {book?.width}</p>
        <p>Height : {book?.height}</p>
        <p>Price : {book?.price}</p>
        </Col>
        <Col span={8}>
        <p>Stock : {book?.stock}</p>
        <p>Is Popular : {book?.isPopular ? 'Yes' : 'No'}</p>
        <p>Published Date : {book?.publishedDate}</p>
        <p>Generes: 
            <ul>
            {book?.genres.map(genre=>(
                <li>{genre?.name}</li>
            ))}
            </ul>
        </p>
        <p>Authors:
            <ul>
                {book?.authors.map(author=>(
                    <li>{author?.name}</li>
                ))}
            </ul>
        </p>
        </Col>
        </Row>
        <EditBook visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}/>
       </Card>
    )
}