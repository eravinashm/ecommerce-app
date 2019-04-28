import * as actionTypes from '../actions';

const initalState = {
    sortBy: ''
};

const reducer = (state=initalState, action) => {
    switch(action.type){
        case actionTypes.SORT_BY:
            return{
                sortBy: action.sortBy
            }
        default: 
            return state;
    }
}
export default reducer;