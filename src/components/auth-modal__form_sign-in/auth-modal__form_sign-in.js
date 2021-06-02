import React from 'react';

const AuthModalFormSignIn = ({ onSignIn }) => {
    return (
        <form onSubmit={ onSignIn } className="auth-modal__form_sign-in sign-in tab-pane fade show active" id="sign-in">
            <div>
                <div className="mb-4">
                    <label htmlFor="sign-in__login" className="form-label visually-hidden">Логин</label>
                    <input type="text" className="form-control" id="sign-in__login" placeholder="Логин" required/>
                </div>
                <div className="mb-5">
                    <label htmlFor="sign-in__password" className="form-label visually-hidden">Пароль</label>
                    <input type="password" className="form-control" id="sign-in__password"  placeholder="Пароль"
                           required/>
                </div>
                <button type="submit" className="btn btn-primary d-block w-50 mx-auto">Войти</button>
            </div>
        </form>
    );
}

export default AuthModalFormSignIn;