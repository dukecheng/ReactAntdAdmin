import React, { useState } from 'react';
import { render } from 'react-dom';
import { Button, ConfigProvider, DatePicker, message } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';

moment.locale('zh-cn');

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Button type="primary">Button</Button>
    </ConfigProvider>
  );
};

export default App;
