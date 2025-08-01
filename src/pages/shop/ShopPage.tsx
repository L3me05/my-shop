import { useEffect, useState } from 'react';
import type { Product } from '../../model/product';
import { pb } from '../../pocketbase';
import { ProductCard } from './components/ProductCard';
import {ServerError} from "../../shared";
import {Spinner} from "../../shared/components/core/Spinner.tsx";


console.log(import.meta.env.VITE_POCKET_BASE_URL);


export function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        loadData();
    }, [])

    function loadData() {
        setPending(true);
        pb.collection('products').getList<Product>()
        .then(res => {
            setProducts(res.items);
        })
        .catch(err => {
            console.error("Errore caricamento prodotti", err)
            setError(true);
        })
        .finally(() => {
            setPending(false);
        })
        
    }

    function addToCart(product: Partial<Product>) {
        console.log(product);
    }

    return (
        <div>
            <h1 className="title">Shop</h1>

            {pending && <Spinner />}
            {error && <ServerError />}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                {
                    products.map(p => {
                        return (
                            <ProductCard product={p} onAddToCart={addToCart} key={p.id} />                                
                        )
                    })
                }

            </div>

        </div>
    )
}