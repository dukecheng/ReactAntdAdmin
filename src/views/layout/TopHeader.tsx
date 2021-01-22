import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Breadcrumb, Dropdown, Layout, Menu } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useUIStore } from '@/hooks';
import FullScreen from '@/components/FullScreen';
import { observer } from 'mobx-react';

const { Header } = Layout;

const TopHeader: React.FC = observer(() => {
    const history = useHistory();
    const uiStore = useUIStore();
    const siderCollapsed = uiStore.siderCollapsed;

    const toggleSiderCollapsed = () => {
        uiStore.setSiderCollapse(!siderCollapsed);
    };

    useEffect(() => {
        console.log("TopHeader:" + siderCollapsed)
    }, [siderCollapsed]);

    const logout = () => {
        uiStore.removeToken();
        history.push('/login');
    }

    const profileMenu = (
        <Menu onClick={logout}>
            <Menu.Item key='2'>个人信息</Menu.Item>
            <Menu.Item key='1'>退出</Menu.Item>
        </Menu>
    );
    return (
        <Header>
            <div className="header-left-wrapper">
                {React.createElement(siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'sider-trigger',
                    onClick: toggleSiderCollapsed,
                })}
                <Breadcrumb style={{ color: '#333' }}>
                    <Breadcrumb.Item><Link to="/react">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/react">List</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/react">App</Link></Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="header-right-wrapper">
                <FullScreen />
                <span className="welcome-info" style={{ color: '#fff' }}>欢迎您，{uiStore.user_name}</span>
                <Dropdown overlay={profileMenu}>
                    <a className="profile-link" onClick={e => e.preventDefault()}>
                        <Avatar style={{ backgroundColor: '#87d068', }} icon={<UserOutlined />} />
                    </a>
                </Dropdown>
            </div>
        </Header>
    )
})
export default TopHeader