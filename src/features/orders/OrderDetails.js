import { Card, Table, Col, Row, Typography } from "antd";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { getOrderDetailAsync } from "./orderSlice";

export const OrderDetails = () => {
    const dispatch = useDispatch();
    const param = useParams();
    const id = param?.id;
    const token = useSelector(state => state.auth.token);
    const order = useSelector(state => state.order.order)

    useEffect(() => {
        dispatch(getOrderDetailAsync({ id, token }))
    }, [])
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Book Title",
            dataIndex: ['book', 'title'],
            key: "title"
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price"
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity"
        },
        {
            title: "Sub Total",
            key: "total",
            render: (text, record) => record?.price * record?.quantity
        }
    ]
    return <>
        <Card>
            <Row>
                <Col span={12}>
                    <p>Customer Name : {order?.customerName}</p>
                    <p>Mobile Number : {order?.phoneNumber}</p>
                    <p>Address :{order?.address}</p>
                </Col>
                <Col span={12}>
                    <p>Order Time : {order?.orderTime}</p>
                    <p>Delivery Time : {order?.deliveryTime}</p>
                    <p>Order Status : {order?.status}</p>
                </Col>
            </Row>
        </Card>
        <Table columns={columns} dataSource={order?.orderItems} pagination={false}
            summary={() => (
                <Table.Summary fixed>
                <Table.Summary.Row>
                     <Table.Summary.Cell index={0}></Table.Summary.Cell>
                     <Table.Summary.Cell index={1}></Table.Summary.Cell>
                     <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>Total</Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>
                        <Typography.Text>{order?.total}</Typography.Text>
                    </Table.Summary.Cell>
                </Table.Summary.Row>
                </Table.Summary>
            )


            }
        />

    </>
}