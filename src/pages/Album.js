import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './components/MusicCard';

class Album extends Component {
  state = {
    albumMusics: [],
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const response = await getMusics(id);
    this.setState({ albumMusics: response });
  }

  render() {
    const { albumMusics } = this.state;
    return (
      <div data-testid="page-album">
        Album Search
        <Header />
        <div>
          <p data-testid="artist-name">Artist Name</p>
          <p data-testid="album-name">Collection Name</p>
        </div>

        {albumMusics.map((music, index) => {
          const { trackId, trackName, previewUrl } = music;
          if (index !== 0) {
            return (
              <MusicCard
                key={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
              />
            );
          }
          return '';
        })}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
