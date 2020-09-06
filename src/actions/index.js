
// Акшен для запроса книг с сервера
const booksLoaded = (newBooks) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks
    }
};

// Акшен для отображения LOADER
const booksRequest = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST'
    }
};

// Акшен для получаения ошибок
const booksError = (error) => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: error
    }
};

const fetchBooks = (dispatch, {bookstoreService}) => () => {
    dispatch(booksRequest());
    bookstoreService.getBooks()
        .then((books)=>dispatch(booksLoaded(books)))
        .catch((err)=>dispatch(booksError(err.message)))
};

export const bookAddedToCart = (bookId) => {
    return {
        type : 'BOOK_ADDED_TO_CART',
        payload: bookId
    }
};

export const bookDeleteFromCart = (bookId) => {
    return {
        type : 'BOOK_DELETE_FROM_CART',
        payload: bookId
    }
};

export const bookDecreaseInCart = (bookId) => {
    return {
        type : 'BOOK_DECREASE_IN_CART',
        payload: bookId
    }
};

export {fetchBooks}