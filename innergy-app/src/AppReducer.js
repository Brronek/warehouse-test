import * as actionTypes from './store/actons';

const initialState = {
    warehouses: []
};


const reducer = (state = initialState, action) =>{
    if(action.type === actionTypes.CSV_IMPORT_PARSED){
        console.log(actionTypes.CSV_IMPORT_CLICKED, action.warehouses);
        
        return {
            ...state,
            warehouses: action.warehouses
        };

    }
    return state;
};

export default reducer;