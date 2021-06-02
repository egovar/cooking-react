import React, { useEffect } from 'react';

import server from "../../config/server";

const EditProfileModal = ({ onCheckLogin, onCheckPasswords }) => {

    useEffect(() => {
        const new_password = document.getElementById('edit-password__input_new-pass');
        const repeat_new_password = document.getElementById('edit-password__input_repeat-new-pass');
        const edit_password_button = document.getElementById('edit-password__button');
        new_password.addEventListener('input', () => {
            onCheckPasswords(new_password, repeat_new_password, edit_password_button)
        });
        repeat_new_password.addEventListener('input', () => {
            onCheckPasswords(new_password, repeat_new_password, edit_password_button)
        });
    })

    const editPassword = (e, old_pass_input, new_pass_input) => {
        e.preventDefault();
        fetch(`${ server }/api/user/edit_password`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            },
            body: JSON.stringify({
                old_password: old_pass_input.value,
                new_password: new_pass_input.value
            })
        })
            .then((res) => res.json()
                .then((obj) => {
                    if (!obj) {
                        alert('Неверно введен пароль')
                    }
                }))
            .catch((err) => console.log(err));
    }

    const editLogin = (e, login_input) => {
        e.preventDefault();
        const new_login = login_input.value
        fetch(`${ server }/api/user/edit_login`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            },
            body: JSON.stringify({
                new_login: new_login
            })
        })
            .then((res) => res.json()
                .then((obj) => {
                    console.log(obj);
                    localStorage.setItem('login', new_login);
                    localStorage.getItem('login');
                }))
            .catch((err) => console.log(err));
    }

    return (
        <div className="edit-profile-modal modal fade" id="edit-profile-modal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Редактирование профиля</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ul className="nav nav-tabs mb-4" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab"
                                        data-bs-target="#edit-login" type="button" role="tab" aria-controls="edit-login"
                                        aria-selected="true">Сменить логин
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab"
                                        data-bs-target="#edit-password" type="button" role="tab"
                                        aria-controls="edit-password" aria-selected="false">Сменить пароль
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <form id="edit-login"  className="tab-pane fade show active" onSubmit={ (e) => {
                                editLogin(e, document.getElementById('edit-login__input'))
                            }}>
                                <label htmlFor="edit-login__input" className="form-label visually-hidden">Новый логин
                                </label>
                                <input type="text" className="form-control" id="edit-login__input"
                                       placeholder="Новый логин" onInput={ () => {
                                           onCheckLogin(document.getElementById('edit-login__input'),
                                               document.getElementById('edit-login__button'));
                                }} required/>
                                <div className="input__subtext">Логин занят, попробуйте другой</div>
                                <button className="btn-primary btn d-block mx-auto mt-3" id="edit-login__button" disabled>
                                    Сменить логин
                                </button>
                            </form>
                            <form id="edit-password" className="tab-pane fade show" onSubmit={(e) => {
                                editPassword(e, document.getElementById('edit-password__input_old-pass'),
                                    document.getElementById('edit-password__input_new-pass'))
                            }}>
                                <label htmlFor="edit-password__input_old-pass" className="form-label visually-hidden">
                                    Старый пароль
                                </label>
                                <input type="password" className="form-control mb-4" id="edit-password__input_old-pass"
                                       placeholder="Старый пароль" required/>

                                <label htmlFor="edit-password__input_new-pass" className="form-label visually-hidden">
                                    Новый пароль
                                </label>
                                <input type="password" className="form-control mb-3" id="edit-password__input_new-pass"
                                       placeholder="Новый пароль" required/>

                                <label htmlFor="edit-password__input_repeat-new-pass"
                                       className="form-label visually-hidden">
                                    Повторите новый пароль
                                </label>
                                <input type="password" className="form-control"
                                       id="edit-password__input_repeat-new-pass" placeholder="Повторите новый пароль"
                                       required/>
                                <div className="input__subtext">Введенные пароли не совпадают</div>

                                <button className="btn-primary btn mt-3" id="edit-password__button">Сменить пароль</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfileModal;