import { NavLink, Outlet } from "react-router-dom";

const isActive = (o: {isActive: boolean}) => {
    return o.isActive ? 'btn primary' : 'btn'
}

export function CMSPage() {
    return (
        <>

            <NavLink to="/cms/products" className={isActive}>Products</NavLink>
            <NavLink to="/cms/orders" className={isActive}>Orders</NavLink>

            <Outlet/>
        </>
    )
}