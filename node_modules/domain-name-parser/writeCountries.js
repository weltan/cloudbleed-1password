var lookup = require('country-code-lookup');
var jsonfile = require('jsonfile');

var file = 'country-codes.json';
var countries = []
//Create an index of country codes
lookup.countries.forEach(function (country) {
  if (country.internet !== '--') {
  	countries.push(country.internet);
  }
});

jsonfile.writeFileSync(file, countries);
