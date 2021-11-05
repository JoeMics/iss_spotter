const { fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log(`It didn't work! ${error}`);
//     return;
//   }

//   console.log(`It worked! Returned IP: ${ip}`);
// });

// fetchCoordsByIP('ip', (error, data) => {
//   if (error) {
//     console.log(`It didn't work! ${error}`);
//     return;
//   }

//   console.log('It worked! Returned coordinates: ', data);
// });

// fetchISSFlyOverTimes({ longitude: -122.8439, latitude: 49.1888 }, (error, data) => {
//   if (error) {
//     console.log(`It didn't work! ${error}`);
//     return;
//   }

//   console.log('It worked! Returned fly over times ', data);
// });