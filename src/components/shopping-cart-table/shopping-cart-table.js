import React from 'react';
import {connect} from "react-redux";
import './shopping-cart-table.css';
import {bookAddedToCart, bookDecreaseInCart, bookDeleteFromCart} from "../../actions";

const ShoppingCartTable = ({cart, onIncrease, onDecrease, onDelete}) => {

    const {orders, total} = cart;

    const renderRow = (order, idx) => {
        return (
            <tr key={order.id}>
                <td>{idx + 1}</td>
                <td>{order.title}</td>
                <td>{order.count}</td>
                <td>{order.price}</td>
                <td>{order.total}</td>
                <td>
                    <button
                        onClick={()=>onDelete(order.id)}
                        className="btn btn-outline-danger btn-sm float-right">
                        <i className="fa fa-trash-o"/>
                    </button>
                    <button
                        onClick={()=>onIncrease(order.id)}
                        className="btn btn-outline-success btn-sm float-right">
                        <i className="fa fa-plus-circle"/>
                    </button>
                    <button
                        onClick={()=>onDecrease(order.id)}
                        className="btn btn-outline-warning btn-sm float-right">
                        <i className="fa fa-minus-circle"/>
                    </button>
                </td>
            </tr>
        )
    };

    return (
        <div className="shopping-cart-table">
            <h2>Your Order</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Count</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {orders.map(renderRow)}
                </tbody>
            </table>

            <div className="total">
                Total: ${total}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cart: state.shoppingCart.cart
    }
};

const mapDispatchToProps = {
    onIncrease: bookAddedToCart,
    onDecrease: bookDecreaseInCart,
    onDelete: bookDeleteFromCart,
};


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
