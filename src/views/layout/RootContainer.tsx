import React, { Suspense, lazy, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { NoMatchPage, PageChangeLoading } from '@/utils';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Avatar, Breadcrumb, Dropdown, Layout, Menu } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useUIStore } from '@/hooks';
import "./RootContainer.less";
import FullScreen from '@/components/FullScreen';
import { Siderbar } from '.';

const { Header, Content, Footer } = Layout;
interface ChildrenProps {
    children?: ReactNode;
}

const AuthorizedComponents: React.FC<ChildrenProps> = (props: ChildrenProps) => {
    const history = useHistory();
    const uiStore = useUIStore();
    const { siderCollapsed } = uiStore;
 
    const toggleSiderCollapsed = () => {
        uiStore.setSiderCollapse(!siderCollapsed);
    };



    const logout = () => {
        // accountLogout(uiStore.token);
        uiStore.removeToken();
        history.push('/login');
    }

    // useEffect(() => {
    //     console.log("RootContainer: isAuthorized:" + isAuthorized)
    //     if (!isAuthorized) {
    //         history.push('/');
    //     }
    // }, [isAuthorized])

    const profileMenu = (
        <Menu onClick={logout}>
            <Menu.Item key='2'>个人信息</Menu.Item>
            <Menu.Item key='1'>退出</Menu.Item>
        </Menu>
    );

    return (
        <Layout className="app-layout">
            <Siderbar />
            <Layout>
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
                <Content>
                    <Suspense fallback={<PageChangeLoading />}>
                        <Switch>
                            <Route path="/dashboard" component={lazy(() => import('@/views/Dashboard'))} />
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
}

const RootContainer: React.FC<ChildrenProps> = observer((props: ChildrenProps) => {
    const uiStore = useUIStore();
    return uiStore.isAuthorized ? AuthorizedComponents(props) : <Redirect to={'/login'} />;
})

export default RootContainer;