// Makes a single API request to retrieve the user's IP
/**
 * Input:
 *  - callback (to pass back an error or the IP string)
 * Return: (via callback)
 *  - an error, if any (nullable)
 *  - The IP address as a string (nuill if error). Ex. '162.245.144.188'
 **/

const request = require('request');

const fetchMyIp = (callback) => {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (err, res, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (err) {
      callback(err, null);
      return;
    }
    
    // if non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(err, body);
  });
};

module.exports = { fetchMyIp };