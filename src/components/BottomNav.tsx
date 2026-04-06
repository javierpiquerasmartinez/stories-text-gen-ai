import { NavLink } from "react-router-dom";

export default function BottomNav() {
    return (
        <nav id="bottom-nav">
            <ul>
                <li>
                    <NavLink to="/text">Texto</NavLink>
                </li>
                <li>
                    <NavLink to="/image">Imagen</NavLink>
                </li>
            </ul>
        </nav>
    )
}