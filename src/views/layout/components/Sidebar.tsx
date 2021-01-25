import React, { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useUIStore } from '@/hooks';
import { observer } from 'mobx-react';
import { menus } from '@/router/menu';
import MenuIcon from './MenuIcon';
import './Sidebar.less';
import { routes } from '@/router/routes';
const findMenu: any | undefined = (menuArray: Array<any>, menupath: any) => {
    for (var i = 0; i < menuArray.length; i++) {
        var curMenu = menuArray[i];
        if (curMenu.children) {
            var result = findMenu(curMenu.children, menupath);
            if (result) {
                return result;
            }
        }

        if (curMenu.path === menupath)
            return curMenu;
    }
    return undefined;
}
const Siderbar: React.FC = observer(() => {

    const defaultLogoBrandName = "React Antd Admin";
    const shortLogoBrandName = "商户";

    const location = useLocation();
    const uiStore = useUIStore();

    // 设置默认激活的菜单
    const defaultSelectedKeys = [location.pathname];
    console.log('Default Selected Keys:' + location.pathname);

    // 设置默认的tag
    var currentActivedMenu = findMenu(menus, location.pathname);
    if (currentActivedMenu) {
        const { path, title } = currentActivedMenu;
        uiStore.addTag({ path, title });
    }

    const [logoBrandName, setLogoBrandName] = useState(defaultLogoBrandName);
    useEffect(() => {
        console.log("Sidebar:" + uiStore.siderCollapsed)
        setLogoBrandName(uiStore.siderCollapsed ? shortLogoBrandName : defaultLogoBrandName)
    }, [uiStore.siderCollapsed]);

    // 点击之后加入页签
    const handClickTag = (currentLink: { path: any; title: any; }) => {
        const { path, title } = currentLink;
        var matchedRoute = routes.filter((route) => route.path === path);
        if (matchedRoute.length === 1) {
            let obj = { path, title, component: matchedRoute[0].component };
            // this.props.addTag(parent ? Object.assign({}, obj, { parent: parent.title }) : obj);
            uiStore.addTag(obj);
        }
        else if (matchedRoute.length === 0) {
            let obj = { path, title };
            // this.props.addTag(parent ? Object.assign({}, obj, { parent: parent.title }) : obj);
            uiStore.addTag(obj);
        }
        else {
            let obj = { path, title, component: <span>Route 配置错误, 找到多个相同的path</span> };
            uiStore.addTag(obj);
        }

        // for (let i = 0; i < routes.length; i++) {
        //     if (path === routes[i].path) {
        //         let obj = { path, title, component: routes[i].component };
        //         // this.props.addTag(parent ? Object.assign({}, obj, { parent: parent.title }) : obj);
        //         uiStore.addTag(obj);
        //     }
        // }
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
                selectedKeys={[location.pathname]}
                style={{ borderRight: 0 }}
            >
                {renderMenu(menus)}
            </Menu>
        </Sider>
    )
})
export default Siderbar
