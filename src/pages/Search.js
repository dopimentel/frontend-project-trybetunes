import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './components/Loading';
import Album from './Album';

class Search extends Component {
  state = {
    search: '',
    loading: false,
    isPesquisarButtonDisabled: true,
    albumList: [],
    artistSearch: '',
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.enableButtonPesquisar();
    });
  };

  enableButtonPesquisar = () => {
    const { search } = this.state;
    this.setState({ isPesquisarButtonDisabled: true });
    if (search.length > 1) {
      this.setState({ isPesquisarButtonDisabled: false });
    }
  };

  handleOnClick = ({ target: { name } }) => {
    this.setState({ loading: true, search: '', artistSearch: name }, async () => {
      const response = await searchAlbumsAPI(name);
      this.setState({ albumList: [...response], loading: false }, () => console.log(this.state.albumList));
    });
  };

  render() {
    const {
      search,
      isPesquisarButtonDisabled,
      loading,
      albumList,
      artistSearch,
    } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
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
              onClick={ this.handleOnClick }
              name={ search }
            >
              Pesquisar
            </button>
          </div>
        )}
        <div>
          {!albumList.length ? (
            <p>Nenhum álbum foi encontrado</p>
          ) : (
            <ul>
              <p>
                Resultado de álbuns de:
                {' '}
                { artistSearch }
              </p>
              {albumList.map((album) => {
                const { collectionId, artistName, collectionName } = album;
                return (
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                    key={ collectionId }
                  >
                    <Album
                      collectionName={ collectionName }
                      collectionId={ collectionId }
                      artistName={ artistName }
                    />
                  </Link>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
