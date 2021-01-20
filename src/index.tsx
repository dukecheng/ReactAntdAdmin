import React from 'react';
import ReactDOM from 'react-dom';
import Loadable, { OptionsWithoutRender } from 'react-loadable';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoadingPage } from './utils';

const loadableOptions: OptionsWithoutRender<unknown> = {
  loader: () => import('./App'),
  loading: LoadingPage,
};

const Loading = Loadable(loadableOptions);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(
  <Loading />,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
