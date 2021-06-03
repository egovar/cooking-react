import React, { Component } from 'react';

import Popper from 'popper.js';
import { Modal } from 'bootstrap';

import './app.css';

import Header from "../header/header";
import Main from "../main/main";

import server from "../../config/server";
let auth_modal;

export default class App extends Component {
  render() {
      return (
          <div>
            <Header onSignUp={ this.createUser } onAuthClick={ this.openAuthModal } onSignIn={ this.signIn }
            user_data={ this.state } onLogOut={ this.logOut }/>
            <Main user_role={ this.state.role } onAuthClick={ this.openAuthModal } />
          </div>
      );
  }
  constructor() {
      super();
      this.initialState = {id: -1, login: 'undefined', token: 'undefined', role: 'guest'}
      this.state = {
          id: localStorage.getItem('id'),
          token: localStorage.getItem('token'),
          login: localStorage.getItem('login'),
          role: localStorage.getItem('role')||'guest'
      }
  }

  componentDidMount() {
      auth_modal = new Modal(document.getElementById('auth-modal'),{ backdrop: true, keyboard: true});
  }

    Auth = (e, route) => {
      e.preventDefault()
        let login, password;
        if (route === '/api/user/create') {
            login = document.getElementById('sign-up__login').value;
            password = document.getElementById('sign-up__password').value;
        } else {
            login = document.getElementById('sign-in__login').value;
            password = document.getElementById('sign-in__password').value;
        }
      fetch(`${server}${route}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              login: login,
              password: password
          })
      }).then((response) => {
          response.json().then(({ id, token, login, role }) => {
              if (id !== -1) {
                  this.setState((state) => {
                      localStorage.setItem('token', token);
                      localStorage.setItem('id', id);
                      localStorage.setItem('role', role);
                      localStorage.setItem('login', login);
                      return ({
                          id: id,
                          token: token,
                          role: role,
                          login: login
                      });
                  });
                  auth_modal.hide();
                  window.location.href = '/';
              } else {
                  alert('Неверный логин/пароль');
              }
          });
      }).catch((error) => console.log(error));
    }

    createUser = (e) => {
      this.Auth(e, '/api/user/create');
    }

    signIn = (e) => {
      this.Auth(e, '/api/sign_in');
    }

    openAuthModal = () => {
      auth_modal.show();
    }

    logOut = () => {
      fetch(`${server}/api/sign_out`, {
          method: 'DELETE',
          headers: {
              token: localStorage.getItem('token')
          }
      }).then(() => {
          localStorage.clear();
          localStorage.setItem('role', 'guest');
          localStorage.setItem('id', '-1');
          this.setState(this.initialState);
          window.location.href = '/';
      });
    }
}

