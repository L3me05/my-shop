import type {Product} from "../../../../model/product.ts";
import clsx from "clsx";
import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";

export interface CMSProductsFormProps {
    activeItems: Partial<Product> | null;
    onClose: () => void;
    onAdd: (product: Partial<Product>) => void;
    onEdit: (product: Partial<Product>) => void;
}

const initialState: Partial<Product> = {
    name: '', cost: 0, description:'',
}

export function CMSProductsForm (props: CMSProductsFormProps) {
    const [formData, setFormData] = useState(initialState);

    //per sincronizzare props con stato locale
    useEffect(() => {
        if(props.activeItems?.id) {
            setFormData({...props.activeItems});
        } else {
            setFormData(initialState);
        }
    }, [props.activeItems])

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        const name = e.currentTarget.value;
        setFormData(s => ({...s, name}))
    }


    function saveHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formData);
        if(props.activeItems?.id) {
            //edit
            props.onEdit(formData);
        } else {
            //add
            props.onAdd(formData);
        }
    }

    const isNameValid = formData.name?.length;
    const isValid = isNameValid;

    return (
        <div className={clsx(
            "fixed bg-slate-200 z-10 text-black top-0 w-96 h-full transition-all",
            {'-right-96': !props.activeItems, 'right-0': props.activeItems}
        )}>
            <form onSubmit={saveHandler} >
                <div className="flex justify-around">
                    <button
                        className="text-white py-3 w-1/3 rounded-4xl my-4 bg-green-500 hover:bg-green-600 disabled:opacity-30"
                        disabled={!isValid}
                        onClick={() => null}
                        type="submit"
                    >
                        SAVE
                    </button>
                    <button
                        className="text-white py-3 w-1/3 rounded-4xl my-4 bg-slate-500 hover:bg-slate-600"
                        onClick={props.onClose}
                        type="button"
                    >
                        CLOSE
                    </button>

                </div>
                <input
                    type="text"
                    value={formData?.name}
                    onChange={changeHandler}
                    className={clsx({"error": !isNameValid})}
                />
            </form>

            {props.activeItems?.name}

        </div>
    )
}