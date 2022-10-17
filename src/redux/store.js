import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import index from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(index, composeWithDevTools(applyMiddleware(thunk)));

export default store;