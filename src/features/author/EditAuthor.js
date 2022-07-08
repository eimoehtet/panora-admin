import { Input, Form, Modal } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateAuthorAsync } from "./authorSlice";

export const EditAuthor = (props) => {
    const dispatch = useDispatch();
    const author = useSelector(state => state.author.author);
    const token=useSelector(state=>state.auth.token);
    const [form] = Form.useForm();
    useEffect(() => {

    },[author])
    const onFinish = (values) => {
        const id = author?.id;
        const data = {
            name: values.name,
            engName: values.engName,
            profileImg: values.profileImg
        }
       
        dispatch(updateAuthorAsync({id,token,data}))
        form.resetFields();
    }
    const onCancel = () => {
        props.onCancel();
        form.resetFields();
    }
    return (
        <Modal
            key={author?.id}
             title="Edit Author"
            visible={props.visible} onOk={props.onOk} onCancel={onCancel}
            okButtonProps={{ form: 'edit-form', key: 'submit', htmlType: 'submit' }}
            okText="Save"
        >
            <p>{author?.name}</p>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 12 }}
                name="basic"
                key="edit-form"
                id="edit-form"
                onFinish={onFinish}
                initialValues={{ name:author?.name, engName:author?.engName, profileImg:author?.profileImg }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="English Name"
                    name="engName"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Image Url"
                    name="profileImg"
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}