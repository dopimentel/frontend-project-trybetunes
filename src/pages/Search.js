import React, { Component } from 'react';
import Header from './components/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        Search
        <Header />
      </div>
    );
  }
}

export default Search;