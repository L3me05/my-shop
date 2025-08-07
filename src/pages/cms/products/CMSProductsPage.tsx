import {useProductsService} from "../../../services/products";
import {ServerError} from "../../../shared";
import {useEffect} from "react";
import {Spinner} from "../../../shared/components/core/Spinner.tsx";



export function CMSProductsPage() {
    const { state, actions, } = useProductsService();

    useEffect(() => {
        actions.getProducts();
    }, [])


    return (
        <>
            <h1 className="title">CMSProducts</h1>
F
            <hr className="my-8"/>

            { state.pending && <Spinner />}
            { state.error && <ServerError message={state.error} />}


            <pre>{JSON.stringify(state, null, 2)}</pre>
        </>
    )
}