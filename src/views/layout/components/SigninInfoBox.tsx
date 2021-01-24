import React, { useEffect } from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useUIStore } from '@/hooks';
import FullScreen from '@/components/FullScreen';

const SigninInfoBox: React.FC = () => {
    const history = useHistory();
    const uiStore = useUIStore();
    const siderCollapsed = uiStore.siderCollapsed;

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
        <>
            <FullScreen />
            <span className="welcome-info" style={{ color: '#fff' }}>欢迎您，{uiStore.user_name}</span>
            <Dropdown overlay={profileMenu}>
                <Avatar style={{ backgroundColor: '#87d068', }} icon={<UserOutlined />} />
            </Dropdown>
        </>
    )
}
export default SigninInfoBox