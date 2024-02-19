import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useHistory } from "react-router-dom";
import { MailOutlined, LockOutlined, RightCircleFilled, LeftCircleFilled } from '@ant-design/icons';
import '../Styles/login.css';
import { registerLogin, loginUserDetails } from '../Api/login';
import moment from "moment";
import { notificationContent } from '../Shared Files/notification';
import axios from 'axios'

function Login({setUser}) {
    let history = useHistory();
    const [registerUser, setRegisterUser] = useState();
    const [registerPassword, setRegisterPassword] = useState();
    const [formType, setFormType] = useState("User-Login");
    const [loginButtonDisable, setloginButtonDisable] = useState(false);
    const [form] = Form.useForm();

    const onFinish = () => {
        if (formType === "User-Login") {
                setloginButtonDisable(true);
                const LoginUserDetailsPayload = {
                    username : registerUser.toLowerCase(),
                    password : registerPassword
                }
                    loginUserDetails(LoginUserDetailsPayload).then((response) => {
                        const getAccess = response.data;
                        if (getAccess == "User Not Exist") {
                        setloginButtonDisable(false);
                        notificationContent("error", "Login");
                        } else {
                        const getSessionDetails = response.data;
                        const token = getSessionDetails["token"];
                        const userID = getSessionDetails["userDetails"]["user_id"];
                        const userName = getSessionDetails["userDetails"]["user_name"];
                        localStorage.setItem('jwtToken', token)
                        axios.defaults.headers.common['Authorization'] = token;
                        setUser({ auth:true, name: userName })
                        localStorage.setItem('userID',userID);
                        localStorage.setItem('userName', userName.toLowerCase());
                        notificationContent("success", "Login");
                        history.push(`user/dashboard`);
                        }
                    });            
        }
        else if (formType === "User-Registration") {
            const currentDate = moment().format("DD-MM-YYYY hh:mm A");
            const registerPayload = {
                        username: registerUser.toLowerCase(),
                        password: registerPassword,
                        submission_date: currentDate
                    };
                registerLogin(registerPayload).then((response) => {
                            const status = response.data;
                            if (status === "success") {
                            setFormType("User-Login");
                            notificationContent(status, "Registration");
                            } else {
                                notificationContent(status, "Registration");
                            }
                        });
            form.resetFields();
        }
    };
    return (
        <div className="login-outline">
            <div className='login-background'>
                <Card size="small" className="login-frame"
                    style={{ width: 400, height: 392 }}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                        form={form}
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <img src="../app-logo.png" width="350" height="75"/>
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
                                        },{
                                            validator: (_, value) => {
                                                if (value && (value.includes('\'')) || value.includes('\\')) {
                                                    return Promise.reject('Password cannot contain (Quote or Backslash)');
                                                }
                                                return Promise.resolve();
                                            },
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
                                    <Button type="primary" disabled={loginButtonDisable} htmlType="submit" className="login-form-button" >
                                        {formType !== "User-Login" ? "Register" : "Login"}
                                    </Button>
                                </Form.Item>
                                <div>{formType === "User-Login" ? (<div className='new-user-question' onClick={(event) => {
                                        setFormType("User-Registration");
                                    }} >Are you a new user ? Please register here {<RightCircleFilled
                                     style={{ color: "#808080", fontSize: "16px", cursor: "pointer" }} />}</div>) :
                                    (<div className="register-back-button" onClick={event => setFormType("User-Login")}>
                                        <LeftCircleFilled style={{ color: "#808080", fontSize: "20px", marginTop: "20px" }} />
                                        <span style={{ color: "#636f80", fontSize: "18px" }}><span className="go-back"> Go Back</span></span></div>)}
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