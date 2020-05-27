import React, { Component } from 'react';
import Warehouse from './Warehouse/Warehouse';
import WarehousesTxt from './WarehousesTxt/WarehousesTxt';
import WarehouseImport from './WarehouseImport/WarehouseImport';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {


  render() {

    return (
      <div className="App container">

        <WarehouseImport />
        {this.props.wrhs.map((warehouse) => (
          <Warehouse
            name={warehouse.name}
            total={warehouse.total}
            items={warehouse.items}
          />
        )
        
        )}
        <WarehousesTxt txt={this.props.wrhsTxt}/>
      </div>
    );
  }
}

const mapStateProps = state => {
  return {
    wrhs: state.warehouses,
    wrhsTxt: state.warehousesTxt
  };
};

export default connect(mapStateProps)(App);
