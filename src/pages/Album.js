import React, { Component } from 'react';
import Header from './components/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        Album
        Search
        <Header />
      </div>
    );
  }
}

export default Album;
