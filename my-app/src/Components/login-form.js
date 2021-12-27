import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useHistory } from "react-router-dom";
import { MailOutlined, LockOutlined, RightCircleFilled, LeftCircleFilled } from '@ant-design/icons';
import '../Styles/login.css';
import { registerLogin, getUsers } from '../Api/login';
import moment from "moment";
import { notificationContent } from '../Shared Files/notification';

function Login() {
    let history = useHistory();
    const [registerUser, setRegisterUser] = useState();
    const [registerPassword, setRegisterPassword] = useState();
    const [formType, setFormType] = useState("User-Login");
    const [userList, setUserList] = useState([]);
    const [form] = Form.useForm();

    const fetchData = async () => {
        const inComingUsers = await getUsers();
        setUserList(inComingUsers.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onFinish = () => {
        if (formType === "User-Login") {
                const checkTheUser = userList.filter(e => e.user_name.toLowerCase() === registerUser.toLowerCase() &&
                e.user_password.toLowerCase() === registerPassword.toLowerCase());
                if (checkTheUser.length < 1) {
                    return notificationContent("error", "Login");
                } else {
                    const loggedinUserID = userList.filter(record => registerUser === record.user_name)[0].user_id;
                    localStorage.setItem('userID',loggedinUserID);
                    localStorage.setItem('userName',registerUser.toLowerCase());
                    notificationContent("success", "Login");
                    history.push(`user${loggedinUserID}/dashboard`);
                }
        }
        else if (formType === "User-Registration") {
                const userExist = userList.find(record => record.user_name === registerUser) === undefined ? false : true;
                if (userExist) {
                    return notificationContent("warning", "UserExist")
                } else {
                    const currentDate = moment().format("DD-MM-YYYY hh:mm A");
                    const registerPayload = {
                        username: registerUser,
                        password: registerPassword,
                        submission_date: currentDate
                    };
                    registerLogin(registerPayload).then((response) => {
                        const status = response.data;
                        if (status === "success") setFormType("User-Login");
                        fetchData();
                        notificationContent(status, "Registration");
                    });
                }
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