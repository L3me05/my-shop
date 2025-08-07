import {useProductsService} from "../../../services/products";
import {ServerError} from "../../../shared";
import {useEffect} from "react";
import {Spinner} from "../../../shared/components/core/Spinner.tsx";
import {CmsProductsList} from "./components/CMSProductsList.tsx";
import {CMSProductsForm} from "./components/CMSProductsForm.tsx";



export function CMSProductsPage() {
    const { state, actions, } = useProductsService();

    useEffect(() => {
        actions.getProducts();
    }, [])


    return (
        <>
            <h1 className="title">CMSProducts</h1>

            { state.pending && <Spinner />}
            { state.error && <ServerError message={state.error} />}

            <CMSProductsForm
                activeItems={state.activeItem}
                onClose={actions.resetActiveItem}
                onAdd={actions.addProduct}
                onEdit={actions.editProduct}
            />

            <CmsProductsList
                items={state.products}
                activeItem={state.activeItem}
                onEditItem={actions.setActiveItem}
                onDeleteItem={actions.deleteProduct}
            />

            <button
                className="btn primary"
                onClick={() => actions.setActiveItem({})}
            >
                ADD NEW
            </button>


        </>
    )
}