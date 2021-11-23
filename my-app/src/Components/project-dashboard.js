import React, { useState, useEffect } from 'react'
import { Layout, Menu, Card, Input, Button, Modal } from 'antd';
import {PlusOutlined }from '@ant-design/icons';
import '../Styles/dashboard.css';
import { getNotesType } from '../Api/dashboard';
import { wrap } from 'lodash';
import FormDetails from "../Components/modal";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function ProjectDashBoard() {
    const [getNotesCategory, setNotesCategory] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(async () => {
        await getNotesType().then(response => {
            setNotesCategory(response.data);
        })
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
      };

      const onCancel = (status) => {
        setIsModalVisible(status);
    }

    const onSearch = value => console.log(value);


 const lis = [ "2", "4","5","3","5","3","5","3","5","3","5","3",]

    return (
        <Layout className="dashboard-container">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="user-logo" style={{ color: "white" }}>Raju Pattu</div>
                <Menu theme="dark" color="red" mode="horizontal" defaultSelectedKeys={['1']}>
                    {getNotesCategory.map((data) => {
                        return <Menu.Item key={data.notes_type_id}>{data.notes_type}</Menu.Item>;
                    })}
                </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ minHeight: 380 }}>
                    <div className="search-container">
                    <Search placeholder="Search Your Notes here.." className="search-bar"
                     enterButton={false} allowClear onSearch={onSearch} />
                   <Button type="primary" className="add-button" onClick={showModal} icon={<PlusOutlined />} size={"middle"} />
                    </div>
                    <div className="slate-board" >
                        {lis.map(record => (
                            <div className="cards-container">
                                <Card title="Card title" className="cards"  bordered={false}>
                                    Card content{record}
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