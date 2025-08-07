import type {Product} from "../../../../model/product.ts";
import clsx from "clsx";

interface CMSProductsListProps {
    items: Product[];
    activeItem: Partial<Product> | null;
    onEditItem: (product: Partial<Product>) => void;
    onDeleteItem: (id: string) => void;
}

export function CmsProductsList(props: CMSProductsListProps) {
    return (
        <div className="mt-12">
            <table className="table-auto w-full hover">
                <thead>
                <tr>
                    <th className="text-left">PRODUCTS</th>
                    <th className="text-left">IMAGE</th>
                    <th>COST</th>
                    <th>DELETE</th>
                </tr>
                </thead>

                <tbody>
                {
                    props.items.map(p => {
                        return (
                            <tr
                                key={p.id}
                                className={clsx(
                                    "cursor-pointer",
                                    {"bg-sky-400 text-black pointer-events-none": p.id === props.activeItem?.id})}
                                onClick={() => {
                                    props.onEditItem(p);
                                }}
                            >
                                <td>{ p.name }</td>
                                <td>
                                    { p.tmb && <img src={p.tmb} alt={p.name} className="h-16 rounded-xl"/> }
                                </td>
                                <td className="text-center">€ {p.cost}</td>
                                <td className="text-center">
                                    <i
                                        className="fa fa-trash"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            props.onDeleteItem(p.id);
                                        }}
                                    />
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}
