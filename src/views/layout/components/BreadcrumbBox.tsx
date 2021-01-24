import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { IMenuLink, menus } from '@/router/menu';

function findMenuPath(menuArray: IMenuLink[], menupath: string): IMenuLink[] {
    for (var i = 0; i < menuArray.length; i++) {
        var curMenu = menuArray[i];
        if (curMenu.children) {
            var result = findMenuPath(curMenu.children, menupath);
            if (result.length > 0) {
                result.push(curMenu);
                return result;
            }
        }

        if (curMenu.path === menupath)
            return [curMenu];
    }
    return [];
}

const BreadcrumbBox: React.FC = () => {
    const location = useLocation();
    const homeView: IMenuLink = menus[0];
    const activedMenus = findMenuPath(menus, location.pathname);
    if (location.pathname !== homeView.path) {
        activedMenus.push(homeView);
    }
    return (
        <Breadcrumb style={{ color: '#333' }}>
            {activedMenus.reverse().map((item, index) => (
                <Breadcrumb.Item><Link to={item.path}>{item.title}</Link></Breadcrumb.Item>
            ))}
        </Breadcrumb>
    )
}
export default BreadcrumbBox