import React, { useState, useEffect } from 'react'
import { Layout, Menu, Card, Input, Button, Empty, Spin } from 'antd';
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
    const [showLoader, setLoader] = useState(true);

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
            setLoader(false);
        } catch {
            setSessionModalVisible(true);
        }
    }
    const handleBackButton = () => {
        logoutHandler();
      };

    useEffect(() => {
        fetchData();
        window.addEventListener('popstate', handleBackButton);
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

    let handleTabSelection = async (key) => {
        setLoader(true);
        try {
            const params = {
                user_id: localStorage.getItem('userID'),
                selectedTab: key,
            }
            setCardsIcon(key.toString());
            const incomingNotes = await getNotes(params);
            setSelectedTab(key.toString());
            setNoteList(incomingNotes.data);
            setLoader(false);
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
        setLoader(true);
        try {
            const id = record.note_id;
            await deleteNote(id).then(response => {
                if (response.data == "success") {
                    notificationContent(response.data, "deleteConfirmation");
                    setLoader(false);
                } 
                else {
                    return notificationContent(response.data, "deleteConfirmation");
                }
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

    const formatDate = (dateString) => {
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('-').map(part => parseInt(part, 10));
        const [hour, minute] = timePart.split(':').map(part => parseInt(part, 10));
        const formattedMonth = new Date(year, month - 1, day).toLocaleString('default', { month: 'short' });

        const formattedDate = `${formattedMonth} ${day}/${year.toString().slice(-2)}`;
        const formattedTime = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour < 12 ? 'am' : 'pm'}`;
        return `${formattedDate} ${formattedTime}`;
      };

    return (
        <Layout className="dashboard-container">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className='logo-frame'>
                    <div className="user-logo" style={{ color: "white" }}><span><i className="bi bi-person-circle"></i></span>
                        <span className="user-name">{userName}</span></div>
                    <div className='logout-outer'><div className='logout-inner' onClick={logoutHandler}>Logout</div></div>
                </div>
                {<Menu theme="dark" color="red" mode="horizontal" selectedKeys={[selectedTab]}>
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
                    <Spin size="large" spinning={showLoader}>
                    <div className="slate-board" >
                        {!searchTerm.length && noteList.length <= 0 ? <div className="no-data-message">
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} imageStyle={{ height: 50, width: 100 }} />
                        </div> : searchTerm.length > 1 ? searchResult.map((record, index) => (
                            <div className="cards-container" key={index}>
                                <Card key={index} className="cards" onClick={event => showModal("edit", record)} bordered={false}>
                                    <div><span>{showIcon}</span>
                                        <span className="title-frame"><p><b>{record.note_title}</b></p></span></div>
                                    <div className="description-frame"><p className="card-description">{record.content}</p></div>
                                    <div className='formatedDate-card'>{formatDate(record.submission_date)}</div>
                                </Card>
                                <div className="delete-component" onClick={event => handleDelete(record)}><i className="bi bi bi-trash"></i></div>
                            </div>
                        )) : noteList.map((record, index) => (
                            <div className="cards-container" key={index}>
                                <Card key={index} className="cards" onClick={event => showModal("edit", record)} bordered={false}>
                                    <div><span>{showIcon}</span>
                                        <span className="title-frame"><p><b>{record.note_title}</b></p></span></div>
                                    <div className="description-frame"><p className="card-description">{record.content}</p></div>
                                    <div className='formatedDate-card'>{formatDate(record.submission_date)}</div>
                                </Card>
                                <div className="delete-component" onClick={event => handleDelete(record)}><i className="bi bi bi-trash"></i></div>
                            </div>
                        ))}
                    </div>
                    </Spin>
                </div>
            </Content>
            {isSessionModalVisible && <SessionModal setUser={setUser} history={history} visiblity={isSessionModalVisible} />}
            {isModalVisible && <FormDetails selectedTab={selectedTab} setEntireNotesList={setEntireNotesList} handleTabSelection={handleTabSelection} setSessionModalVisible={setSessionModalVisible} visiblity={isModalVisible} gridData={fetchData} edit={editContent} cancel={onCancel} />}
            <a className="footer" target='_blank' href='http://www.linkedin.com/in/rajsriselvan'><small>Developed by Raj Sri Selvan</small></a>
        </Layout>
    )
}
export default ProjectDashBoard;