import React, { useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";
import Popper from "popper.js";
import { Modal } from 'bootstrap';

import './header.css';
import edit from '../../assets/edit.svg';

import AuthModal from "../auth-modal/auth-modal";
import Categories from "../categories/categories";
import EditProfileModal from "../edit-profile-modal/edit-profile-modal";

import server from "../../config/server";

const Header = ({ onSignUp, onAuthClick, onSignIn, user_data : { id, login, token, role} =
    {id: -1, login: 'undefined', token: 'undefined', role: 'guest'}, onLogOut }) => {

    useEffect(() => {
        if (role !== 'guest') {
            edit_profile_modal = new Modal(document.getElementById('edit-profile-modal'));
        }
    })

    const checkLogin = (input, button) => {
        if (input.value.length > 15) {
            input.value = input.value.slice(0, 15);
        }
        if (input.value.length === 0) {
            input.classList.remove('input_failed');
            button.disabled = true;
        } else {
            fetch(`${server}/api/check_login/${input.value}`)
                .then((res) => {
                    res.json().then(({ is_login_available: is_available }) => {
                        if (!is_available) {
                            input.classList.add('input_failed');
                            button.disabled = true;
                        }
                        else {
                            input.classList.remove('input_failed');
                            button.disabled = false;
                        }
                    }).catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        }
    }

    const checkSamePasswords = (input1, input2, button) => {
        if ((input2.value !== input1.value) && (input2.value !== "")) {
            input2.classList.add('input_failed');
            button.disabled = true;
        } else {
            input2.classList.remove('input_failed');
            button.disabled = false;
        }
    }

    let edit_profile_modal;
    const showEditProfileModal = () => {
        edit_profile_modal.show();
    }
    const user_options = (login, role) => {
        if (role !== 'guest')  {
            return (
                <div className="user__options col-2">
                    <div className="d-flex justify-content-center">
                    <Link to="/user/me"><h3 className="h3 m-0 header__login">{ login }</h3></Link>
                    <button className="btn d-inline-flex align-items-center" onClick={ showEditProfileModal }>
                        <img src={ edit } alt="edit your profile"/>
                    </button>
                    </div>
                    <button type="button" className="p-0 btn btn-link d-block m-auto header__logout-button"
                            onClick={ onLogOut }>
                        Выйти
                    </button>
                    <EditProfileModal onCheckLogin={ checkLogin } onCheckPasswords = { checkSamePasswords }/>
                </div>
            );
        } else  return (
            <button type="button" className="btn btn-primary" onClick={ onAuthClick }>
                Войти
            </button>
        );
    }
    return (
        <header>
            <div className="collapse" id="navbar__collapse_mobile">
                <div className="container p-2 text-center">
                    <h2 className="h1 m-auto text-center">CooKing</h2>
                    <Categories user_role={ role }/>
                </div>
            </div>
            <div className="navbar navbar-light bg-light header">
                <div className="container navbar__container_pc">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbar__collapse_mobile" aria-controls="navbarToggleExternalContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <NavLink className="navbar-brand" to="/">
                        <h1 className="h1">CooKing</h1>
                    </NavLink>
                    <Categories user_role={ role }/>
                    { user_options(login, role)}
                    <AuthModal onSignUp={ onSignUp } onSignIn={ onSignIn } onCheckLogin={ checkLogin }
                               onCheckPasswords={ checkSamePasswords }/>
                </div>
            </div>
        </header>
    );
}

export default Header;