import {useEffect} from "react";
import {pb} from "../../../pocketbase.ts";
import type {Order} from "../../../model/order.ts";

export function CMSOrdersPage() {

    useEffect(() => {
        getAll();
    }, []);

    async function getAll() {
        const res = await pb.collection('orders').getList<Order>()
        console.log(res.items);
    }

    return (
        <>
            <h1 className="title">CMSOrders</h1>

            Orders Page
        </>
    )
}