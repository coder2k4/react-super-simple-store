import React from 'react'
import './error-boundry.css'
import ErrorIndicator from "../error-indicator";

/**
 * Компонент - обертка для обработки ошибок, в случае ошибки возвращает компонент <ErrorIndicator/>
 * @returns <ErrorIndicator/> если найдена ошибка, если нет, то возвращает вложенные компоненты
 * @constructor
 */
export default class ErrorBoundry extends React.Component {

  /**
   * Стайт с флагом на ошибку
   * @type {{hasError: boolean}}
   */
  state = {
        hasError: false
    };

  /**
   * Функция жизенного цикла компонента. В случае обнаружения помечает фраг ошибки hasError в значение TRUE
   * @param error
   * @param errorInfo
   */
    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
    }

  /**
   * Отрисовка компонентов с логикой проверки на ошибки.
   * @returns {React.ReactNode|*}
   */
  render() {

        if (this.state.hasError)
            return <ErrorIndicator/>; // Если ошибка, рисуем компонент ErrorIndicator

        return this.props.children // Вызываем обернутые компоненты
    }


};

