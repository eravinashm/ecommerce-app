import * as actionTypes from './actions';

const initialState = {
    products: []
}

export default function productReducer(state = initialState, action){
    console.log(" action ", action);
    switch(action.type){
        case actionTypes.STORE_PRODUCTS: {
            return {
                ...state,
                products: action.payload
            }
        }
        default: 
            return state;
    }
}