/**
 * Функия для обновления компонентов CART-ORDERS
 * @param state
 * @param bookId
 * @param quantity
 * @returns {{cart: *}}
 */
const updateOrder = (state, bookId, quantity) => {
    const {shoppingCart: {cart}, bookList: {books}} = state;
    const book = books.find(({id}) => id === bookId);
    const itemIndex = cart.orders.findIndex(({id}) => id === bookId);
    const item = cart.orders[itemIndex];
    const newItem = updateCartItem(book, item, quantity);

    return {
        cart: updateCartItems(cart, newItem, itemIndex, quantity)
    }

};

/**
 * Генерирует новый объект или модифицирует старый.
 * Используется деструктурицая полученного объекта
 * @param book
 * @param item
 * @param quantity
 * @returns {{total: number, price: *, count: *, id: *, title: *}}
 */
const updateCartItem = (book, item = {}, quantity) => {

    // Деструктурируем item, если undef, то заполняем поля по умолчанию
    const {
        id = book.id,
        title = book.title,
        count = 0,
        price = book.price,
        total = 0,
    } = item;

    //Создаем и возвращаем новый объект объект newItem и обновляем поля.
    return {
        id,
        title,
        count: count + quantity,
        price,
        total: price * (count + quantity)
    }

};

/**
 * Отвечает за добавление или изменение существующего элемента в state, с сохранением остальных значений
 * @param orders
 * @param newItem
 * @param itemIndex
 * @returns {{total: number, orders: *[]}|{total: *, orders: *[]}}
 */
const updateCartItems = ({total, orders}, newItem, itemIndex, quantity) => {


    // Если количество "count" в новом элементе = 0, тогда возращаем объект cart с вырезанным товаром.
    if (newItem.count === 0)
        return {
            orders: [
                ...orders.slice(0, itemIndex),
                ...orders.slice(itemIndex + 1),
            ],
            total: total - newItem.price
        };


    //Получаем сумму всех товаров из корзины
    let sumTotal = newItem.price * quantity;
    orders.forEach((item) => sumTotal += item.total);

    //Если в корзине не было такого товара, то возвращаем прежнюю корзину + новый товар
    if (itemIndex === -1)
        return {
            orders: [
                ...orders,
                newItem
            ],
            total: sumTotal
        };

    //Если же есть в корзине, то просто обновляем его (склеив из частей)
    return {
        orders: [
            ...orders.slice(0, itemIndex),
            newItem, // Вставляем в разрыв наш элемент
            ...orders.slice(itemIndex + 1),
        ],
        total: sumTotal
    }

};

const updateShoppingCart = (state, actions) => {

    if (state === undefined)
        return {
            cart: {
                orders: [],
                total: 0
            }
        };

    switch (actions.type) {
        case 'BOOK_ADDED_TO_CART' :
            return updateOrder(state, actions.payload, 1);

        case 'BOOK_DELETE_FROM_CART' :
            const item = state.shoppingCart.cart.orders.find(({id}) => id === actions.payload);
            return updateOrder(state, actions.payload, -item.count); // Для удаления передает просто отритальное количество

        case 'BOOK_DECREASE_IN_CART' :
            return updateOrder(state, actions.payload, -1);

        default:
            return state.shoppingCart;
    }
};

export default updateShoppingCart;