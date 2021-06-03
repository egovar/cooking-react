import React, { Component } from 'react';

import './recipe-page.css'
import comment_icon from '../../assets/comment.svg'
import like_not_active from "../../assets/like_empty.svg";
import like_active from "../../assets/like_filled.svg";

import Comment from "../comment/comment";

import server from "../../config/server";

export default class RecipePage extends Component {

    constructor() {
        super();
        this.state = {
            is_loaded: false,
            likes: 0,
            comments: []
        }
    }

    pressLike = (e) => {
        const target = e.currentTarget;
        if (target.classList.length === 1) {
            target.classList.toggle(target.classList[0] + '_liked');
            this.setState((state) => {
                return {likes: state.likes + 1}
            });
        } else {
            target.classList.toggle(target.classList[0] + '_liked');
            this.setState((state) => {
                return {likes: state.likes - 1}
            });
        }
        fetch(`${ server }/api/recipe/like`, {
            method: 'PUT',
            headers: {
                token: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.recipe_id
            })
        }).catch((err) => console.log(err));
    }

    componentDidMount() {
        fetch(`${ server }/api/recipe/${this.props.recipe_id}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then((result) => result.json()
                .then((recipe_obj) => {
                    const { recipe_id, recipe_ingredients, recipe_comments, recipe_title, recipe_author_login, recipe_likes,
                        recipe_text, recipe_post_time, recipe_picture, recipe_is_liked, recipe_cooking_time } = recipe_obj;

                    this.recipe_ingredients_strings = recipe_ingredients.map(
                        ({ ingredient_name, ingredient_amount, ingredient_unit_name}, index) => {
                            return <span key={ index }>{ingredient_name}: {ingredient_amount} {ingredient_unit_name}</span>;
                        });

                    this.recipe_comments_components = recipe_comments.map(({ comment_id, ...comment_data }) => {
                        return <Comment key={ comment_id } comment_data={ comment_data }/>
                    });

                    const date_arr = recipe_post_time.substr(2, 8).split('-');
                    const time_str = recipe_post_time.substr(11, 5);
                    this.recipe_post_time = `${ time_str } ${ date_arr[2] }.${ date_arr[1] }.${ date_arr[0] }`

                    this.recipe_title = recipe_title;
                    this.recipe_author_login = recipe_author_login;
                    this.recipe_text = recipe_text;
                    this.recipe_picture = recipe_picture;
                    this.recipe_is_liked = recipe_is_liked;
                    this.recipe_cooking_time = recipe_cooking_time;
                    this.recipe_id = recipe_id;

                    this.setState({
                        is_loaded: true,
                        likes: recipe_likes,
                        comments: this.recipe_comments_components,
                    });
                }))
    }

    sendComment = (e) => {
        e.preventDefault();
        const sendButton = e.currentTarget.getElementsByClassName('btn')[0]
        sendButton.disabled = true;

        const comment_data = {
            comment_text: document.getElementById('comment_input').value,
            comment_author_login: localStorage.getItem('login'),
            comment_post_time: 'только что'
        }
        fetch(`${ server }/api/comment/create`, {
            method: 'POST',
            headers: {
                token: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipe_id: this.recipe_id,
                text: comment_data.comment_text
            })
        })
            .then(() => {
                document.getElementById('comment_input').value = "";
                const oldComments = this.state.comments;
                oldComments.push(<Comment key={ Date.now() } comment_data={ comment_data }/>);
                this.setState({ comments: [...oldComments] });
                sendButton.disabled = false;
                this.forceUpdate();
            })
            .catch((err) => console.log(err));
    }

    leave_a_comment = localStorage.getItem('role') == null ? null : (
        <div>
            <h4 className="h5 mt-4">Поблагодарите автора или поделитесь своим кулинарным секретом!</h4>
            <form onSubmit={(e) => this.sendComment(e) }>
                <div className="my-3">
                    <label htmlFor="comment_input" className="form-label visually-hidden">Комментарий</label>
                    <textarea className="form-control" id="comment_input" rows="3"
                              placeholder="Напишите что-нибудь хорошее"></textarea>
                    <button type="submit" className="btn btn-primary mt-2">Отправить</button>
                </div>
            </form>
        </div>
    );

    render() {
        if (this.state.is_loaded) {
            return (
                <section className="container recipe-page">
                    <h2 className="recipe-page__title h1 my-3 mx-0">{ this.recipe_title }</h2>
                    <div className="recipe-page__top">
                        <img src={ this.recipe_picture } className="w-50" alt="Картинка к рецепту"/>
                        <div className="recipe-page__info">
                    <span>Автор: <span className="fw-bolder">
                        { this.recipe_author_login }</span></span>
                            <span className="mb-2">Время приготовления: { this.recipe_cooking_time } мин.</span>
                            <span className="fw-bolder">Ингредиенты: </span>
                            { this.recipe_ingredients_strings }
                        </div>
                    </div>
                    <article className="recipe-page__text my-3">
                        { this.recipe_text }
                    </article>
                    <div className="recipe-page__stats">
                        <span className="text-muted">{ this.recipe_post_time }</span>
                        <div className="recipe-page__stat-icons">
                            <img src={ comment_icon } className="recipe-page__icon" alt="comment icon"/>
                            <span>{ this.state.comments.length }</span>
                            <div data-recipe-id={ this.recipe_id } className={"recipe-page__like-area"
                            + (this.recipe_is_liked ? " recipe-page__like-area_liked" : "")}
                                 onClick={(localStorage.getItem('role') === 'user' ?
                                     (e) => this.pressLike(e) : null)}>
                                <img src={ like_not_active } className="recipe-page__icon recipe-page__like_empty d-block"
                                     alt="liked already"/>
                                <img src={ like_active } className="recipe-page__icon recipe-page__like_filled d-block"
                                     alt="not liked yet"/>
                            </div>
                            <span>{ this.state.likes }</span>
                        </div>
                    </div>
                    <div className="recipe-page__comments">
                        {(this.state.comments.length > 0 ? <h3 className="h4 mb-3">Комментарии:</h3> : null)}
                        { this.state.comments }
                        { this.leave_a_comment }
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
