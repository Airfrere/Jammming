const userAccessToken = '';
const clientId = 'a32bfe6cd27848ca8bf8741b147cc33e';
const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/';

constant Spotify = {
  getAccessToken() {
    if userAccessToken {
      return userAccessToken
    } else {
      fetch(`${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed');
      },
      networkError => {
        console.log(networkError.message);
      }).then(jsonResponse => { // this part may not be necessary
        // parse for userAccessToken and expiration
      })
    }
  }
}

export default Spotify;
