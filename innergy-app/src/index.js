import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import warehouseImportReducer from './WarehouseImport/WarehouseImportReducer';
import { Provider } from 'react-redux';


const store = createStore(warehouseImportReducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);



