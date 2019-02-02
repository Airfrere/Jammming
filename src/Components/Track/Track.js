import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {isRemoval: false};
    this.renderAction = this.renderAction.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
  }

// Calls App.addTrack to move a track from the list of search results to the playlist
  handleAddTrack() {
    this.props.onAdd(this.props.track);
  }

// Calls App.removeTrack to eliminate a track from the playlist
  handleRemoveTrack() {
    this.props.onRemove(this.props.track);
  }

// Places a + next to tracks in the search results list and a - next to tracks in the playlist
// and determines the action taken when user clicks + or -
  renderAction() {
    return (this.props.isRemoval) ?
      <a className="Track-action" onClick={ this.handleRemoveTrack }>-</a> :
      <a className="Track-action" onClick={ this.handleAddTrack }>+</a>
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{ this.props.track.name }</h3>
          <p>{ this.props.track.artist } | { this.props.track.album }</p>
        </div>
        {this.renderAction()}
      </div>
    )
  }
}

export default Track;
