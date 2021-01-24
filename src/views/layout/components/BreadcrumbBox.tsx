import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
const BreadcrumbBox: React.FC = () => {
    return (
        <Breadcrumb style={{ color: '#333' }}>
            <Breadcrumb.Item><Link to="/react">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/react">List</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/react">App</Link></Breadcrumb.Item>
        </Breadcrumb>
    )
}
export default BreadcrumbBox