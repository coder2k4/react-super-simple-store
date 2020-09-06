import updateBookList from "./book-list";
import updateShoppingCart from "./shopping-cart";

/**
 * Redux Reducer
 * @param state
 * @param actions
 * @returns {{books: [], loading: boolean, error: null, cart}|{books: *, loading: boolean, error: null, cart}|{cart: *}|{books: [], loading: boolean, error: *, cart}|{books, loading, error, cart}}
 */
const reducer = (state, actions) => {
    return {
        bookList: updateBookList(state, actions),
        shoppingCart: updateShoppingCart(state, actions)
    }
};

export default reducer