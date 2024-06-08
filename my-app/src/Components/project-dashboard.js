import React, { useState, useEffect } from 'react'
import { notificationContent } from "../Shared Files/notification";
import { Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import AddIcon from '@material-ui/icons/Add';
import Popup from '../Components/popup-form';
import {getEmployeeList, updateEmployee, deleteEmployee, getAllEmployeeList} from  '../Api/dashboard';
import Pagination from '@material-ui/lab/Pagination';
import { useNavigate } from "react-router-dom";


const courseList = [
    {
        notes_type: "Advanced Programming",
        notes_type_id: "1"
    },
    {
        notes_type: "Cloud Computing",
        notes_type_id: "2"
    },
    {
        notes_type: "Web Design",
        notes_type_id: "3"
    },
    {
        notes_type: "Enterprise Systems",
        notes_type_id: "4"
    },
    {
        notes_type: "Applied Systems",
        notes_type_id: "5"
    },
    {
        notes_type: "Business Data",
        notes_type_id: "6"
    },
    {
        notes_type: "Personal Notes",
        notes_type_id: "7"
    },
];

function ProjectDashBoard({ setUser }) {
    let history = useHistory();
    // const [getNotesCategory, setNotesCategory] = useState([]);
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
        // console.log("debug--->>",getNotesCategory )
       
        try {
            const params = {
                user_id: localStorage.getItem('userID'),
                selectedTab: selectedTab,
            }
            setUserName(localStorage.getItem('userName'))
            const incomingNotesType = await getNotesType();
            // setNotesCategory(incomingNotesType.data);
            const incomingNotes = await getNotes(params);
            setNoteList(incomingNotes.data)
            const incomingEntireNotes = await getAllNotes(params);
            setEntireNotesList(incomingEntireNotes.data);
            setLoader(false);
        } catch {
            setSessionModalVisible(true);
        }
        getEmployeeList(params).then(response => {
            const record = response.data.data;
            const count = response.data.totalCount;
            setRecord(record);
            setTotalCount(count);
        })
    }

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

    const formatDate = (dateString) => {
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('-').map(part => parseInt(part, 10));
        const [hour, minute] = timePart.split(':').map(part => parseInt(part, 10));
        const formattedMonth = new Date(year, month - 1, day).toLocaleString('default', { month: 'short' });
      
        const formattedDate = `${formattedMonth} ${day}/${year.toString().slice(-2)}`;
        const formattedTime = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour < 12 ? 'am' : 'pm'}`;
      
        return `${formattedDate} ${formattedTime}`;
      };

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
            console.log("pp----", incomingNotes.data)
            setLoader(false);
        } catch (error) {
            setSessionModalVisible(true); // handling session time out error
        }

    const handleCreateEmployee = (status, title) => {
        setOpenPopup(status);
        setTitle(title);
    }

    const handleEdit = async (newData) => {
        await updateEmployee(newData.Employee_ID, newData).then(response => {
            if(response.data == "success") return notificationContent(response.data, "Update");
            else return notificationContent(response.data, "Update");
        });
        fetchData();
    }

    const handleDelete = async (id) => {
        await deleteEmployee(id).then(response => {
            if(response.data == "success") return notificationContent(response.data, "deleteConfirmation");
            else return notificationContent(response.data, "deleteConfirmation");
        });
        fetchData();
    }

    const handlePage = (event, value) => {
        const params = {
            pageNumber : value == 1 ? 0 : value,
            countToDisplay : displayCount
        }
        getEmployeeList(params).then(response => {
            const record = response.data.data;
            const count = response.data.totalCount;
            setRecord(record);
            setTotalCount(count);
        })
        setPage(value);
    }

    const handleDisplayCount = (value) => {
        setDisplayCount(value);
        const params = {
            pageNumber : page == 1 ? 0 : page,
            countToDisplay : value
        }
        getEmployeeList(params).then(response => {
            const record = response.data.data;
            const count = response.data.totalCount;
            setRecord(record);
            setTotalCount(count);
        })
    }

    const test = () => {
        navigate(encodeURIComponent("/chat"));
    }


    return (
        <Layout className="dashboard-container">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className='logo-frame'>
                    <div className="user-logo" style={{ color: "white" }}><span><i className="bi bi-person-circle"></i></span>
                        <span className="user-name">{userName}</span></div>
                    <div className='logout-outer'><div className='logout-inner' onClick={logoutHandler}>Logout</div></div>
                </div>
                {<Menu theme="dark" color="red" mode="horizontal" selectedKeys={[selectedTab]}>
                    {courseList.map((data) => (
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
            <a className="footer" target='_blank' ><small>2024 Copyright: University of Galway Notes</small></a>
        </Layout>
    )
}
export default ProjectDashBoard;