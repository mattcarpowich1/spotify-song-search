const express = require('express');
const router = express.Router();
const request = require('request');
const spotify = require('node-spotify-api');
const { spotifyKeys } = require('../keys.js');

router.post('/search', (req, res) => {
  const { value } = req.body
  let spotify_client = new spotify({
    id: spotifyKeys.client_id,
    secret: spotifyKeys.client_secret
  });
   
  spotify_client.search({ 
    type: 'track', 
    query: value, 
    limit: 3 
  }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
    }
    
    res.json(data)
  });

});

module.exports = router;