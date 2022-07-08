import { EyeOutlined } from "@ant-design/icons";
import { Table,Space } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOrdersAsync } from "./orderSlice";
import {Link} from 'react-router-dom'

export const Orders = () => {
    const dispatch=useDispatch();
    const orders = useSelector(state=>state.order.orders);
    const token=useSelector(state=>state.auth.token);
    useEffect(()=>{
        dispatch(getOrdersAsync(token))
    },[])
    const columns =[
        {
            title:"ID",
            dataIndex:"id",
            key:"id"
        },
        {
            title:"Customer",
            dataIndex:"customerName",
            key:"customerName"
        },
        {
            title:"Address",
            dataIndex:"address",
            key:"address"
        },
        {
            title:"Mobile",
            dataIndex:"phone",
            key:"phone"
        },
        {
            title:"Order Time",
            dataIndex:"orderTime",
            key:"orderTime"
        },
        {
            title:"Delivery Time",
            dataIndex:"deliveryTime",
            key:"deliveryTime"
        },
        {
            title:"Status",
            dataIndex:"status",
            key:"status"
        },
        {
            title:"Total",
            dataIndex:"total",
            key:"total"
        },
        {
            title:"Action",
            render:(text,record)=><Space>
                <Link to={`/orders/${record.id}/orderDetails`}><EyeOutlined /></Link>
            </Space>
        }
    ]
   
    return (
        <Table columns={columns} dataSource={orders}/>
    )
}