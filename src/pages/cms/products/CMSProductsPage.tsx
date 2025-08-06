import {useProductsService} from "../../../services/products/useProductsService.ts";
import {ServerError} from "../../../shared";



export function CMSProductsPage() {
const {
    state,
    actions,
} = useProductsService();

    async function getProductHandler() {
        await actions.getProducts();
    }

    return (
        <>
            <h1 className="title">CMSProducts</h1>

            <hr className="my-8"/>

            { state.pending && <div>get products</div>}
            { state.error && <ServerError message={state.error} />}

            <button
                className="btn primary"
                onClick={getProductHandler}
            >get products</button>

            <pre>{JSON.stringify(state, null, 2)}</pre>
        </>
    )
}