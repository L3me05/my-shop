import type {Product} from "../../../../model/product.ts";
import clsx from "clsx";
import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";

interface CloudinaryWidget {
    openUploadWidget: (config: any, callback?: (error: any, result: any) => void) => {
        open: () => void;
        close: () => void;
    };
}

declare const cloudinary: CloudinaryWidget;

export interface CMSProductsFormProps {
    activeItems: Partial<Product> | null;
    onClose: () => void;
    onAdd: (product: Partial<Product>) => void;
    onEdit: (product: Partial<Product>) => void;
}

const initialState: Partial<Product> = {
    name: '', cost: 0, description:'', tmb:'', img: '',
}

export function CMSProductsForm (props: CMSProductsFormProps) {
    const [formData, setFormData] = useState(initialState);
    const [dirty, setDirty] = useState<boolean>(false);

    //per sincronizzare props con stato locale
    useEffect(() => {
        if(props.activeItems?.id) {
            setFormData({...props.activeItems});
        } else {
            setFormData(initialState);
        }
    }, [props.activeItems])


    function changeHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFormData(s => ({...s, [name]:value}))
        setDirty(true);
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


    function uploadHandler() {
        const uploadWidget = cloudinary.openUploadWidget(
            {
            cloudName:'dgn36uipj',
            uploadPreset: 'my-shop',
            sources:['local','camera', 'url'],

            },
            function(error: any, result:any) {
                if(!error && result.event === 'success') {
                    const img = result.info.url;
                    const tmb = result.info.thumbnail_url;
                    setFormData(s => ({...s, tmb, img}));
                }
                console.log(result);
            }
        );
        uploadWidget.open();

    }

    const isNameValid = formData.name?.length;
    const isCostValid = formData.cost && formData.cost > 0;
    const isDescValid = formData.description?.length;

    const isValid = isNameValid && isCostValid && isDescValid;

    return (
        <div className={clsx(
            "fixed bg-slate-200 z-10 text-black top-0 w-96 h-full transition-all overflow-auto ",
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

                {
                    formData.img &&
                    <div className="rounded-4xl h-56 m-4 overflow-hidden">
                        <img src={formData.img} alt={formData.name} className="w-full"/>
                    </div>
                }

                <div className="flex flex-col h-full gap-3 mx-3 mt-4">
                    Product Name:
                    <input
                        className={clsx('rounded-xl',{ 'error': !isNameValid && dirty})}
                        type="text" value={formData?.name} name="name" onChange={changeHandler}
                    />

                    Product Cost:
                    <input
                        className={clsx('rounded-xl',{ 'error': !isCostValid && dirty})}
                        type="number" value={formData?.cost} name="cost" onChange={changeHandler}
                    />

                    Description
                    <textarea
                        className={clsx('rounded-xl',{ 'error': !isDescValid && dirty})}
                        value={formData.description} name="description" onChange={changeHandler}
                    ></textarea>
                </div>

                <div className=" flex justify-center my-8">
                    <button className="btn primary" type="button" onClick={uploadHandler} >
                        UPLOAD IMAGE
                    </button>
                </div>
            </form>


        </div>
    )
}