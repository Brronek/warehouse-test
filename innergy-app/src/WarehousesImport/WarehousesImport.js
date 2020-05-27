import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actons';

class WarehouseImport extends React.Component {

    constructor(props) {
        super(props);

        const csv = '# Material inventory initial state as of Jan 01 2018\n'+
        '# New materials\n'+
        'Cherry Hardwood Arched Door - PS;COM-100001;WH-A,5|WH-B,10\n'+
        'Maple Dovetail Drawerbox;COM-124047;WH-A,15\n'+
        'Generic Wire Pull;COM-123906c;WH-A,10|WH-B,6|WH-C,2\n'+
        'Yankee Hardware 110 Deg. Hinge;COM-123908;WH-A,10|WH-B,11\n'+
        '# Existing materials, restocked\n'+
        'Hdw Accuride CB0115-CASSRC - Locking Handle Kit - Black;CB0115-CASSRC;WH-C,13|WH-B,5\n'+
        'Veneer - Charter Industries - 3M Adhesive Backed - Cherry 10mm - Paper Back;3M-Cherry-10mm;WH-A,10|WH-B,1\n'+
        'Veneer - Cherry Rotary 1 FSC;COM-123823;WH-C,10\n' +
        'MDF, CARB2, 1 1/8";COM-101734;WH-C,8';

        this.state = { csv: csv };

    }

    csvChanged = (event) => {
        this.setState({ csv: event.target.value });
    };

    render() {
        return (

            <div className="WarehouseImport col-sm">
                <div class="form-group">
                <label for="csv">CSV</label>
                <textarea id="csv" class="form-control" rows="20" onChange={this.csvChanged}>
                    {this.state.csv}
                </textarea>
                <button class="btn btn-primary" onClick={() => this.props.onImportClicked(this.state.csv)}>Import</button>
                </div>
            </div>
        );
    }


     
}

const mapStateProps = state => {
    return {
        csv: state.csv
    };
};

const mapDispatchProps = dispatch => {
    return {
        onImportClicked: (csv) => dispatch({ type: actionTypes.CSV_IMPORT_CLICKED, csv: csv })
    };
};

export default connect(mapStateProps, mapDispatchProps)(WarehouseImport);
