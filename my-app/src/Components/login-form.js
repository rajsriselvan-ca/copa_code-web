import React, { useState } from 'react';
import { Form, Input, Button, Tabs, Card, Spin } from 'antd';
import { MailOutlined, LockOutlined, RightCircleFilled, LeftCircleFilled } from '@ant-design/icons';
import Helmet from 'react-helmet';
import '../Styles/login.css';
import { registerLogin, getUsers } from '../Api/login';
import moment from "moment";
import { notificationContent } from '../Shared Files/notification';


function Login() {
    const [registerUser, setRegisterUser] = useState();
    const [registerPassword, setRegisterPassword] = useState();
    const [formType, setFormType] = useState("User-Login");

    const onFinish = () => {
        const formCode = formType;
        if (formCode === "User-Login") {
            getUsers().then(response => {
                const status = response.data;
                const checkTheUser = response.data.filter(e => e.user_name === registerUser && e.user_password === registerPassword);
                if (checkTheUser.length === 0) {
                    return notificationContent("error", "Login");
                } else {
                    return notificationContent("success", "Login");
                }
            });
        }
        else if (formCode === "User-Registration") {
            const currentDate = moment().format("DD-MM-YYYY hh:mm A")
            const registerPayload = {
                username: registerUser,
                password: registerPassword,
                submission_date: currentDate
            };
            registerLogin(registerPayload).then((response) => {
                const status = response.data;
                if (status === "success") setFormType("User-Login");
                notificationContent(status, "Registration");
            });
        }
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
                        onFinish={onFinish}
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <div className="inner-box">
                            <span className="login-header">{formType !== "User-Login" ? <b>Registration</b> : <b>Login</b>}</span>
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
                                    <Button type="primary" htmlType="submit" className="login-form-button" >
                                        {formType !== "User-Login" ? "Register" : "Login"}
                                    </Button>
                                </Form.Item>
                                <div>{formType === "User-Login" ? (<div>Are you a new user ? Please register here {<RightCircleFilled
                                    onClick={(event) => {
                                        setFormType("User-Registration");
                                    }} style={{ color: "#26afeb", fontSize: "16px", cursor: "pointer" }} />}</div>) :
                                    (<div className="register-back-button" onClick={event => setFormType("User-Login")}><LeftCircleFilled style={{ color: "#26afeb", fontSize: "20px", marginTop: "20px" }} />
                                        <span style={{ color: "#636f80", fontSize: "18px" }}><b> Go Back</b></span></div>)}
                                </div>
                            </div>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
export default Login;