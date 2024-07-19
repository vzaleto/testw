const fs = require('fs');
const { calculateCommission } = require('./conculate');

const inputFile = process.argv[2];
const inputData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

const commissions = calculateCommission(inputData);
commissions.forEach(commission => console.log(commission));
