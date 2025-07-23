import type { Product } from "../../../model/product"

interface ProductCardProps {
    product: Partial<Product>;
    onAddToCart: (product: Partial<Product>) => void;
}

export function ProductCard(props: ProductCardProps) {

    const { product: p } = props;

    return (
    <>
        <div 
            className="bg-white text-black rounded-2xl shadow-2xl overflow-hidden" 
            key={p.id}
        >
            {p.img && <img src={p.img} alt={p.name} className='object-cover w-full h-64' />}
            <div className="flex justify-between items-center gap-3 p-3 text-2xl font-bold">
                <div>{p.name}</div>
                <div>{p.cost}</div>
            </div>
            <p className='p-3'>
                {p.description}
            </p>

            <button
                className='text-white bg-sky-600 hover:bg-slate-400 transition w-full text-center font-bold p-3'
                onClick={() => props.onAddToCart(p)}
            >
                Add to cart
            </button>
        </div>
    </>
    
    )
}

