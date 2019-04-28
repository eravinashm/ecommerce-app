import * as actionTypes from '../actions';

const initalState = {
    sortBy: ''
};

const reducer = (state=initalState, action) => {
    console.log(action)
    switch(action.type){
        case actionTypes.SORT_BY:
            console.log(action.sortBy)
            return{
                sortBy: action.sortBy
            }
        default: 
            return state;
    }
}
export default reducer;