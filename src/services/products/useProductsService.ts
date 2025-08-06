import {useReducer} from "react";
import {initialState, productsReducer} from "./products.reducer.ts";
import * as ProductApi from "./products.api.ts";
import type {Product} from "../../model/product.ts"; //aggiungo alias per leggibilità

export function useProductsService() {
    const [state, dispatch] = useReducer(productsReducer, initialState);

    async function getProducts() {
        dispatch({ type: 'pending', payload: true});
        try {
            const res = await ProductApi.get();
            dispatch({type: 'productsGetSuccess', payload: res.items});
        } catch {
            dispatch({ type:'error', payload: 'Products not loaded'})
        }
    }

    async function deleteProduct(id: string) {
        dispatch({ type: "pending", payload: true});
        try {
            await ProductApi.remove(id);
            dispatch({ type: "productDeleteSuccess", payload: id })
        } catch {
            dispatch({ type: "error", payload:"Product not deleted"});
        }
    }

    async function addProduct(product: Partial<Product>) {
        dispatch({ type: "pending", payload: true});
        try {
            const res = await ProductApi.add(product);
            dispatch({ type: "productAddSuccess", payload: res })
        } catch {
            dispatch({ type: "error", payload:"Product not added"});
        }
    }

    async function editProduct(product: Partial<Product>) {
        dispatch({ type: "pending", payload: true});
        try {
            const res = await ProductApi.edit(product);
            dispatch({ type: "productEditSuccess", payload: res })
        } catch {
            dispatch({ type: "error", payload:"Product not edited"});
        }
    }

    function setActiveItem(product: Product | object) {
        dispatch({ type:'productSetActive', payload: product});
    }

    function resetActiveItem() {
        dispatch({type:'productSetActive', payload: null})
    }
    return {
        actions: {
            getProducts,
            deleteProduct,
            addProduct,
            editProduct,
            setActiveItem,
            resetActiveItem,
        },
        state
    }
}