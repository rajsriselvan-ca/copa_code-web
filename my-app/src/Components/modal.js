import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Card, Modal, Select, Row, Col } from 'antd';
import "../Styles/modal.css"
import { getNotesType, getProgramLanguage } from "../Api/dashboard";

const { Option } = Select;
const { TextArea } = Input;
// visible={isModalVisible}

function FormDetails(props) {
    const [form] = Form.useForm();
    const [getCategory, setCategory] = useState([]);
    const [getProgramType, setProgramType] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const incomingCategory = await getNotesType();
            const incomingLanguage = await getProgramLanguage();
            setCategory(incomingCategory.data);
            setProgramType(incomingLanguage.data);
        }
        fetchData();
    }, []);

    function onChange(value) {
        return value
    }

    function onBlur() {
        return
    }

    function onFocus() {
        return
    }

    function onSearch(val) {
        return val;
    }

    const handleCancel = () => {
        props.cancel(false);
    }

    return (
        <>
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
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="Select Notes Type"
                                        optionFilterProp="children"
                                        onChange={onChange}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {getCategory.map(record => (
                                            <Option value={record.notes_type_id}>{record.notes_type}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                        <Form.Item 
                                    name="Type"
                                    label="Language"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select language"
                                optionFilterProp="children"
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {getProgramType.map(record => (
                                    <Option value={record.language_id}>{record.language_name}</Option>
                                ))}
                            </Select>
                            </Form.Item>
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
                            <TextArea rows={6} style={{ backgroundColor: "#222211", color: "#cccccc" }} />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
}
export default FormDetails;