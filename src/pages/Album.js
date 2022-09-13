import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    albumMusics: [],
    favs: [],
    artistName: '',
    collectionName: '',
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const favs = await getFavoriteSongs();
    const response = await getMusics(id);
    this.setState({
      albumMusics: response,
      favs,
      artistName: response[0].artistName,
      collectionName: response[0].collectionName,
    });
  }

  render() {
    const { albumMusics, favs, artistName, collectionName } = this.state;
    console.log(albumMusics[0]);
    return (
      <div data-testid="page-album">
        Album Search
        <Header />
        <div>
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{collectionName}</p>
        </div>
        {albumMusics.map((music, index) => {
          const { trackId, trackName, previewUrl } = music;
          if (index !== 0) {
            return (
              <MusicCard
                key={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
                trackId={ trackId }
                music={ music }
                favs={ favs }
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
