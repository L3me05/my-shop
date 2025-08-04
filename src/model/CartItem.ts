import type {Product} from "./product.ts";

export interface CartItem {
    product: Product;
    qty: number;
}