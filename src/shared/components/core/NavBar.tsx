import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";

const isActive = (o: {isActive: boolean}) => 
    o.isActive ? 'text-xl text-sky-400 font-bold' : 'text-xl text-white'

export function NavBar () {
    return (
        <div className="fixed z-10 top-0 right-0 left-0 shadow-2xl">
            <div className="flex items-center justify-between bg-slate-900 p-3 shadow-2xl">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img src={logo} alt="" className="h-12" />
                    <NavLink to="shop" className={isActive}>FB SHOP</NavLink>
                </div>

                {/* Cart button badge */}
                <div>
                    <button className="btn accent">
                        Cart: 0
                    </button>
                </div>
                
            </div>

            {/*Login / CMS / Logout buttons*/}
            <div className="fixed bottom-2 right-2 text-white p-5 ">
                <NavLink to="login" className="btn accent ">login</NavLink>
                <NavLink to="cms" className='btn accent '>cms</NavLink>
                <button className="btn primary ">logout</button>
            </div>
        </div>
    )
}