import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './create-recipe.css';
import plus from '../../assets/plus.svg';
import plus_white from '../../assets/plus_white.svg';
import trash_bin_red from '../../assets/trash-bin_red.svg';
import trash_bin_white from '../../assets/trash-bin_white.svg'

import server from "../../config/server";

export default class CreateRecipe extends Component {

    constructor() {
        super();
        this.state = {
            ingredient_inputs: [],
            redirect: false
        };
    }

    capitalize = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }

    packToFormData = () => {
        const formdata = new FormData();
        formdata.append('picture', document.getElementById('recipe_photo').files[0]);
        formdata.append('title', this.capitalize(document.getElementById('recipe_title').value));
        formdata.append('text', document.getElementById('recipe_text').value);
        formdata.append('time_minutes', document.getElementById('recipe_cooking_time').value);
        const inputs_array = document.querySelectorAll('.ingredient-input-group');
        const ingredients_array = [];
        for (let i = 0; i < inputs_array.length; i++){
            ingredients_array.push({
                ingredient_name: this.capitalize(inputs_array[i]
                    .getElementsByClassName('ingredient-input-group__name')[0].value),
                ingredient_quantity: inputs_array[i]
                    .getElementsByClassName('ingredient-input-group__quantity')[0].value,
                ingredient_unit_name: inputs_array[i]
                    .getElementsByClassName('ingredient-input-group__unit')[0].value
            });
        }
        formdata.append('ingredients_array', JSON.stringify(ingredients_array));
        return formdata;
    }

    createRecipe = (e) => {
        e.preventDefault();
        fetch(`${server}/api/recipe/create`, {
            method: 'POST',
            headers: {
                token: localStorage.getItem('token')
            },
            body: this.packToFormData()
        })
            .then((result) => result.json().then((res) => this.setState({ redirect: res })))
            .catch((err) => console.log(err));
    }

    key = 0;

    ingredient_input = (key) => {
        return (
            <div className="input-group ingredient-input-group mb-3" key={ key }>
                <input type="text" className="form-control ingredient-input-group__name" required
                       aria-label="Название ингредиента" placeholder="Название ингредиента"/>
                <input type="number" className="form-control ingredient-input-group__quantity" placeholder="Количество"
                       aria-label="Количество" required/>
                <select className="form-select ingredient-input-group__unit" aria-label="Единицы измерения"
                        defaultValue="гр." required>
                    <option value="null" disabled>Единицы измерения</option>
                    <option value="шт.">шт.</option>
                    <option value="гр.">гр.</option>
                    <option value="ст.л">ст.л.</option>
                    <option value="ч.л.">ч.л.</option>
                </select>
                <button className="btn btn-outline-danger" type="button" data-key={ key } onClick={ (e) => this.deleteItemFromInputs(e, e.currentTarget.dataset.key) }>
                    <img src={ trash_bin_red } alt="remove ingredient" className="create-recipe__icon create-recipe__bin-icon_red create-recipe__bin-icon"/>
                    <img src={ trash_bin_white } alt="remove ingredient" className="create-recipe__icon create-recipe__bin-icon_white create-recipe__bin-icon"/>
                </button>
                <button className="btn btn-outline-success" type="button" onClick={ this.addItemToInputs }>
                    <img src={ plus } alt="add ingredient" className="create-recipe__icon create-recipe__plus-icon_green create-recipe__plus-icon"/>
                    <img src={ plus_white } alt="add ingredient" className="create-recipe__icon create-recipe__plus-icon_white create-recipe__plus-icon"/>
                </button>
            </div>
        )
    }

    addItemToInputs = () => {
        const inputs = this.state.ingredient_inputs;
        this.key += 1;
        this.setState({ ingredient_inputs: [...inputs, this.ingredient_input(this.key)] });
    }

    deleteItemFromInputs = ( e, del_key ) => {
        e.stopPropagation();
        const inputs = this.state.ingredient_inputs;
        const index = inputs.findIndex((input) => input.key === del_key)
        inputs.splice(index, 1);
        this.setState({ingredient_inputs: [...inputs]});
    }

    render() {
        if (this.state.redirect === false) {
            return (
                <form className="create-recipe container" onSubmit={(e) => this.createRecipe(e)}>
                    <h2 className="h2 my-3">Опубликовать рецепт</h2>
                    <label htmlFor="recipe_title" className="visually-hidden">Название рецепта</label>
                    <input className="form-control form-control-lg mb-3" type="text" placeholder="Название рецепта"
                           aria-label=".form-control-lg example" id="recipe_title" required/>
                    <label htmlFor="recipe_cooking_time" className="visually-hidden">Время приготовления в
                        минутах</label>
                    <input className="form-control form-control-lg mb-4" type="number"
                           placeholder="Время приготовления в минутах"
                           aria-label=".form-control-lg example" id="recipe_cooking_time" pattern="\d*" required/>
                    <h3 className="h3 my-3">Ингредиенты:</h3>
                    <div className="input-group ingredient-input-group mb-3">
                        <input type="text" className="form-control ingredient-input-group__name"
                               placeholder="Название ингредиента" required aria-label="Название ингредиента"/>
                        <input type="number" className="form-control ingredient-input-group__quantity"
                               placeholder="Количество" required aria-label="Количество" step="0.1"/>
                        <select className="form-select ingredient-input-group__unit" aria-label="Единицы измерения"
                                defaultValue="гр." required>
                            <option value="null" disabled>Единицы измерения</option>
                            <option value="шт.">шт.</option>
                            <option value="гр.">гр.</option>
                            <option value="ст.л">ст.л.</option>
                            <option value="ч.л.">ч.л.</option>
                        </select>
                        <button className="btn btn-outline-success" type="button" onClick={this.addItemToInputs}>
                            <img src={plus} alt="add ingredient"
                                 className="create-recipe__icon create-recipe__plus-icon_green create-recipe__plus-icon"/>
                            <img src={plus_white} alt="add ingredient"
                                 className="create-recipe__icon create-recipe__plus-icon_white create-recipe__plus-icon"/>
                        </button>
                    </div>
                    {this.state.ingredient_inputs}
                    <label htmlFor="recipe_photo" className="form-label m-0">
                        <h3 className="h3 mb-3">Заглавное фото:</h3>
                    </label>
                    <input className="form-control form-control-lg mb-3" id="recipe_photo" type="file"
                           accept=".jpg,.png"
                           required/>
                    <label htmlFor="recipe_text" className="form-label m-0"><h4 className="h4 my-3">Подробно опишите
                        процесс приготовления блюда</h4></label>
                    <textarea className="form-control mb-3" id="recipe_text" rows="7" required></textarea>
                    <button type="submit" className="btn btn-primary w-50 m-auto mb-5 d-block">Опубликовать</button>
                </form>
            );
        } else {
            return <Redirect to={'/recipe/' + this.state.redirect }/>
        }
    }
}