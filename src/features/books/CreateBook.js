import { Button, Form, Input, DatePicker,Switch,Select,Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getAuthorsAsync } from '../author/authorSlice';
import { getGenresAsync } from '../genres/genresSlice';
import { createBookAsync } from './bookSlice';
const {Option}=Select
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

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
/* eslint-enable no-template-curly-in-string */

export const CreateBook = () => {
  const dispatch = useDispatch();
  const authors=useSelector(state=>state.author.authors);
  const genres=useSelector(state=>state.genre.genres);
  const token=useSelector(state=>state.auth.token);
  const [date,setDate]=useState(null);
  const [imgUrl,setImgUrl]=useState("");
  const [imageObj,setImageObj]=useState("");
  useEffect(()=>{
    dispatch(getAuthorsAsync());
    dispatch(getGenresAsync());
    const reader = new FileReader();
    reader.addEventListener('load',function(){
      setImgUrl(reader.result)
    },false)
    if(imageObj){
      reader.readAsDataURL(imageObj)
    }
  },[imageObj])
  const handleChange = info => {
    if(info.fileList[0]?.originFileObj){
      setImageObj(info.fileList[0]?.originFileObj)
    }else{
      setImageObj(null)
    }
  }
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/jpg";
    if(!isJpgOrPng){
      message.error("You can only upload jpg or png file");
      return false;
    }
    return false;
  }
  const onFinish = (values) => {
   const payload={
    data : {
    title:values.title,
    description:values.description,
    pages:values.pages,
    width:values.width,
    height:values.height,
    price:values.price,
    stock:values.stock,
    isPopular:values.isPopular,
    publishedDate:date,
    genres:values.genres,
    authors:values.authors
  },
    image:imageObj
   }

  console.log("payload:",payload)
   dispatch(createBookAsync({token,payload}))
  };

const onChangeDate=(moment,dateStrings)=>{
  setDate(moment.format('YYYY-MM-DD'))
}
  return (
    <>
    <h1 style={{textAlign:'center'}}>Create New Book</h1>
    <Form {...layout} 
    name="nest-messages"
     onFinish={onFinish}
      validateMessages={validateMessages} style={{margin:'auto'}}>
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
        <Upload
        onChange={handleChange}
        beforeUpload={beforeUpload}
        listType="picture"
        accept=".png,.jpg,image/png,image/jpeg"
        >
          <Button>Upload Image</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        name='description'
        label="Description"
        rules={[
          {
           required:'true'
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
        <Input/>
      </Form.Item>
      <Form.Item name='price' label='Price'
       rules={[
        {
          required: 'true',
        },
      ]}>
        <Input/>
      </Form.Item>
      <Form.Item name='stock' label='Stock'
       rules={[
        {
          required: 'true',
        },
      ]}>
        <Input/>
      </Form.Item>
      <Form.Item valuePropName='checked' name='isPopular' label='Is Popular'
       rules={[
        {
          required: 'true',
        },
      ]}>
        <Switch/>
      </Form.Item>
      <Form.Item name='publishedDate' label='Date'
       rules={[
        {
          required: 'true',
        },
      ]}>
        <DatePicker onChange={onChangeDate}/>
      </Form.Item>
      <Form.Item name='genres' label='Generes'
       rules={[
        {
          required: 'true',
        },
      ]}>
        <Select placeholder='generes' mode='multiple' >
          {genres.map(genre=>(
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
        <Select placeholder='authors' mode='multiple'>
          {authors.map(author=>(
            <Option key={author.id} value={author.id}>{author.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};
