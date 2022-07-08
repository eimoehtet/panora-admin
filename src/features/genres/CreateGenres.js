import { Modal ,Form,Input} from "antd"
import { useDispatch,useSelector } from "react-redux";
import { createGenresAsync } from "./genresSlice";

export const CreateGenre = (props) => {
    const dispatch=useDispatch();
    const token=useSelector(state=>state.auth.token)
    const onFinish = (values) => {
        const name=values.name;
        const genere = {name};
        dispatch(createGenresAsync({token,genere}));
    }
    return (
        <Modal title="Create Genres"
            okText="Save"
            okButtonProps={{form:'create-form',key:'submit',htmlType:'submit'}}
            visible={props.visible}
            onOk={props.onOk}
            onCancel={props.onCancel}>
            <Form
            name="basic"
            id="create-form"
            key="create-form"
            labelCol={{span:4}}
            wrapperCol={{span:8}}
            onFinish={onFinish}
            >
                <Form.Item
                label="Name"
                name="name"
                >
                    <Input/>
                </Form.Item> 
            </Form>
        </Modal>
    )
}