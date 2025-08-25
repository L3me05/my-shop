import type {Order} from "../../model/order.ts";

export type OrdersGetSuccess = { type:'ordersGetSuccess', payload: Order[] };
export type OrderDeleteSuccess = { type:'orderDeleteSuccess', payload: string };
export type OrderToggleSuccess = { type:'orderToggleStatusSuccess', payload: Order };
export type Error = { type:'error', payload: string };
export type Pending = { type:'pending', payload: boolean };

export type OrdersActions =
    OrdersGetSuccess |
    OrderDeleteSuccess |
    OrderToggleSuccess |
    Error |
    Pending;
