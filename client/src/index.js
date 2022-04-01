// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reduxStore/reducers'
import thunk from 'redux-thunk';
import App from './App';
import './index.css';
// 43:11

// redux store
const store = createStore(reducers, compose(applyMiddleware(thunk)));

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(

  <Provider store={store}>
    <App />
  </Provider>

);

// ReactDOM.createRoot(
//   document.querySelector('root').render(
//     <React.StrictMode>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </React.StrictMode>
//   )
// );