import { combineReducers } from 'redux';

import sortByReducer from './sortByReducer';
import otherReducer from './otherReducer';

const rootReducer = combineReducers({sortByReducer, otherReducer});

export default rootReducer;