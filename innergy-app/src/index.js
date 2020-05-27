import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux';
import warehouseImportReducer from './WarehouseImport/WarehouseImportReducer';
import appReducer from './AppReducer';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
   warehouse: warehouseImportReducer,
   app: appReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);



