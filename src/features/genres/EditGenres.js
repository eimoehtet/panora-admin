import { Modal ,Form,Input} from "antd"
import { useDispatch,useSelector } from "react-redux";
import { updateGenresAsync } from "./genresSlice";

export const EditGenres = (props) => {
    const dispatch=useDispatch();
    const genre=useSelector(state=>state.genre.genre);
    const token=useSelector(state=>state.auth.token);
    const onFinish = (values) => {
        const id=genre?.id;
        const name=values.name;
        const data={name}
        dispatch(updateGenresAsync({id,token,data}));
    }
    return (
        <Modal 
            title="Edit Genres"
            okText="Save"
            okButtonProps={{form:'edit-form',key:'submit',htmlType:'submit'}}
            visible={props?.visible}
            onOk={props?.onOk}
            onCancel={props?.onCancel}
            destroyOnClose={true}>
            <Form
            name="basic"
            id="edit-form"
            labelCol={{span:4}}
            wrapperCol={{span:8}}
            onFinish={onFinish}
            initialValues={{name:genre?.name}}
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