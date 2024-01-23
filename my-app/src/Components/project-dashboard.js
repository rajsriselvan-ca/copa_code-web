import React, { useState, useEffect } from 'react'
import { Layout, Menu, Card, Input, Button, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { notificationContent } from "../Shared Files/notification";
import "bootstrap-icons/font/bootstrap-icons.css";
import '../Styles/dashboard.css';
import { getNotesType, getNotes, getAllNotes, deleteNote } from '../Api/dashboard';
import FormDetails from "../Components/modal";
import SessionModal from "../Components/session-timeout-modal";
import axios from 'axios'

const { Header, Content } = Layout;
const { Search } = Input;

function ProjectDashBoard({ setUser }) {
    let history = useHistory();
    const [getNotesCategory, setNotesCategory] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSessionModalVisible, setSessionModalVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState('1');
    const [noteList, setNoteList] = useState([]);
    const [allNotesList, setEntireNotesList] = useState([]);
    const [editContent, setEditContent] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [userName, setUserName] = useState("");
    const [showIcon, setIcon] = useState(<i className="bi bi-file-earmark-code"></i>);

    const fetchData = async () => {
        try {
            const params = {
                user_id: localStorage.getItem('userID'),
                selectedTab: selectedTab,
            }
            setUserName(localStorage.getItem('userName'))
            const incomingNotesType = await getNotesType();
            setNotesCategory(incomingNotesType.data);
            const incomingNotes = await getNotes(params);
            setNoteList(incomingNotes.data)
            const incomingEntireNotes = await getAllNotes(params);
            setEntireNotesList(incomingEntireNotes.data);
        } catch {
            setSessionModalVisible(true);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function setCardsIcon(key) {
        switch (key) {
            case "1":
                return setIcon(<i className="bi bi-file-earmark-code"></i>);
            case "2":
                return setIcon(<i className="bi bi-stack"></i>);
            case "3":
                return setIcon(<i className="bi bi-github"></i>);
            case "4":
                return setIcon(<i className="bi bi-cloud"></i>);
            case "5":
                return setIcon(<i className="bi bi-clipboard-check"></i>);
            case "6":
                return setIcon(<i className="bi bi-file-text"></i>);
        }
    }

    const handleTabSelection = async (key) => {
        try {
            const params = {
                user_id: localStorage.getItem('userID'),
                selectedTab: key,
            }
            setCardsIcon(key);
            const incomingNotes = await getNotes(params);
            setSelectedTab(key);
            setNoteList(incomingNotes.data);
        } catch (error) {
            setSessionModalVisible(true); // handling session time out error
        }

    }

    const showModal = (code, record) => {
        if (code === "create") {
            setIsModalVisible(true);
        }
        else if (code === "edit") {
            setEditContent(record);
            setIsModalVisible(true);
        }
    }

    const onCancel = (status) => {
        setIsModalVisible(status);
        setEditContent([]);
    }

    const handleDelete = async (record) => {
        try {
            const id = record.note_id;
            await deleteNote(id).then(response => {
                if (response.data == "success") return notificationContent(response.data, "deleteConfirmation");
                else return notificationContent(response.data, "deleteConfirmation");
            });
        } catch (error) {
            setSessionModalVisible(true);
        }
        fetchData();
    }

    const searchHandler = (value) => {
        setSearchTerm(value);
        if (value !== "") {
            const newList = allNotesList.filter(record => {
                return Object.values(record).join(" ").toLowerCase().includes(value.toLowerCase());
            });
            setSearchResult(newList);
        } else {
            setSearchResult(noteList);
        }
    }

    const logoutHandler = () => {
        localStorage.clear();
        delete axios.defaults.headers.common['Authorization']
        setUser({ auth: false, name: '' })
        history.push('/');
    }

    return (
        <Layout className="dashboard-container">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className='logo-frame'>
                    <div className="user-logo" style={{ color: "white" }}><span><i className="bi bi-person-circle"></i></span>
                        <span className="user-name">{userName}</span></div>
                    <div className='logout-outer'><div className='logout-inner' onClick={logoutHandler}>Logout</div></div>
                </div>
                {<Menu theme="dark" color="red" mode="horizontal" defaultSelectedKeys={[selectedTab]}>
                    {getNotesCategory.map((data) => (
                        <Menu.Item key={data.notes_type_id} onClick={event => handleTabSelection(event.key)}>{data.notes_type}</Menu.Item>
                    ))}
                </Menu>}
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, height: '50%', minHeight: '89vh' }}>
                <div className="site-layout-background">
                    <div className="search-container">
                        <Search placeholder="Search here" className="search-bar"
                            enterButton={false} allowClear onChange={event => searchHandler(event.target.value)} />
                        <Button type="primary" className="add-button" onClick={event => showModal("create")} icon={<PlusOutlined />} size={"middle"} />
                    </div>
                    <div className="slate-board" >
                        {noteList.length <= 0 ? <div className="no-data-message">
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} imageStyle={{ height: 50, width: 100 }} />
                        </div> : searchTerm.length > 1 ? searchResult.map((record, index) => (
                            <div className="cards-container" key={index}>
                                <Card key={index} className="cards" onClick={event => showModal("edit", record)} bordered={false}>
                                    <div><span>{showIcon}</span>
                                        <span className="title-frame"><p><b>{record.note_title}</b></p></span></div>
                                    <div className="description-frame"><p className="card-description">{record.content}</p></div>
                                </Card>
                                <div className="delete-component" onClick={event => handleDelete(record)}><i className="bi bi bi-trash"></i></div>
                            </div>
                        )) : noteList.map((record, index) => (
                            <div className="cards-container" key={index}>
                                <Card key={index} className="cards" onClick={event => showModal("edit", record)} bordered={false}>
                                    <div><span>{showIcon}</span>
                                        <span className="title-frame"><p><b>{record.note_title}</b></p></span></div>
                                    <div className="description-frame"><p className="card-description">{record.content}</p></div>
                                </Card>
                                <div className="delete-component" onClick={event => handleDelete(record)}><i className="bi bi bi-trash"></i></div>
                            </div>
                        ))}
                    </div>
                </div>
            </Content>
            {isSessionModalVisible && <SessionModal setUser={setUser} history={history} visiblity={isSessionModalVisible} />}
            {isModalVisible && <FormDetails setSessionModalVisible={setSessionModalVisible} visiblity={isModalVisible} gridData={fetchData} edit={editContent} cancel={onCancel} />}
            <a className="footer" target='_blank' href='http://www.linkedin.com/in/rajsriselvan'><small>Created by Raj Sri Selvan</small></a>
        </Layout>
    )
}
export default ProjectDashBoard;