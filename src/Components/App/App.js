import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
// import Track from '../Track/Track';
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

  savePlaylist() {
    Spotify.savePlaylist(this.state.playlistName, this.state.playlistTracks.id);
    this.setState({playlistName : "New Playlist"});
    this.setState({playlistTracks : []});
  }

  search(searchTerm) {
//    Spotify.search(searchTerm).then(searchTracks => {
console.log(Spotify.search(searchTerm));
//    this.setState({searchResults : searchTracks});
//  });
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
