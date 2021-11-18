import React, {useState, useEffect} from 'react'
import { Layout, Menu } from 'antd';
import '../Styles/dashboard.css';
import { getNotesType } from '../Api/dashboard';

const { Header, Content, Footer } = Layout;

function ProjectDashBoard() {
    const [getNotesCategory, setNotesCategory] = useState([]);

 useEffect(async() => {
    await getNotesType().then(response => {
        setNotesCategory(response.data);
    })
 }, [])
 
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="user-logo" style={{ color: "white" }}>Raju Pattu</div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    {getNotesCategory.map((data) => {
                        return <Menu.Item key={data.notes_type_id}>{data.notes_type}</Menu.Item>;
                    })}
                </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    {""}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Created by RAJ SRI SELVAN</Footer>
        </Layout>
    )
}
export default ProjectDashBoard;