import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {term : ''};
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

// If term is not blank, calls App.search to search Spotify
  search() {
    if (this.state.term) {
      this.props.onSearch(this.state.term);
  }}

  handleTermChange(e) {
    this.setState( { term : e.target.value });
  }

// When user presses Enter after entering a search term, react as if
// the Search button had been clicked
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onKeyUp={ this.handleKeyPress } onChange={ this.handleTermChange } />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
