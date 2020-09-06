import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux' // Для передачи store детям
import {BrowserRouter as Router} from "react-router-dom" // Роутинг

import App from "./components/app";
import ErrorBoundry from "./components/error-boundry";  // Захват ошибок
import BookstoreService from "./services/bookstore-service"; // Сервис - API с книгами
import {BookstoreServiceProvider} from "./components/booksotre-service-context"; // Передача вниз по дереву детям bookstoreService

import store from "./store"; // Само хранилище

const bookstoreService = new BookstoreService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <BookstoreServiceProvider value={bookstoreService}>
                <Router>
                    <App/>
                </Router>
            </BookstoreServiceProvider>
        </ErrorBoundry>
    </Provider>
    , document.getElementById('root'));