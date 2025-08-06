import type {Product} from "../../model/product.ts";
import type {ProductsActions} from "./products.action.ts";

export interface ProductsState {
    products: Product[];
    pending: boolean;
    error: string | null;
    activeItem: Partial<Product> | null;

}


export const initialState: ProductsState = {
    pending: false,
    products: [],
    error: null,
    activeItem: null,
}

export function productsReducer(state:ProductsState, action: ProductsActions) {
    const {type, payload} = action; //destrutturo action, usando molto spesso type e payload

    switch (type) {
        case 'productsGetSuccess':
            return { ...state, products:payload, pending: false, error: null };
        case 'productDeleteSuccess':
            return {
                ...state,
                products: state.products.filter(item => item.id !== payload),
                error: null,
                pending: false,
                activeItem: state.activeItem?.id === payload ? null : state.activeItem,
            };
        case 'productAddSuccess':
            return {
                ...state,
                products: [...state.products, payload],
                activeItem: null,
                error: null,
                pending: false,
            };
        case 'productEditSuccess':
            return {
                ...state,
                products: state.products.map(item => item.id === payload.id ? payload : item),
                error: null,
                pending: false,
            };
        case 'productSetActive':
            return {...state, activeItem: payload };
        case'pending':
            return { ...state, pending: payload, error: null };
        case 'error':
            return {...state, error: payload, pending: false};
    }
    return state


}
