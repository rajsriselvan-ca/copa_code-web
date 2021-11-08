import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Helmet from 'react-helmet';
import '../Styles/login.css';
import { registerLogin } from '../Api/login';
import moment from "moment";


function Login() {
    const [registerUser, setRegisterUser ] = useState();
    const [registerPassword, setRegisterPassword ] = useState();

    const onFinish = () => {
        const currentDate = moment().format("DD-MM-YYYY hh:mm A")
        console.log('Received values of form: ',currentDate );
        const registerPayload = {
            username: registerUser,
            password: registerPassword,
            submission_date: currentDate
        };
        registerLogin(registerPayload);
    };
    return (
        <div className="login-outline">
            <div className='login-background'>
                <Helmet bodyAttributes={{ style: 'background-color : #26afeb' }} />
                <Card size="small" className="login-frame"
                    style={{ width: 400, height: 350 }}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <div className="inner-box">
                            <span className="login-header"><b>Sign Up</b></span>
                            <div>
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter a valid email id',
                                            type: 'email',
                                        },
                                    ]}
                                >
                                    <Input className="email-field" onChange={(event) => setRegisterUser(event.target.value)} size="large" prefix={<MailOutlined style={{ fontSize: '20px' }} className="site-form-item-icon" />} placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your password',
                                        },
                                    ]}
                                >
                                    <Input
                                        className="password-field"
                                        onChange={(event) => setRegisterPassword(event.target.value)}
                                        size="large"
                                        prefix={<LockOutlined style={{ fontSize: '20px' }} className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Register
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
export default Login;