import { createStore, compose, applyMiddleware } from 'redux';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import reducers from './reduxStore/reducers';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const store = createStore(reducers, compose(applyMiddleware(thunk)));
// redux store


root.render(

  <Provider store={store}>
    <App />
  </Provider>

  // now <App /> is successfully connected with Redux Store...

);