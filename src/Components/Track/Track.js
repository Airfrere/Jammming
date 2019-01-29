import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {isRemoval: false};
    this.state.renderAction = this.state.renderAction.bind(this);
    this.addTrack = this.addTrack(this);
    this.removeTrack = this.removeTrack(this);
  }

  addTrack(track) {
    this.props.onAdd(this.props.track);
  }

  removeTrack(track) {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{ this.props.track.name }</h3>
          <p>{ this.props.track.artist } | { this.props.track.album }</p>
        </div>
          {this.state.isRemoval ? (
            <a className="Track-action" onClick={ this.removeTrack } >{ this.renderAction() }</a>
          ) : (
            <a className="Track-action" onClick={ this.addTrack } >{ this.renderAction() }</a>
          )}
      </div>
    )
  }

  renderAction() {
    const removalState = this.state.isRemoval ? '+' : '-';
    return removalState;
  }
}

export default Track;
