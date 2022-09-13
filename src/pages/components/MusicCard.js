import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
  };

  handleOnChange = () => {
    const { music } = this.props;
    this.setState({ loading: true }, async () => {
      await addSong(music);
      this.setState({ loading: false });
    });
  };

  render() {
    const { loading } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ `${previewUrl}` } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="fav">
          Favorita
          <input
            type="checkbox"
            id="fav"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleOnChange }
          />
        </label>
        {loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.string,
  music: PropTypes.string,
}.isRequired;

export default MusicCard;
