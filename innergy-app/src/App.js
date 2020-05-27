import React, { Component } from 'react';
import Warehouse from './Warehouse/Warehouse'
import WarehouseImport from './WarehouseImport/WarehouseImport';
import { connect } from 'react-redux';

class App extends Component {

  state = {
    warehouses: [
      {
        name: "magazyn 1",
        total: 40,
        items: [
          { name: "item1", total: 33 },
          { name: "item2", total: 34 }
        ]
      },
      {
        name: "magazyn 2",
        total: 500,
        items: [
          { name: "item33", total: 44 }
        ]
      }
    ],
    csv: ''
  };

  importClicked = (csv) => {
    console.log(csv);
  };

  render() {

    return (
      <div className="App">
        <WarehouseImport importClicked={this.importClicked} />
        {this.state.warehouses.map((warehouse, index) => {
          return (
            <Warehouse
              name={warehouse.name}
              total={warehouse.total}
              items={warehouse.items}
            />
          )
        })}
      </div>
    );
  }
}

const mapStateProps = state => {
  return {
    csv : state.csv,
    warehouses: state.warehouses
  };
};

export default connect(mapStateProps)(App);
