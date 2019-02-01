let accessToken = '';
const clientId = 'a32bfe6cd27848ca8bf8741b147cc33e';
const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  async getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      try {
        const response = await fetch(`${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`);
        if (response.ok) {
          const jsonResponse = await response.json();
          accessToken = jsonResponse.match(/access_token=([^&]*)/);
          let expiresIn = jsonResponse.match(/expires_in=([^&]*)/);
          if (accessToken) {
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
          } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
          }
          return accessToken, expiresIn;
        }
        throw new Error('Request failed');
      }
      catch (error) {
console.log('Fetch failed ' + error);
        throw new Error('Fetch failed');
        return;
      }
    }
  }, // End of getAccessToken

  async search(searchTerm) {
    Spotify.getAccessToken();
    if (!accessToken) {
      return;
    } else {
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
        {
          headers: {Authorization: `Bearer ${accessToken}`}
        });
      if (response.ok) {
        const jsonResponse = await response.json();
        const trackArray = [];
        if (jsonResponse) {
          trackArray = jsonResponse.map(track => ({
            id : track.id,
            name : track.name,
            artist : track.artist[0].name,
            album : track.album.name,
            uri : track.uri
          }));
          return trackArray;
        }
      }
    }
    catch (error) {
      console.log(error);
      const trackArray = [];
      return trackArray;
    }
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
