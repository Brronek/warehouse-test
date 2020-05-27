import * as actionTypes from '../store/actons';

const initialState = {
    csv: '',
    warehouses: [],
    warehousesTxt : ''
};


const warehouseImportReducer = (state = initialState, action) => {
    if (action.type === actionTypes.CSV_IMPORT_CLICKED) {

        const processedItems = processCsv(action.csv);

        //console.log(processedItems);

        const finalModel = buildFinalModel(processedItems);

        //console.log(finalModel);

        sort(finalModel);

        const txt =  toTxt(finalModel);
        
        console.log(txt);

        return {
            ...state,
            warehouses: finalModel,
            warehousesTxt:txt
        };

    }

    return state;
};

const processCsv = csv => {

    // split lines
    const lines = splitLines(csv);
    const processed = [];
    lines.forEach(line => {
        // ignore lines starting with #
        if (!line.startsWith('#')) {
            processed.push(processLine(line));
        }
    });

    return processed;
};

const splitLines = str => {
    return str.split('\n');
};

const processLine = line => {

    const fields = splitLine(line);

    // Nazwa materiału;ID Materiału;Magazyn,Ilość|Magazyn,Ilość|Magazyn,Ilość

    const warehousesValues = processItemInWarehouses(fields[2])

    const warehouseItem = {
        name: fields[0],
        id: fields[1],
        warehousesValues: warehousesValues
    };

    return warehouseItem;
};

const splitLine = line => {
    return line.split(';');
}


const processItemInWarehouses = warehousesAndValues => {

    const warehousesWithItem = [];

    // split by '|' to get values by warehouse
    const byWarehouses = warehousesAndValues.split('|');

    byWarehouses.forEach(byWarehouse => {
        // now split by ',' to get warehouse and total
        const warehouseAndTotal = byWarehouse.split(',');

        // add to the result
        warehousesWithItem.push({ warehouse: warehouseAndTotal[0], total: Number(warehouseAndTotal[1]) });
    });

    return warehousesWithItem;
};

const buildFinalModel = warehouseItems => {
    const warehouses = [];

    // go through items
    warehouseItems.forEach(warehouseItem => {

        warehouseItem.warehousesValues.forEach(warehousesValue => {
            // is there already warehouse in the array?
            let warehouse = warehouses.find(w => w.name === warehousesValue.warehouse);

            if (!warehouse) {
                // warehouse is not on the list. add it
                warehouse = {
                    name: warehousesValue.warehouse,
                    total: 0,
                    items: []
                };

                warehouses.push(warehouse);

            }

            // is there an item already in warehouse?
            let item = warehouse.items.find(i => i.name === warehouseItem.name);

            if (!item) {
                item = {
                    id: warehouseItem.id,
                    name: warehouseItem.name,
                    total: 0
                };
                warehouse.items.push(item);
            }

            // update totals
            item.total += warehousesValue.total;
            warehouse.total += item.total;

        });

    });

    return warehouses;
};

const sort = (warehouses) => {

    // sort warehouses by total and then by name
    warehouses.sort((w1, w2) => {
        if(w1.total !== w2.total){
            // totals are different. use total to sort
            return compareDsc(w1.total, w2.total);
        }

        // totals are the same, use name to sort
        return compareDsc(w1.name, w2.name);
    });

    // now sort items
    warehouses.forEach(warehouse => warehouse.items.sort((i1, i2) => compare(i1.id, i2.id)));


};

const compare = (a, b) => (a > b ? 1 : -1);
const compareDsc = (a, b) => (a > b ? -1 : 1);

const toTxt = (warehouses) => {

    // use array.join for better performance
    const txtArr = [];

    warehouses.forEach(warehouse => {
        txtArr.push(warehouse.name + ' (total ' + warehouse.total + ')');

        warehouse.items.forEach(item => {
            txtArr.push(item.name + ': ' + item.total);
        });

        // empty line
        txtArr.push("");
    });

    return txtArr.join("\n");
};


export default warehouseImportReducer;