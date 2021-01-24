import React, { Suspense, lazy, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { NoMatchPage, PageChangeLoading } from '@/utils';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { useUIStore } from '@/hooks';
import "./RootContainer.less";
import { Tags, Sidebar, TopHeader } from '.';
import { routes } from '@/router/routes';

const { Content, Footer } = Layout;
interface ChildrenProps {
    children?: ReactNode;
}

const AuthorizedComponents: React.FC<ChildrenProps> = (props: ChildrenProps) => {
    return (
        <Layout className="app-layout">
            <Sidebar />
            <Layout>
                <TopHeader />
                <Tags />
                <Content>
                    <Suspense fallback={<PageChangeLoading />}>
                        <Switch>
                            <Route path="/dashboard" component={lazy(() => import('@/views/Dashboard'))} />
                            {routes.map(ele => <Route render={() => <ele.component />} key={ele.path} path={ele.path} />)}
                            <Redirect from="/" exact to="/dashboard" />
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