const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    csv: '',
    warehouses: []
};

// reducer
const warehouseReducer = (state = initialState, action) =>
{
    if(action.type === 'CSV_IMPORT_CLICKED'){
        console.log('CSV_IMPORT_CLICKED');
    } else if(action.type === 'CSV_IMPORT_PARSED'){
        console.log('CSV_IMPORT_PARSED');
    }
    return state;
};


// store
const warehouseStore = createStore(warehouseReducer);
// subs
warehouseStore.subscribe(() => {
    
});

// disp action
warehouseStore.dispatch({type: 'CSV_IMPORT_CLICKED'});
warehouseStore.dispatch({type: 'CSV_IMPORT_PARSED'});
