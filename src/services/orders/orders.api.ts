import {pb} from "../../pocketbase.ts";
import type {Order} from "../../model/order.ts";
import type {OrderForm, OrderStatus} from "../../model/order-form.ts";

export async function get() {
    return pb.collection('orders').getList<Order>();
}

export async function remove(id: string) {
    return pb.collection('orders').delete(id);
}

export async function add(order: OrderForm) {
    return pb.collection('orders').create<Order>(order);
}

export async function toggleStatus(id:string, status: OrderStatus) {
    return pb.collection('orders').update<Order>(id, { status });
}

