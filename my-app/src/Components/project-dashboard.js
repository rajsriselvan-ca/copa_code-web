import React, { useState, useEffect } from 'react'
import { Layout, Menu, Card, Col, Row, Input } from 'antd';
import '../Styles/dashboard.css';
import { getNotesType } from '../Api/dashboard';
import { wrap } from 'lodash';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function ProjectDashBoard() {
    const [getNotesCategory, setNotesCategory] = useState([]);

    useEffect(async () => {
        await getNotesType().then(response => {
            setNotesCategory(response.data);
        })
    }, [])

    const onSearch = value => console.log(value);


 const lis = [ "2", "4","5","3","5","3","5","3","5","3","5","3"]

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
                    <Search placeholder="Search Notes here.." className="search-bar"
                     enterButton={false} allowClear onSearch={onSearch} />
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
            <span className="footer"><small>Created by Raj Sri Selvan</small></span>
        </Layout>
    )
}
export default ProjectDashBoard;