import React from 'react'
import BookListItem from "../book-list-item";
import {connect} from 'react-redux'
//import {bindActionCreators} from 'redux' // Функция для возрата объекта с именем функции из Action

import './book-list.css'

import withBookstoreService from "../hoc"; // Компонент высшего прядка, который позволяет получить BookstoreService
import {fetchBooks, bookAddedToCart} from "../../actions"
import compose from "../../utils";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator"; // Упрощаем withBookstoreService


const BookList = ({books, onAddedToCart}) => {
    return (
        <ul className="book-list">
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem
                                book={book}
                                onAddedToCart={() => onAddedToCart(book.id)}
                            />
                        </li>
                    )
                })
            }
        </ul>
    )
};

class BookListContainer extends React.Component {

    //Рефакторинг, вынос логики в mapDispatchToProps
    componentDidMount() {
        this.props.fetchBooks();
    }

    //До рефакторинга и переноса логики в mapDispatchToProps
    /*
    componentDidMount() {
        //Подключить сервис и получить данные
        const {
            bookstoreService,
            booksLoaded,
            booksRequest,
            booksError
        } = this.props;    // Получаем bookstoreService из свойств (контекста) благодаря hoc withBookstoreService

        booksRequest();

        bookstoreService.getBooks()
            .then((books) => booksLoaded(books))
            .catch((err) => booksError(err.message)); // Получаем промис, далее через then получаем data, в catch ловим ошибки
        //const books = bookstoreService.getBooks(); // Получаем массив книг
        //Передать данные в сторе через экшен
        //this.props.booksLoaded(books); // Получили метод из mapDispatchToProps
    }
    */

    render() {
        const {books, loading, error, onAddedToCart} = this.props;
        if (loading) return <Spinner/>;
        if (error) return <ErrorIndicator error={error}/>;
        return <BookList books={books} onAddedToCart={onAddedToCart}/>

    }
}

/**
 * Функция получает данные из глобального state (store) и возвращает требуемые данные
 * Описывает какие данные мы будем получать из Redux Store
 * @param state - глобальный стейт
 * @returns {{books}} - массив книг в store
 */
const mapStateToProps = (state) => {
    return {
        books: state.bookList.books,     //Наши книги
        loading: state.bookList.loading, // Состояние загрузки
        error: state.bookList.error,     // Ошибки
    }
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchBooks: fetchBooks(dispatch, ownProps),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id)),
    }
};


//Вынес обработки логики из componentDidMount в mapDispatchToProps, до рефакторинга
// const mapDispatchToProps = (dispatch, ownProps) => {
//     const {bookstoreService} = ownProps; //bookstoreService получаем из withBookstoreService
//     return {
//         //Создаем функцию с названием fetchBooks и прокидываем в props елемента book-list
//         fetchBooks : () => {
//             dispatch(booksRequest());
//             bookstoreService.getBooks()
//                 .then((books)=>dispatch(booksLoaded(books)))
//                 .catch((err)=>dispatch(booksError(err.message)))
//         }
//     }
// };


//Супер короткая запись, если в connect попадает объект (booksLoaded), то автоматически выполнится bindActionCreators({booksLoaded}, dispatch)
// const mapDispatchToProps = {
//     booksLoaded,
//     booksRequest,
//     booksError
// };
// Короткая запись
// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({booksLoaded}, dispatch);
// };

// Средняя запись при помощи нашего ACTION booksLoaded
// const mapDispatchToProps = (dispatch) => {
//     return {
//         booksLoaded: (newBooks) => {
//             dispatch(booksLoaded(newBooks))
//         }
//     }
// };

// Самая длинная запись, с расшифровкой что тут происходит
// const mapDispatchToProps = (dispatch) => {
//     return {
//         booksLoaded: (newBooks) => {
//             dispatch({
//                 type: 'BOOK_LOADED',
//                 payload: newBooks
//             })
//         }
//     }
// };

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer)


// Без композа
// export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));
