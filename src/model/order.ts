import type {OrderStatus, OrderUser} from "./order-form.ts";
import type {CartItem} from "./cart-item.ts";

export interface Order {
    collectionId: string;
    collectionName: string;
    created: string;
    id: string;
    order: CartItem[];
    status: OrderStatus;
    total: number;
    updated: string;
    user: OrderUser;
}