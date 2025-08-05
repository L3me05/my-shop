import clsx from "clsx";
import {useCheckout} from "./hooks/useCheckout.ts";

export function CheckoutPage() {
    const {
        validators, actions,
        user, dirty, totalCost
    } = useCheckout();
    return (
        <div className="max-w-sm mx-auto">
            <div className="text-xl my-3 border-b">€ {totalCost}</div>

            <form className="flex flex-col gap-3" onSubmit={actions.sendOrder}>
                Your name:
                <input
                    type="text" placeholder="Your name"
                    name="name"
                    value={user.name}
                    onChange={actions.changeHandler}
                    className={clsx({'error':!validators.isNameValid && dirty})}
                />
                Your email:
                <input
                    type="email" placeholder="Your email"
                    name="email"
                    value={user.email}
                    onChange={actions.changeHandler}
                    className={clsx({'error':!validators.isEmailValid && dirty})}
                />

                <button
                    className={clsx('btn', {primary: !validators.isValid, 'success': validators.isValid})}
                    type="submit" disabled={!validators.isValid}
                >
                    CONFIRM ORDER
                </button>

            </form>

        </div>
    )
}