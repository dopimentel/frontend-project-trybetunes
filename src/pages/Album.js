import React, { Component } from 'react';
import Header from './components/Header';

class Album extends Component {
  render() {
    const { artistName, collectionName } = this.props;
    return (
      <div data-testid="page-album">
        Album Search
        <Header />
        <p>{artistName}</p>
        <p>{collectionName}</p>
      </div>
    );
  }
}

export default Album;
