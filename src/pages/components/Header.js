import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: '',
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const response = await getUser();
      this.setState({ loading: false, name: response.name });
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">
                Search
              </Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">
                Profile
              </Link>
            </li>
          </ul>
        </nav>
        {loading ? <Loading /> : <p data-testid="header-user-name">{name}</p>}
      </header>
    );
  }
}

export default Header;
