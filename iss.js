const request = require('request');

// Makes a single API request to retrieve the user's IP
/**
 * Input:
 *  - callback (to pass back an error or the IP string)
 * Return: (via callback)
 *  - an error, if any (nullable)
 *  - The IP address as a string (null if error). Ex. '162.245.144.188'
 **/
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

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

// Makes a single API request to retrieve the user's coordinates
/**
 * Input:
 *  - callback (to pass back an error or the coordinates object)
 * Return: (via callback)
 *  - an error, if any (nullable)
 *  - The coordinates (longitude and lattitude) as an object (null if error). Ex. {longitude: -23, latitude: }
 **/
const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    // if non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching coordinates with IP provided. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { longitude, latitude } = JSON.parse(body);
    callback(null, {
      longitude,
      latitude
    });
  });
};

// Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
/**
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    // if non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { response } = JSON.parse(body);

    // response is the array of flyover times
    callback(null, response);
  });
};

// Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
/**
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = (callback) => {
  fetchMyIp((err, ip) => {
    if (err) {
      return callback(err, null);
    }

    fetchCoordsByIP(ip, (err, coordinates) => {
      if (err) {
        return callback(err, null);
      }

      fetchISSFlyOverTimes(coordinates, (err, flyOverTimes) => {
        if (err) {
          return callback(err, null);
        }
    
        callback(null, flyOverTimes);
      });
    });
  });
};

module.exports = { fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };