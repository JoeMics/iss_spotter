const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = (passTimesArr) => {
  passTimesArr.forEach(passTime => {
    const { risetime, duration } = passTime;
    
    const date = new Date(0);
    date.setUTCSeconds(risetime);

    console.log(`Next pass at ${date} for ${duration} seconds!`);
  });
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });