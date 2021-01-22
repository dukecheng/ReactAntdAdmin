import React, { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useUIStore } from '@/hooks';
import { observer } from 'mobx-react';
import { menus } from '@/router/menu';
import MenuIcon from './MenuIcon';
import './Sidebar.less';
import { routes } from '@/router/routes';

const Siderbar: React.FC = observer(() => {

    const defaultLogoBrandName = "React Antd Admin";
    const shortLogoBrandName = "商户";

    const uiStore = useUIStore();

    const [logoBrandName, setLogoBrandName] = useState(defaultLogoBrandName);
    useEffect(() => {
        console.log("Sidebar:" + uiStore.siderCollapsed)
        setLogoBrandName(uiStore.siderCollapsed ? shortLogoBrandName : defaultLogoBrandName)
    }, [uiStore.siderCollapsed]);

    // 点击之后加入页签
    const handClickTag = (currentLink: { path: any; title: any; }) => {
        const { path, title } = currentLink;
        for (let i = 0; i < routes.length; i++) {
            if (path === routes[i].path) {
                let obj = { path, title, component: routes[i].component };
                // this.props.addTag(parent ? Object.assign({}, obj, { parent: parent.title }) : obj);
                uiStore.addTag(obj);
            }
        }
    }

    // 递归渲染菜单
    const renderMenu = (data: Array<any>) => {
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu
                        key={item.path}
                        icon={<MenuIcon name={item.icon} />}
                        title={
                            <span>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {renderMenu(item.children)}
                    </SubMenu>
                );
            }
            return (

                <Menu.Item key={item.path} icon={<MenuIcon name={item.icon} />}>
                    <Link to={item.path} onClick={() => handClickTag(item)}>
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>

            );
        });
    };

    return (
        <Sider trigger={null} collapsible collapsed={uiStore.siderCollapsed}>
            <div className="logo">
                <Link to="/"><span>{logoBrandName}</span></Link>
            </div>
            <Menu theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ borderRight: 0 }}
            >
                {/* <Menu.Item key="1" icon={<HomeOutlined />}><Link to="/dashboard">首页</Link></Menu.Item>
                <SubMenu key="sub1" title="用户管理" icon={<UserOutlined />}>
                    <Menu.Item key="2"><Link to="/table1">Table</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/table2">Tabke2</Link></Menu.Item>
                </SubMenu> */}
                {renderMenu(menus)}
            </Menu>
        </Sider>
    )
})
export default Siderbar
