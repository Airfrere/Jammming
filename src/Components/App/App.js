import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [{
      id: '1234',
      name: 'Won\'t Get Fooled Again',
      album: 'Who\'s Next',
      artist: 'The Who'
    }]
  };

    this.state = {playlistName: 'My playlist'};
    this.state = {playlistTracks: [{
      id: '1', name: 'Song1', album: 'Album1', artist: 'Artist1'}, {
      id: '2', name: 'Song2', album: 'Album2', artist: 'Artist2'
    }]}

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack(this);
    this.updatePlaylistName = this.updatePlaylistName(this);
  }

  addTrack(track) {
    const alreadyInPlaylist = this.state.playlistTracks.some(function (el) {
      return el.id === track.id;
    });
    if (!alreadyInPlaylist) {
      const newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);
      this.setState({ playlistTracks : newPlaylist });
    }
  }

  removeTrack(track) {
    const newPlaylist = this.state.playlistTracks.filter(function (el) {
      return el.id !== track.id;
    })
    this.setState({ playlistTracks : newPlaylist });
  }

  updatePlaylistName(name) {
    this.setState( { playlistName : name });
  }

// This should go after <div className="App">  <!-- Add a SearchBar component -->
  render() {
console.log(this.state.searchResults);
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <div className="App-playlist">
              <SearchResults searchResults={ this.state.searchResults } onAdd={ this.addTrack } />
              <Playlist
                playlistName={ this.state.playlistName }
                playlistTracks={ this.state.playlistTracks }
                onRemove={ this.removeTrack }
                onNameChange={ this.updatePlaylistName }
              />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
