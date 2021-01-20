import React, { Suspense, lazy, useEffect, useState, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { NoMatchPage, PageChangeLoading } from '@/utils';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Avatar, Breadcrumb, Dropdown, Layout, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import {
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useUIStore } from '@/hooks';
import "./root-container.less";

const { Header, Content, Footer } = Layout;
interface ChildrenProps {
    children?: ReactNode;
}

const RootContainer: React.FC<ChildrenProps> = observer((props: ChildrenProps) => {
    const history = useHistory();

    const uiStore = useUIStore();

    const [siderCollapsed, setSiderCollapsed] = useState(false);
    const defaultLogoBrandName = "React Antd Admin";
    const shortLogoBrandName = "商户";
    const [logoBrandName, setLogoBrandName] = useState(defaultLogoBrandName);

    const toggleSiderCollapsed = () => {
        setSiderCollapsed(!siderCollapsed);
    };

    useEffect(() => {
        setLogoBrandName(siderCollapsed ? shortLogoBrandName : defaultLogoBrandName)
    }, [siderCollapsed]);

    const logout = () => {
        // accountLogout(uiStore.token);
        // uiStore.removeToken();
        history.push('/login');
    }

    const profileMenu = (
        <Menu onClick={logout}>
            <Menu.Item key='1'>退出</Menu.Item>
        </Menu>
    );

    return (
        <Layout className="app-layout">
            <Sider trigger={null} collapsible collapsed={siderCollapsed}>
                <div className="logo">
                    <span>{logoBrandName}</span>
                </div>
                <Menu theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ borderRight: 0 }}
                >
                    <Menu.Item key="1" icon={<HomeOutlined />}><Link to="/dashboard">首页</Link></Menu.Item>
                    <SubMenu key="sub1" title="用户管理" icon={<UserOutlined />}>
                        <Menu.Item key="2"><Link to="/table1">Table</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/table2">Tabke2</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout>
                <Header>
                    <div className="header-left-wrapper">
                        {React.createElement(siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'sider-trigger',
                            onClick: toggleSiderCollapsed,
                        })}
                        <Breadcrumb style={{ color: '#fff' }}>
                            <Breadcrumb.Item><Link to="/react">Home</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to="/react">List</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to="/react">App</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Dropdown overlay={profileMenu}>
                        <a className="profile-link" onClick={e => e.preventDefault()}>
                            欢迎您，{uiStore.user_name}
                            <Avatar style={{ backgroundColor: '#87d068', }} icon={<UserOutlined />} />
                        </a>
                    </Dropdown>
                </Header>
                <Content>
                    <Suspense fallback={<PageChangeLoading />}>
                        <Switch>
                            <Route path="/dashboard" component={lazy(() => import('@views/dashboard'))} />
                            <Route path="/" exact>
                                <Redirect to="/dashboard" />
                            </Route>
                            <Route component={NoMatchPage} />
                        </Switch>
                        {props.children}
                    </Suspense>
                </Content>
                <Footer>
                    <span>Build Version: {process.env.REACT_APP_BUILD_VERSION} Run Mode: {process.env.REACT_APP_RUN_MODE}</span>
                </Footer>
            </Layout>
        </Layout>
    )
})

export default RootContainer;