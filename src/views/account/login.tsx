
import './login.less';

import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useState } from 'react';
import { useUIStore } from '@/hooks';
import { login } from '@/services/account';

const Login: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const [loginButtonLoading, setLoadingButtonLoading] = useState(false);
    const uiStore = useUIStore();
    const handleLogin = (values: any) => {
        const _data = {
            'user_name': values.username,
            'password': values.password
        }
        login(_data).then(res => {
            const result = res.data;
            setLoadingButtonLoading(true);
            uiStore.setAuthorized();
            uiStore.setToken(result.data.token)
            // uiStore.setAccountInfo(result.data)
            uiStore.setExpires(result.data.expires_in)
            props.history.push('/')
        }, error => {
            console.log(error);
        })
    }

    return (
        <div className="login" >
            <div className="login-box">
                <div className="login-title">商户后台管理系统</div>
                <Form
                    onFinish={handleLogin}
                    className="login-form">
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="请输入密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loginButtonLoading}
                        >
                            登 录
              </Button>
                    </Form.Item>
                </Form>
                <div className="build-version">Build Version: {process.env.REACT_APP_BUILD_VERSION} Run Mode: {process.env.REACT_APP_RUN_MODE}</div>
            </div>
        </div >
    )
}

export default Login;