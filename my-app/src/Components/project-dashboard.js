import React, { useState, useEffect } from 'react'
import { Layout, Menu, Card, Input, Button } from 'antd';
import {PlusOutlined }from '@ant-design/icons';
import '../Styles/dashboard.css';
import { getNotesType, getNotes } from '../Api/dashboard';
import FormDetails from "../Components/modal";

const { Header, Content } = Layout;
const { Search } = Input;

function ProjectDashBoard() {
    const [getNotesCategory, setNotesCategory] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState('1');
    const [noteList, setNoteList] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const incomingNotesType = await getNotesType();
            setNotesCategory(incomingNotesType.data);
            const incomingNotes = await getNotes(selectedTab);
            setNoteList(incomingNotes.data)
        }
        fetchData();
    }, []);

    const handleTabSelection = async (key) => {
      const incomingNotes = await getNotes(key);
      setSelectedTab(key);
      setNoteList(incomingNotes.data);
    }

    const showModal = () => {
        setIsModalVisible(true);
      };

      const onCancel = (status) => {
        setIsModalVisible(status);
    }

    const onSearch = value => console.log(value);

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
                     enterButton={false} allowClear onSearch={onSearch} />
                   <Button type="primary" className="add-button" onClick={showModal} icon={<PlusOutlined />} size={"middle"} />
                    </div>
                    <div className="slate-board" >
                        {noteList.map((record, index) => (
                            <div className="cards-container" key={index}>
                                <Card title={record.note_title} key={index} className="cards"  bordered={false}>
                                     <p>Content : {record.content}</p>
                                </Card>
                                </div>
                        ))}
                    </div>
                </div>
            </Content>
             <FormDetails data={isModalVisible} cancel={onCancel} />
            <span className="footer"><small>Created by Raj Sri Selvan</small></span>
        </Layout>
    )
}
export default ProjectDashBoard;