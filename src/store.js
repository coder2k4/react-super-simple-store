import {createStore, applyMiddleware } from "redux";
import reducer from "./reducers";


/**
 * Первая функиця - store (как доп. параметр) , 2я - оригинальный dispatch, 3я - наша замена dispatch
 * @param store
 * @returns {function(*): function(*=): *}
 */
const logMiddleware = (store) => (dispatch) => (action) => {
    console.log(action.type, store.getState());
    return dispatch(action);
};

const stringMiddleware = () => (dispatch) => (action) => {
    if (typeof action === 'string')
        action = {type: action};
    return dispatch(action);
};

const store = createStore(reducer, applyMiddleware(logMiddleware, stringMiddleware));

// Monkey patching
//const originalDispatch = store.dispatch; //Сохранение ссылки на оригинальную иструкцию
// store.dispatch = (action) => {
//     if (typeof action === 'string')
//         action = {type: action};
//     return originalDispatch(action);
// };

store.dispatch('HELLO');


export default store