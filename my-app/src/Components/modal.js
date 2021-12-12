import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Card, Modal, Select, Row, Col } from 'antd';
import "../Styles/modal.css"
import { getNotesType, getProgramLanguage, createNotes } from "../Api/dashboard";
import moment from "moment";
import { notificationContent } from "../Shared Files/notification";

const { Option } = Select;
const { TextArea } = Input;

function FormDetails(props) {
    const [form] = Form.useForm();
    const [getCategory, setCategory] = useState([]);
    const [getProgramType, setProgramType] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState([]);
    const [selectedContent, setSelectedContent] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const incomingCategory = await getNotesType();
            const incomingLanguage = await getProgramLanguage();
            setCategory(incomingCategory.data);
            setProgramType(incomingLanguage.data);
        }
        fetchData();
    }, []);

    function onBlur() {
        return
    }

    function onFocus() {
        return
    }

    const handleCancel = () => {
        form.resetFields();
        clearFormValues();
        props.cancel(false);
    }

    const clearFormValues = () => {
        setSelectedTitle([]);
        setSelectedCategory([]);
        setSelectedProgram([]);
        setSelectedContent([]);
    }

    const handleOk = () => {
        const currentDate = moment().format("DD-MM-YYYY hh:mm A");
        const payload = {
            note_type_id: selectedCategory,
            program_id: selectedProgram,
            note_title: selectedTitle,
            content: selectedContent,
            submission_date: currentDate
        }
        createNotes(payload).then((response) => {
            if (response.data === "success") {
                notificationContent(response.data, "NoteSubmit");
                form.resetFields();
                clearFormValues();
                props.cancel(false);
                props.data();
            } 
            else return notificationContent("error", "NoteSubmit");
        });
    }

    return (
            <Modal title="Create Notes" className="popup-frame" 
                width="49rem"
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                closable={false}
                footer={false}
                visible={props.visiblity}  >
                <Form
                    className="notes-form"
                    form={form}
                    initialValues={{
                        remember: true,
                    }}
                >
                    <div className="inner-frame" >
                        <Row >
                            <Col className="gutter-row" span={10}>
                                <Form.Item
                                    name="Title"
                                    label="Title"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter Title" onChange={event => setSelectedTitle(event.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col offset={4} >
                                <Form.Item
                                    name="Category"
                                    label="Category"
                                    className="category-dropbox"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        className="category-dropbox"
                                        placeholder="Select Notes Type"
                                        optionFilterProp="children"
                                        onChange={event => setSelectedCategory(event)}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        // onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {getCategory.map(record => (
                                            <Option key={record.notes_type_id} value={record.notes_type_id}>{record.notes_type}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Item
                                name="Language"
                                label="Language"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    style={{ width: 223 }}
                                    placeholder="Select language"
                                    optionFilterProp="children"
                                    onChange={event => setSelectedProgram(event)}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    // onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {getProgramType.map(record => (
                                        <Option key={record.language_id} value={record.language_id}>{record.language_name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Row>
                        <Form.Item
                            name="Content"
                            label="Content"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <TextArea rows={5} onChange={event => setSelectedContent(event.target.value)} style={{ backgroundColor: "#222211", color: "#cccccc" }} />
                        </Form.Item>
                    </div>
                    <Form.Item className="modal-buttons" >
                    <Button  className="note-close" onClick={handleCancel}>
                            Close
                        </Button>
                        <Button type="primary" className="note-submit" htmlType="submit" onClick={handleOk}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
    );
}
export default FormDetails;