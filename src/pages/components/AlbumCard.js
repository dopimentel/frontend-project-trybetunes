import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class AlbumCard extends Component {
  render() {
    const { artistName, collectionName } = this.props;
    return (
      <div>
        <p>{artistName}</p>
        <p>{collectionName}</p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
}.isRequired;
