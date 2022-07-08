import { Button, Form, Input, message, Modal, Upload } from "antd"
import { createAuthorAsync } from "./authorSlice";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";

export const CreateAuthor = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [imgUrl, setImgUrl] = useState("");
    const [imageObj, setImageObj] = useState("")
    useEffect(() => {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            setImgUrl(reader.result)
        }, false)
        if (imageObj) {
            reader.readAsDataURL(imageObj);
        }

    }, [imageObj])
    const onFinish = async (values) => {
        const payload = {
            data: {
                name: values.name,
                engName: values.engName
            },
            image: imageObj
        };

        await dispatch(createAuthorAsync({ token, payload }));
    }
    const handleChange = (info) => {
        if (info.fileList[0]?.originFileObj) {
            setImageObj(info.fileList[0]?.originFileObj)
        } else {
            setImageObj(null);
        }
    }
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return false;
        }
        return false;
    }
    return (
        <Modal title="Create Author"
            visible={props.visible}
            onOk={props.onOk}
            okButtonProps={{ form: "create-form", key: "submit", htmlType: "submit" }}
            onCancel={props.onCancel}
            style={{ textAlign: 'center' }}
            destroyOnClose={true}
        >
            <Form
                name="basic"
                id="create-form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 12 }}
                onFinish={onFinish}
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
                    <Upload
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                        listType="picture"
                        accept=".png,.jpg,image/jpg,image/png"
                    >
                        <Button>Click to Upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}