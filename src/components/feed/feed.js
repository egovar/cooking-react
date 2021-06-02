import React, { Component } from 'react';
import {Link} from "react-router-dom";

import './feed.css';

import new_post from '../../assets/new_post.svg';

import RecipeCard from "../recipe-card/recipe-card";

import server from "../../config/server";


export default class Feed extends Component {
    constructor(props) {
        super();
        this.state = { is_loaded: false };
        this.onAuthClick = props.onAuthClick;
    }

    componentDidMount() {
        this.getRecipes(this.props.categoryName);
    }

    componentDidUpdate(prevProps) {
        if (this.props.categoryName !== prevProps.categoryName) {
            this.setState({ is_loaded: false});
            this.getRecipes(this.props.categoryName);
        }
    }

    getRecipes = (category) => {
        fetch(`${server}/api/recipe/${ category }`, {
            headers: {
                token: localStorage.getItem('token'),
            }
        })
            .then((res) => res.json()
                .then((recipes_arr) => {
                    this.recipe_cards = recipes_arr.map((recipe) => {
                        return <RecipeCard key={ recipe.recipe_id } user_role={ this.props.user_role } recipe_data={ recipe }/>
                    });
                    this.setState({ is_loaded: true});
                }).catch((err) => console.log(err))
            ).catch((err) => console.log(err));
    }

    button = (role) => {
        if (role === 'guest') {
            return (
                <button type="button" className="btn btn-primary shadow" id="recipe_create" onClick={ this.onAuthClick }>
                    <img src={ new_post } alt="Добавить рецепт"/>
                </button>
            );
        } else {
            return (
                <Link to="/recipe/create" type="button" className="btn btn-primary shadow" id="recipe_create">
                    <img src={ new_post } alt="Добавить рецепт"/>
                </Link>
            );
        }
    }

    title = (category) => {
        switch (category) {
            case 'popular':
                return 'Популярные';
            case 'new':
                return 'Новые';
            case 'fast':
                return 'Быстрые рецепты';
            case 'medium':
                return 'Менее часа';
            case 'long':
                return 'Более часа';
            case 'favourites':
                return 'Ваши любимые рецепты';
            default:
                return 'Error';
        }
    }

    render() {
        if (this.state.is_loaded) {
            return (
                <section className="feed">
                    <h2 className="container h2 my-3">{ this.title(this.props.categoryName) }</h2>
                    <div className="container feed__container">
                        { this.recipe_cards }
                        { this.button(this.props.user_role) }
                    </div>
                </section>
            );
        } else {
            return (
                <section className="recipe-page container d-flex justify-content-center mt-5">
                    <div className="spinner-grow text-primary" role="status" style={{ width: '15vw', height: '15vw'}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </section>
            )
        }
    }

}