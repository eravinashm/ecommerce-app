import { createStore } from 'redux';
// import { createBrowserHistory } from 'history';

import rootReducer from './reducers/rootReducer';

// export const history = createBrowserHistory();

const store = createStore(rootReducer);

export default store;