import React, { useEffect } from 'react';

const AuthModalFormSignUp = ({ onSignUp, onCheckLogin, onCheckPasswords }) => {

    useEffect(() => {
        const password1 = document.getElementById('sign-up__password');
        const password2= document.getElementById('sign-up__repeat-password');
        const button = document.getElementById('sign-up__button');
        password1.addEventListener('input', () => {
            onCheckPasswords(password1, password2, button)
        });
        password2.addEventListener('input', () => {
            onCheckPasswords(password1, password2, button)
        });
    })


    return (
        <form onSubmit={ (e) => onSignUp(e) } className="auth-modal__form_sign-up sign-up tab-pane fade show" id="sign-up">
            <div>
                <div className="mb-4">
                    <label htmlFor="sign-up__login" className="form-label visually-hidden">Логин</label>
                    <input type="text" className="form-control" id="sign-up__login" placeholder="Логин" required
                    onInput={ () => onCheckLogin(document.getElementById('sign-up__login'),
                        document.getElementById('sign-up__button')) }/>
                    <div className="input__subtext">Логин занят, попробуйте другой</div>
                </div>

                <div className="mb-4">
                    <label htmlFor="sign-up__password" className="form-label visually-hidden">Пароль</label>
                    <input type="password" className="form-control" id="sign-up__password"  placeholder="Пароль"
                           required/>
                </div>
                <div className="mb-5">
                    <label htmlFor="sign-up__repeat-password" className="form-label visually-hidden">
                        Повторите пароль
                    </label>
                    <input type="password" className="form-control" id="sign-up__repeat-password"
                           placeholder="Повторите пароль" required/>
                    <div className="input__subtext">Введенные пароли не совпадают</div>
                </div>
                <button type="submit" className="btn btn-primary d-block w-50 mx-auto" id="sign-up__button" disabled>
                    Создать аккаунт
                </button>
            </div>
        </form>
    );
}

export default AuthModalFormSignUp;