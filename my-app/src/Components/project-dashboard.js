import React, { useState, useEffect } from 'react'
import { Layout, Menu, Card, Input, Button} from 'antd';
import {PlusOutlined }from '@ant-design/icons';
import { notificationContent } from "../Shared Files/notification";
import "bootstrap-icons/font/bootstrap-icons.css";
import '../Styles/dashboard.css';
import { getNotesType, getNotes, getAllNotes, deleteNote } from '../Api/dashboard';
import FormDetails from "../Components/modal";

const { Header, Content } = Layout;
const { Search } = Input;

function ProjectDashBoard() {
    const [getNotesCategory, setNotesCategory] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState('1');
    const [noteList, setNoteList] = useState([]);
    const [allNotesList, setEntireNotesList] = useState([]);
    const [editContent, setEditContent] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showIcon, setIcon] = useState(<i className="bi bi-file-earmark-code"></i>);

    const fetchData = async () => {
        const incomingNotesType = await getNotesType();
        setNotesCategory(incomingNotesType.data);
        const incomingNotes = await getNotes(selectedTab);
        setNoteList(incomingNotes.data)
        const incomingEntireNotes = await getAllNotes();
        setEntireNotesList(incomingEntireNotes.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    function setCardsIcon (key) {
        switch (key) {
            case "1" :
                return setIcon(<i className="bi bi-file-earmark-code"></i>);
            case "2" : 
                return setIcon(<i className="bi bi-stack"></i>);
            case "3" : 
                return setIcon(<i className="bi bi-github"></i>);
            case "4" : 
                return setIcon(<i className="bi bi-cloud"></i>);
            case "5" : 
                return setIcon(<i className="bi bi-clipboard-check"></i>);
            case "6" : 
                return setIcon(<i className="bi bi-file-text"></i>);
        }
    }

    const handleTabSelection = async (key) => {
      setCardsIcon(key);
      const incomingNotes = await getNotes(key);
      setSelectedTab(key);
      setNoteList(incomingNotes.data);
    }

    const showModal = (code, record) => {
        if(code === "create") {
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
        const id = record.note_id;
        await deleteNote(id).then(response => {
            if(response.data == "success") return notificationContent(response.data, "deleteConfirmation");
            else return notificationContent(response.data, "deleteConfirmation");
        });
        fetchData();
    }

    const searchHandler = (value) => {
        setSearchTerm(value);
        if(value !== "") {
            const newList = allNotesList.filter(record => {
                return Object.values(record).join(" ").toLowerCase().includes(value.toLowerCase());
            });
            setSearchResult(newList);
        } else {
            setSearchResult(noteList);
        }
    }

    return (
        <Layout className="dashboard-container">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="user-logo" style={{ color: "white" }}>Raju Pattu</div>
                {<Menu theme="dark" color="red" mode="horizontal" defaultSelectedKeys={[selectedTab]}>
                    {getNotesCategory.map((data) => (
                         <Menu.Item key={data.notes_type_id} onClick={event => handleTabSelection(event.key)}>{data.notes_type}</Menu.Item>
                    ))}
                </Menu>}
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ minHeight: 380 }}>
                    <div className="search-container">
                    <Search placeholder="Search Your Notes here.." className="search-bar"
                     enterButton={false} allowClear  onChange={event => searchHandler(event.target.value)} />
                   <Button type="primary" className="add-button" onClick={event => showModal("create")} icon={<PlusOutlined />} size={"middle"} />
                    </div>
                    <div className="slate-board" >
                    { searchTerm.length > 1 ? searchResult.map((record, index) => (
                            <span className="cards-container" key={index}>
                                <Card key={index} className="cards" onClick={event => showModal("edit", record)}  bordered={false}>
                                    <div><span>{showIcon}</span>
                                    <span className="title-frame"><p><b>{record.note_title}</b></p></span></div>
                                    <div className="description-frame"><p className="card-description">{record.content}</p></div>
                                </Card>
                                <div className="delete-component" onClick={event => handleDelete(record)}><i className="bi bi bi-trash"></i></div>
                                </span>
                        )) : noteList.map((record, index) => (
                            <span className="cards-container" key={index}>
                                <Card key={index} className="cards" onClick={event => showModal("edit", record)}  bordered={false}>
                                    <div><span>{showIcon}</span>
                                    <span className="title-frame"><p><b>{record.note_title}</b></p></span></div>
                                    <div className="description-frame"><p className="card-description">{record.content}</p></div>
                                </Card>
                                <div className="delete-component" onClick={event => handleDelete(record)}><i className="bi bi bi-trash"></i></div>
                                </span>
                        ))}
                    </div>
                </div>
            </Content>
            {isModalVisible && <FormDetails visiblity={isModalVisible} gridData={fetchData} edit={editContent} cancel={onCancel} />} 
            <span className="footer"><small>Created by Raj Sri Selvan</small></span>
        </Layout>
    )
}
export default ProjectDashBoard;