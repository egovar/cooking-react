import React from 'react';
import AuthModalFormSignIn from "../auth-modal__form_sign-in/auth-modal__form_sign-in";
import AuthModalFormSignUp from "../auth-modal__form_sign-up/auth-modal__form_sign-up";

const AuthModal = ({ onSignUp, onSignIn, onCheckLogin, onCheckPasswords }) => {
    return (
        <div className="auth-modal modal fade" id="auth-modal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Войдите на сайт</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ul className="nav nav-tabs mb-4" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab"
                                        data-bs-target="#sign-in" type="button" role="tab" aria-controls="sign-in"
                                        aria-selected="true">Вход
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab"
                                        data-bs-target="#sign-up" type="button" role="tab" aria-controls="sign-up"
                                        aria-selected="false">Регистрация
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <AuthModalFormSignIn onSignIn={ onSignIn }/>
                            <AuthModalFormSignUp onSignUp={ onSignUp } onCheckLogin={ onCheckLogin } onCheckPasswords={
                                onCheckPasswords
                            }/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthModal;