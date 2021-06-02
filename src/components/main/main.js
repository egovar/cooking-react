import React from 'react';
import { Switch, Route } from "react-router-dom";
import Feed from "../feed/feed";
import RecipePage from "../recipe-page/recipe-page";
import CreateRecipe from "../create-recipe/create-recipe";

const Main = ({ user_role, onAuthClick }) => {
    return (
        <main className="main">
            <Switch>
                <Route path="/" exact>
                    <Feed user_role={ user_role } onAuthClick={ onAuthClick } categoryName="popular"/>
                </Route>
                <Route path="/new">
                    <Feed user_role={ user_role } onAuthClick={ onAuthClick } categoryName="new"/>
                </Route>
                <Route path="/fast">
                    <Feed user_role={ user_role } onAuthClick={ onAuthClick } categoryName="fast"/>
                </Route>
                <Route path="/medium">
                    <Feed user_role={ user_role } onAuthClick={ onAuthClick } categoryName="medium"/>
                </Route>
                <Route path="/long">
                    <Feed user_role={ user_role } onAuthClick={ onAuthClick } categoryName="long"/>
                </Route>
                <Route path="/favourites">
                    <Feed user_role={ user_role } onAuthClick={ onAuthClick } categoryName="favourites"/>
                </Route>
                <Route path="/recipe/create" children={ <CreateRecipe/> }/>

                <Route path="/recipe/:recipe_id" children={(props) => <RecipePage recipe_id={ props.match.params.recipe_id }/> }/>
            </Switch>
        </main>
    );
}

export default Main;