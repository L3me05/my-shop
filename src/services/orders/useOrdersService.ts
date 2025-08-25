import {useReducer} from "react";
import {initialState, ordersReducer} from "./orders.reducer.ts";
import * as OrderService from './orders.api.ts';
import type {OrderForm, OrderStatus} from "../../model/order-form.ts";

export function useOrdersService () {
    const [state, dispatch] = useReducer(ordersReducer, initialState)

    async function getOrders() {
        dispatch({ type: "pending", payload:true });

        try {
            const res = await OrderService.get();
            dispatch({ type: "ordersGetSuccess", payload: res.items });
        } catch (e) {
            console.error(e);
            dispatch({ type:"error", payload:'Order not loaded' });
        }
    }


    async function deleteOrder(id: string) {
        dispatch({ type: "pending", payload:true });

        try {
            await OrderService.remove(id);
            dispatch({ type: "orderDeleteSuccess", payload: id });
        } catch (e) {
            console.error(e);
            dispatch({ type:"error", payload:'Order not deleted' });
        }
    }


    async function addOrder(order: OrderForm) {
        dispatch({ type: "pending", payload:true });

        try {
            return await OrderService.add(order);          //non serve un action perchè utilizzata in un punto in cui non ci serve di aggiornare lo stato
        } catch (e) {
            console.error(e);
            dispatch({ type:"error", payload:'Order not added' });
            return e;
        }
    }


    async function toggleOrderStatus (id: string, status: OrderStatus) {
        dispatch({ type: "pending", payload:true });

        try {
            const res = await OrderService.toggleStatus(id, status);
            dispatch({ type: "orderToggleStatusSuccess", payload: res });
        } catch (e) {
            console.error(e);
            dispatch({ type:"error", payload:'Status not changed' });
        }
    }



    return {
        getOrders,
        deleteOrder,
        addOrder,
        toggleOrderStatus,
        state,
    }
}