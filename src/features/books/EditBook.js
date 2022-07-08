import { Modal, Form, Input, DatePicker, Switch, Select, Checkbox } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorsAsync } from '../author/authorSlice';
import { getGenresAsync } from '../genres/genresSlice';
import { updateBookAsync } from './bookSlice';

const { Option } = Select;
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
export const EditBook = (props) => {
    const dispatch = useDispatch();
    const authors = useSelector(state => state.author.authors);
    const genres = useSelector(state => state.genre.genres);
    const token = useSelector(state => state.auth.token);
    const book=useSelector(state=>state.book.book);
    const [date, setDate] = useState(null);
    console.log(book)
    useEffect(() => {
        dispatch(getAuthorsAsync());
        dispatch(getGenresAsync());
    }, [])

    const onChangeDate = (moment, dateStrings) => {
        setDate(moment.format('YYYY-MM-DD'))
    }
    const onFinish = (values) => {
        const id=book?.id;
        const data={
            title:values.title,
            imgUrl:values.imgUrl,
            description:values.description,
            pages:values.pages,
            width:values.width,
            height:values.height,
            price:values.price,
            stock:values.stock,
            isPopular:values.isPopular,
            publishedDate:values.publishedDate.format('YYYY-MM-DD'),
            genres:values.genres,
            authors:values.authors
           }
           console.log("update data::",data)
           dispatch(updateBookAsync({id,token,data}))
    }

    return (
        <>
            <Modal title="Edit Book"
                visible={props?.visible}
                onOk={props?.onOk}
                okText="Save"
                okButtonProps={{ form: 'edit-form', key: 'submit', htmlType: 'submit' }}
                onCancel={props?.onCancel}
                destroyOnClose={true}
            >
                <Form {...layout}
                    id='edit-form'
                    name="nest-messages"
                    onFinish={onFinish}
                    initialValues={{
                        title:book?.title,
                        imgUrl:book?.imgUrl,
                        description:book?.description,
                        pages:book?.pages,
                        width:book?.width,
                        height:book?.height,
                        price:book?.price,
                        stock:book?.stock,
                        isPopular:book?.isPopular,
                        publishedDate:moment(book?.publishedDate, 'YYYY-MM-DD'),
                        genres:book?.genres.map(genre=>genre.id),
                        authors:book?.authors.map(author=>author.id)

                    }}
                    validateMessages={validateMessages} style={{ margin: 'auto' }}>
                    <Form.Item
                        name='title'
                        label="Title"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='imgUrl'
                        label="Image URL"
                        rules={[
                            {
                                required: 'true',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='description'
                        label="Description"
                        rules={[
                            {
                                required: 'true'
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name='pages'
                        label="Pages"
                        rules={[
                            {
                                required: 'true',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name='width' label="Width"

                        rules={[
                            {
                                required: 'true',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name='height' label='Height'
                        rules={[
                            {
                                required: 'true',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='price' label='Price'
                        rules={[
                            {
                                required: 'true',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='stock' label='Stock'
                        rules={[
                            {
                                required: 'true',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item valuePropName='checked' name='isPopular' label='Is Popular'
                        rules={[
                            {
                                required: 'true',
                            },
                        ]}>
                        <Switch />
                    </Form.Item>
                    <Form.Item name='publishedDate' label='Date'
                        rules={[
                            {
                                required: 'true',
                            },
                        ]}>
                        <DatePicker onChange={onChangeDate} format={'YYYY/MM/DD'} />
                    </Form.Item>
                    <Form.Item name='genres' label='Generes'
                        rules={[
                            {
                                required: 'true',
                            },
                        ]}>
                        <Select placeholder='generes' mode='multiple'>
                            {genres.map(genre => (
                                <Option key={genre.id} value={genre.id}>{genre.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name='authors' label='Authors'
                        rules={[
                            {
                                required: 'true',
                            },
                        ]}>
                        <Select placeholder='authors' mode='multiple' >
                            {authors.map(author => (
                                <Option key={author.id} value={author.id}>{author.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}