import React, { Component } from 'react';
import Header from './components/Header';

class Search extends Component {
  state = {
    search: '',
    isPesquisarButtonDisabled: true,
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.enableButtonPesquisar();
    });
  };

  enableButtonPesquisar = () => {
    const { search } = this.state;
    if (search.length > 1) {
      this.setState({ isPesquisarButtonDisabled: false });
    }
  }

  render() {
    const { search, isPesquisarButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        <label htmlFor="search">
          Search
          <input
            name="search"
            type="text"
            id="search"
            value={ search }
            data-testid="search-artist-input"
            onChange={ this.handleOnChange }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isPesquisarButtonDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
