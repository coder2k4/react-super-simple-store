const updateBookList = (state, actions) => {

    if (state === undefined)
        return {
            books: [],
            loading: true,
            error: null,
        };

    switch (actions.type) {
        case 'FETCH_BOOKS_SUCCESS' :
            return {
                books: actions.payload,
                loading: false,
                error: null
            };

        case 'FETCH_BOOKS_REQUEST' :
            return {
                books: [],
                loading: true,
                error: null
            };

        case 'FETCH_BOOKS_FAILURE' :
            return {
                books: [],
                loading: false,
                error: actions.payload
            };
        default:
            return state.bookList;
    }
};

export default updateBookList;