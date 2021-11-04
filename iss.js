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
  request('https://api.ipify.org?format=json', (err, req, body) => {
    callback(err, body);
  });
};

module.exports = { fetchMyIp };