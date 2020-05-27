import * as actionTypes from '../store/actons';
import WarehousesCsvParser from './WarehousesCsvParser';
import WarehousesModelBuilder from './WarehousesModelBuilder';
import WarehousesTxtGenerator from './WarehousesTxtGenerator';

const initialState = {
    csv: '',
    warehouses: [],
    warehousesTxt : ''
};


const warehouseImportReducer = (state = initialState, action) => {
    if (action.type === actionTypes.CSV_IMPORT_CLICKED) {

        const parser = new WarehousesCsvParser(action.csv);

        // first process csv to get raw object result
        const processedItems = parser.processCsv();

        // now we can build final model
        const modelBuilder = new WarehousesModelBuilder(processedItems);
        const finalModel = modelBuilder.buildModel();

        // generate txt
        const txtGenerator = new WarehousesTxtGenerator(finalModel);
        const txt =  txtGenerator.getTxt(finalModel);
        
        //console.log(txt);

        return {
            ...state,
            warehouses: finalModel,
            warehousesTxt:txt
        };

    }

    return state;
};


export default warehouseImportReducer;