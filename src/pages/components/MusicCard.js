import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  };

  componentDidMount() {
    this.setState({ checked: this.favVerify() });
  }

  handleOnChangeCheckBox = ({ target: { name, checked } }) => {
    this.setState({ [name]: checked });
    const { music } = this.props;
    this.setState({ loading: true }, async () => {
      await addSong(music);
      this.setState({ loading: false });
    });
  };

  favVerify = () => {
    const { favs, trackId } = this.props;
    return favs.some((fav) => fav.trackId === trackId);
  };

  render() {
    const { loading, checked } = this.state;
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
            name="checked"
            type="checkbox"
            checked={ checked }
            id="fav"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleOnChangeCheckBox }
          />
        </label>
        {loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  favs: PropTypes.array,
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.string,
  music: PropTypes.string,
}.isRequired;

export default MusicCard;
