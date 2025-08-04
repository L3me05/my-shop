import {useNavigate} from "react-router-dom";
import {useCartPanel} from "../../../services/cart";

export function CartPanel() {
    const navigate = useNavigate();
    const closeCartPanel = useCartPanel(state => state.closeOverlay);

    function goToCart() {
        navigate('cart');
        closeCartPanel();
    }

    return (
        <div className="fixed right-2 top-22 bg-slate-800 p-3 rounded-xl shadow-2xl w-96">
            <ul className="flex flex-col gap-4">
                <li className="flex justify-between items-center border-b border-slate-600 pb-3">
                    <div>Product Name</div>
                    <div className="flex gap-3">
                        <div>(2 x € 10)</div>
                        <div>€ 20</div>
                    </div>
                </li>
            </ul>

            <div className="flex justify-end text-xl font-bold my-3">
                Total: € 20
            </div>
            
            <div className="flex justify-center">
                <button className="btn primary" onClick={goToCart}>Go to cart</button>
            </div>
        </div>
    );
}
