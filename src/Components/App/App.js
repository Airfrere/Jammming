import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

// Called from SearchResults < Tracklist < Track.renderAction
// Adds a track from the search results to the playlist
// when user clicks + unless it already exists there
  addTrack(track) {
    const alreadyInPlaylist = this.state.playlistTracks.some((el) => {
      return el.id === track.id;
    });
    if (!alreadyInPlaylist) {
      const newPlaylist = this.state.playlistTracks.concat(track);
      this.setState({ playlistTracks : newPlaylist });
    }
  }

// Called from Playlist < Tracklist < Track.renderAction
// Removes a track from Jammming's playlist when user clicks -
  removeTrack(track) {
    const newPlaylist = this.state.playlistTracks.filter((el) => {
      return el.id !== track.id;
    })
    this.setState({ playlistTracks : newPlaylist });
  }

// Called from Playlist.handleNameChange
// Saves the new playlist name entered by user
  updatePlaylistName(name) {
    this.setState( { playlistName : name });
  }

// Called from Playlist.render
// Saves the playlist from Jammming to user's account on Spotify
  savePlaylist() {
    const playlistUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, playlistUris).then(response => {
      if (response) {
        this.setState({ playlistName: "New Playlist",
          playlistTracks : [] });
      }});
  }

// Called from SearchBar.search
// Searches Spotify for albums, artists and songs matching the term entered by user
  search(searchTerm) {
    Spotify.search(searchTerm).then(searchTracks => {
    this.setState({searchResults : searchTracks});
  });
}

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={ this.search } />
            <div className="App-playlist">
              <SearchResults searchResults={ this.state.searchResults } onAdd={ this.addTrack } />
              <Playlist
                playlistName={ this.state.playlistName }
                playlistTracks={ this.state.playlistTracks }
                onRemove={ this.removeTrack }
                onNameChange={ this.updatePlaylistName }
                onSave={ this.savePlaylist }
              />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
