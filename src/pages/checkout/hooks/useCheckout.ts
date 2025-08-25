import {selectCartList, selectTotalCartCost, useCart} from "../../../services/cart";
import {useNavigate} from "react-router-dom";
import {type ChangeEvent, useState} from "react";
import * as React from "react";
import type {OrderForm} from "../../../model/order-form.ts";
import {useOrdersService} from "../../../services/orders";
import {ClientResponseError} from "pocketbase";

export const EMAIL_REGEX= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function useCheckout() {
    const totalCost=useCart(selectTotalCartCost);
    const order=useCart(selectCartList);
    const clearCart=useCart(state => state.clearCart);
    const navigate = useNavigate();
    const { state, addOrder } = useOrdersService();

    const [user, setUser] =useState({ name:"", email:""});
    const [dirty, setDirty] = useState(false);



    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setUser(state => ({...state, [name]: value}));
        setDirty(true);
    }

    function sendOrder(e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault();
        const orderInfo: OrderForm= {
            order,
            user,
            status: 'pending',
            total: totalCost,
        }

        addOrder(orderInfo).then((res) => {
            if(!(res instanceof ClientResponseError)) {
                clearCart();
                navigate('/thankyou');
            }
        });

    }

    const isNameValid= user.name.length;
    const isEmailValid = user.email.match(EMAIL_REGEX);
    const isValid = isNameValid && isEmailValid;


    return {
        validators: {
            isNameValid,
            isEmailValid,
            isValid
        },
        actions: {
            sendOrder,
            changeHandler
        },
        user,
        dirty,
        totalCost,
        error: state.error,
    }
}