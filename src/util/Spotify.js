let accessToken;
let expiresIn;
const clientId = 'a32bfe6cd27848ca8bf8741b147cc33e';
const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
        accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
        expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
        window.setTimeout(() => accessToken = '', expiresIn*1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        let url = `${authEndpoint}?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = url;
      }
    }
  },

  search(searchTerm) {
    accessToken = this.getAccessToken();
    if (!accessToken) {
      return;
    } else {
      fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
        {
          headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed!');
        },
          networkError => {
            console.log(networkError.message);
          }).then(jsonResponse => {
            let trackArray = [];
            if (jsonResponse.tracks.items) {
              trackArray = jsonResponse.tracks.items.map(track => ({
                id : track.id,
                name : track.name,
                artist : track.artists[0].name,
                album : track.album.name,
                uri : track.uri
              }))
            }
            return trackArray;
          })
    }
  }, // End of search

  async savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris) {
// If either playlistName or tracks is empty, return without doing anything
      return
    } else {
      let userId;
      try {
        let response = await fetch('https://api.spotify.com/v1/me',
          {
            headers: {Authorization : `Bearer ${accessToken}`}
          });
        if (response.ok) {
          let jsonResponse = await response.json();
          userId = response.id;
          try {
            response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
              method: 'POST',
              headers: {
                'Authorization' : `Bearer ${accessToken}`,
                'Content-Type' : 'application/json'
              },
              body : {
                name : `${playlistName}`
              }
            });
            if (response.ok) {
              jsonResponse = await response.json();
              let playlistId = jsonResponse.id;
              try {
                response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                  method: 'POST',
                  headers: {
                    'Authorization' : `Bearer ${accessToken}`,
                    'Content-Type' : 'application/json'
                  },
                  body : {
                    "uris" : JSON.stringify(trackUris)
                  }
                });
                if (response.ok) {
                  jsonResponse = await response.json();
                  playlistId = jsonResponse.id;
                }
              }
              // Catch error from POSTing playlist URIs
              catch(error) {
                console.log(error);
                return;
              }
            }
          }
          // Catch error from POSTing playlistName
          catch(error) {
            console.log(error);
            return;
          }
        }
      }
      // Catch error from fetching userId
      catch(error) {
        console.log(error);
        return;
      }
    }
  } // end of savePlaylist
}; // end of Spotify method

export default Spotify;
