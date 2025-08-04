import { NavLink } from "react-router-dom";
import {selectCartIsEmpty, selectCartList, selectTotalCartCost, useCart} from "../../services/cart";

export function CartPage() {
    const list = useCart(selectCartList);
    const totalCost = useCart(selectTotalCartCost);
    const isEmpty = useCart(selectCartIsEmpty);

    const increaseQty = useCart(state => state.increaseQty);
    const decreaseQty = useCart(state => state.decreaseQty);

    return (
        <>
            <h1 className="title">Cart</h1>

            <ul>
                {
                    list.map(u => (
                        <li
                            key={u.product.id}
                            className="flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-blue-400 py-3"
                        >
                            <div className="flex items-center gap-3">
                                <img src={u.product.tmb} alt={u.product.name} className="w-24 h-24 object-cover rounded-xl"/>
                                <div className="font-bold">{u.product.name}</div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <div className="flex items-center gap-3">
                                    <button className="btn primary" onClick={() => decreaseQty(u.product.id)}>-</button>
                                    <div>qty: {u.qty}</div>
                                    <button className="btn primary" onClick={() => increaseQty(u.product.id)}>+</button>
                                </div>

                                <div className="w-16 text-center">
                                    € {u.product.cost * u.qty}
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>

            <div className="text-4xl text-right my-4 mr-4">
                Total: € {totalCost}
            </div>
            {
                !isEmpty &&
                <div className="flex justify-center">
                    <NavLink to="/checkout" className="btn primary lg">Confirm order</NavLink>
                </div>
            }
        </>
    )
}