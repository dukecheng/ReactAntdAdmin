import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import {
    HomeOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useUIStore } from '@/hooks';

const Siderbar: React.FC = () => {

    const defaultLogoBrandName = "React Antd Admin";
    const shortLogoBrandName = "商户";

    const uiStore = useUIStore();

    const { siderCollapsed } = uiStore;


    const [logoBrandName, setLogoBrandName] = useState(defaultLogoBrandName);
    useEffect(() => {
        setLogoBrandName(siderCollapsed ? shortLogoBrandName : defaultLogoBrandName)
    }, [siderCollapsed]);

    return (
        <Sider trigger={null} collapsible collapsed={siderCollapsed}>
            <div className="logo">
                <Link to="/"><span>{logoBrandName}</span></Link>
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
    )
}
export default Siderbar
