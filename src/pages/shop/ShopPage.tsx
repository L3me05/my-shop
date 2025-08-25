import { useEffect } from 'react';
import { ProductCard } from './components/ProductCard';
import {ServerError} from "../../shared";
import {Spinner} from "../../shared/components/core/Spinner.tsx";
import {useCart, useCartPanel} from "../../services/cart";
import {useProductsService} from "../../services/products";


console.log(import.meta.env.VITE_POCKET_BASE_URL);


export function ShopPage() {


    const openCartPanel = useCartPanel(state => state.openOverlay);
    const addToCart = useCart(state => state.addToCart);
    const { actions, state} = useProductsService();


    useEffect(() => {
        actions.getProducts();
    }, [])


    return (
        <div>
            <h1 className="title">Shop</h1>

            {state.pending && <Spinner />}
            {state.error && <ServerError />}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                {
                    state.products.map(p => {
                        return (
                            <ProductCard
                                product={p}
                                onAddToCart={() => {
                                    addToCart(p)
                                    openCartPanel()
                                }}
                                key={p.id}
                            />
                        )
                    })
                }

            </div>

        </div>
    )
}