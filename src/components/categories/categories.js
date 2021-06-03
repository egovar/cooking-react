import React from 'react';
import { NavLink } from "react-router-dom";

const Categories = ({ user_role }) => {
    return (
        <nav className="categories col-8 nav nav-pills justify-content-around">
            <NavLink className="nav-link" to="/" exact>Популярные</NavLink>
            <NavLink className="nav-link" to="/new">Свежее</NavLink>
            <NavLink className="nav-link" to="/fast">До 30 минут</NavLink>
            <NavLink className="nav-link" to="/medium">До часа</NavLink>
            <NavLink className="nav-link" to="/long">Больше часа</NavLink>
            {(user_role === 'guest' ? null : <NavLink className="nav-link" to="/favourites">Понравившиеся</NavLink>)}
            {(user_role === 'admin' ? <NavLink className="nav-link" to="/admin">Админка</NavLink> : null)}
        </nav>
    );
}

export default Categories;