import React from 'react' // Поддержка JSX
import {Route, Switch} from 'react-router-dom'

import {HomePage, CartPage} from '../pages/index'
import ShopHeader from "../shop-header";
import './app.css' //Подгружаем стили для компонента


/**
 * Главный компонент <App/>
 */
const App = () => {
    return (
        <main role="main" className="container">
            <ShopHeader/>
            <Switch>
                <Route path='/' component={HomePage} exact/>
                <Route path='/cart' component={CartPage}/>
            </Switch>
        </main>
    );
};

export default App