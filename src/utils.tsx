import Loadable, { OptionsWithoutRender } from 'react-loadable';

import React from 'react';

const NoMatchPage = () => <h3>404 - Not found</h3>;

// 通用的过场组件
const LoadingPage = () => (
  <div className="loader-container">
    <div className="loader" />
  </div>
);
// 通用的过场组件
const PageChangeLoading = () => (
  <div id="loader-container">
    <p id="loadingText">Loading</p>
  </div>
);
export { NoMatchPage, LoadingPage, PageChangeLoading };