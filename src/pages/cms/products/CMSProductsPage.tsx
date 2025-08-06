import {useReducer} from "react";
import {get} from "../../../services/products/products.api.ts";
import {initialState, productsReducer} from "../../../services/products/products.reducer.ts";



export function CMSProductsPage() {
    const [state, dispatch] = useReducer(productsReducer, initialState);

    async function getProductHandler() {
        dispatch({ type: 'pending', payload: true});
        const res = await get();
        dispatch({ type: 'productsGetSuccess', payload: res.items});
    }

    return (
        <>
            <h1 className="title">CMSProducts</h1>

            <hr className="my-8"/>

            { state.pending && <div>get products</div>}

            <button
                className="btn primary"
                onClick={getProductHandler}
            >get products</button>

            <pre>{JSON.stringify(state, null, 2)}</pre>
        </>
    )
}