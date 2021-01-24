import React, { useEffect } from 'react';
import { Layout } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useUIStore } from '@/hooks';
import { observer } from 'mobx-react';
import { BreadcrumbBox, SigninInfoBox } from '.';

const { Header } = Layout;

const TopHeader: React.FC = observer(() => {
    const uiStore = useUIStore();
    const siderCollapsed = uiStore.siderCollapsed;

    const toggleSiderCollapsed = () => {
        uiStore.setSiderCollapse(!siderCollapsed);
    };

    useEffect(() => {
        console.log("TopHeader:" + siderCollapsed)
    }, [siderCollapsed]);


    return (
        <Header>
            <div className="header-left-wrapper">
                {React.createElement(siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'sider-trigger',
                    onClick: toggleSiderCollapsed,
                })}
                <BreadcrumbBox />
            </div>
            <div className="header-right-wrapper">
                <SigninInfoBox />
            </div>
        </Header>
    )
})
export default TopHeader