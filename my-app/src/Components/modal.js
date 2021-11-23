import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Card, Modal, Select, Row, Col } from 'antd';
import "../Styles/modal.css"

const { Option } = Select;
const { TextArea } = Input;
// visible={isModalVisible}

function FormDetails(props) {
    const [form] = Form.useForm();

    const handleCancel = () => {
        props.cancel(false);
    }

    return (
        <>
            {console.log("comeing--->>", props.data)}
            <Modal title="Create Notes" className="popup-frame" width="60%" visible={props.data} onCancel={handleCancel} >
                <Form
                    className="notes-form"
                    // onFinish={onFinish}
                    form={form}
                    initialValues={{
                        remember: true,
                    }}
                >
                    <div className="inner-frame" >
                        <Row >
                            <Col className="gutter-row" span={10} offset={1}>
                                <Form.Item
                                    name="note"
                                    label="Title"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={10} offset={3}> 
                                <Form.Item
                                    name="gender"
                                    label="Category"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select"
                                        // onChange={onGenderChange}
                                        allowClear
                                    >
                                        <Option value="male">male</Option>
                                        <Option value="female">female</Option>
                                        <Option value="other">other</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name="text-area"
                            label="Content"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}

                        >
                            <TextArea rows={8} style={{backgroundColor:"#222211", color:"#cccccc"}} />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
}
export default FormDetails;