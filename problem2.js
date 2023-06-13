const fs = require('fs');
const path = require('path');
const moment = require('moment');

const jsonPath = path.join(__dirname, 'problem2.json');
const data = fs.readFileSync(jsonPath, 'utf8');
const car = JSON.parse(data);

// Convert the dates into the specified format (YYYY-MM-DD)
car.accidents.forEach(accident => {
  accident.date = moment(accident.date, 'M/D/YYYY').format('YYYY-MM-DD');
});

// Write the updated results to output2.json
const outputPath = path.join(__dirname, 'output2.json');
fs.writeFileSync(outputPath, JSON.stringify(car, null, 2));

console.log('Conversion completed. Results written to output2.json.');