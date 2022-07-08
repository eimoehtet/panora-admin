import { Form, Input, Button, Checkbox, Row ,Col} from 'antd';
import './Login.css';
import {useDispatch,useSelector} from 'react-redux'
import { loginAsync } from './authSlice';
import { Navigate } from 'react-router';
export const Login = () => {
  const dispatch=useDispatch();
  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn);
  const onFinish = async (values) => {
    const mobileNumber=values.mobileNumber;
    const password=values.password;
    dispatch(loginAsync({mobileNumber,password}));

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  if(isLoggedIn){
    return <Navigate to="/" replace/>
  }
  return (
      <div className='main' style={{height:'100vh'}}>
    <div className='header'>
      <span style={{fontSize:22,paddingLeft:50}}>Panora Login</span>
      </div>
      <Row justify='center' className='form-container'>
             <Col
               sm={18}
               md={16}
               xl={12}
             >
              <Row justify='center'>
                  <Col
                  xs={20}
                  sm={20}
                  md={20}
                  lg={8}
                  xl={14}
                  xxl={14}
                  >
                  <Form
                className='form'
                name="basic"
          
            labelCol={{ span: 8 }}
            wrapperCol={{
            span: 24,
             }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
         >
      <Form.Item
        label="Phone Number"
        name="mobileNumber"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset:6,
          span: 10,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
                  </Col>
              </Row>
          
              </Col>
         
      </Row>
      </div>
  );
};
