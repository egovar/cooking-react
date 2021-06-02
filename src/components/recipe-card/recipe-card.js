import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './recipe-card.css';

import like_not_active from '../../assets/like_empty.svg';
import like_active from '../../assets/like_filled.svg';
import time from '../../assets/time.svg';

import server from "../../config/server";

const RecipeCard = ({ user_role, recipe_data: { recipe_id, recipe_title, recipe_picture, recipe_cooking_time,
    recipe_post_time, recipe_likes, recipe_author_login, recipe_author_id, recipe_is_liked }}) => {
    console.log(user_role);

    const [likes, setLikes] = useState(recipe_likes);

    const date_arr = recipe_post_time.substr(2, 8).split('-');
    const time_str = recipe_post_time.substr(11, 5);

    recipe_post_time = `${ time_str } - ${ date_arr[2] }.${ date_arr[1] }.${ date_arr[0] }`;

    const pressLike = (e) => {
        const target = e.currentTarget;
        if (target.classList.length === 1) {
            target.classList.add(target.classList[0] + '_liked');
            setLikes(likes + 1);
        } else {
            target.classList.remove(target.classList[0] + '_liked');
            setLikes(likes - 1);
        }
        fetch(`${ server }/api/recipe/like`, {
            method: 'PUT',
            headers: {
                token: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: recipe_id
            })
        }).catch((err) => console.log(err));
    }

    return (
        <article className="card recipe-card">
            <Link to={ '/recipe/' + recipe_id }>
                <img src={ recipe_picture } className="card-img-top" alt="Картинка к рецепту"/>
            </Link>
                <div className="card-body">
                    <Link to={ '/recipe/' + recipe_id }>
                        <h3 className="card-title h4 text-truncate">{ recipe_title }</h3>
                    </Link>
                    <div className="d-grid recipe-card__icon-row mb-2">
                        <img src={ time } className="recipe-card__icon" alt="time icon"/>
                        <span>{ recipe_cooking_time } мин</span>
                        <div onClick={(localStorage.getItem('role') === 'user' ?
                            (e) => pressLike(e) : null)} className={"recipe-card__like-area"
                        + (recipe_is_liked ? " recipe-card__like-area_liked" : "")}>
                            <img src={ like_not_active } className="recipe-card__icon recipe-card__like_empty"
                                 alt="liked already"/>
                            <img src={ like_active } className="recipe-card__icon recipe-card__like_filled"
                                 alt="not liked yet"/>
                        </div>
                        <span>{ likes }</span>
                    </div>
                    <div className="recipe-card__bottom">
                        <span className="d-block w-50">{ recipe_post_time }</span>
                        <span className="fw-bolder text-truncate">
                            { recipe_author_login }</span>
                    </div>
                </div>
        </article>
    );
}

export default RecipeCard;