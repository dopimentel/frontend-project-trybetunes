import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './components/Loading';

class Login extends Component {
  state = {
    name: '',
    isEnterButtonDisabled: true,
    loading: false,
    redirect: false,
  };

  handleClick = () => {
    this.setState({ loading: true }, async () => {
      const { name: param } = this.state;
      await createUser({ name: param });
      this.setState({ loading: false, redirect: true });
    });
  };

  enableButtonSave = () => {
    const { name } = this.state;
    if (name.length > 2) {
      this.setState({ isEnterButtonDisabled: false });
    }
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.enableButtonSave();
    });
  };

  render() {
    const { name, loading, redirect, isEnterButtonDisabled } = this.state;
    return (
      <div>
        {redirect ? (
          <Redirect to="/search" />
        ) : (
          <div>
            {loading ? (
              <Loading />
            ) : (
              <div data-testid="page-login">
                <label htmlFor="name">
                  Nome
                  <input
                    name="name"
                    value={ name }
                    data-testid="login-name-input"
                    id="name"
                    onChange={ this.handleOnChange }
                  />
                </label>
                <button
                  type="button"
                  disabled={ isEnterButtonDisabled }
                  data-testid="login-submit-button"
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Login;
