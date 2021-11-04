const { fetchMyIp, fetchCoordsByIP } = require('./iss');

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log(`It didn't work! ${error}`);
//     return;
//   }

//   console.log(`It worked! Returned IP: ${ip}`);
// });

fetchCoordsByIP('123445', (error, data) => {

});