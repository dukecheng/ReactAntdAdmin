import React, { useState, Suspense } from 'react';
import { render } from 'react-dom';
import { Button, ConfigProvider, DatePicker, message } from 'antd';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import { PageChangeLoading, NoMatchPage } from './utils';
import RootContainer from './containers/root-container';
import { AppStore } from './stores/app';
import { Provider } from 'mobx-react';
const Login = () => <h3>Login</h3>;
moment.locale('zh-cn');
const defaultStore = new AppStore()

const App: React.FC = (props: any) => {
  return (
    <ConfigProvider locale={zhCN}>
      {/* <Button type="primary">Button</Button> */}
      <Provider store={defaultStore}>
        <BrowserRouter>
          <Suspense fallback={<PageChangeLoading />}>
            <Switch>
              <Route path="/404" component={NoMatchPage} />
              <Route path="/login" component={Login} />
              <Route path="/" >
                <RootContainer {...props} >
                  {props.children}
                </RootContainer>
              </Route>
              <Route component={NoMatchPage} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
