var fs = require('fs');
var urlParser = require('url');
var https = require('https');
var dns = require('dns');
var parse = require('csv-parse/lib/sync');
var domainParser = require('domain-name-parser');

var affectedUrls = [];

urls = parseUrlsFromCsv('affectedSites.csv');
//urls = ['https://1password.com'];

var regEx = /(cfduid|cloudflare)/ig;

urls.forEach((originalUrl) => {
  domain = urlParser.parse(originalUrl).hostname;
  
  checkSetCookie(domain);
  checkDns(domain);
});

function parseUrlsFromCsv(fileName) {
  // read in the file
  var text = fs.readFileSync(fileName, 'utf8');

  allUrls = parse(text);
  var mergedUrls = [].concat.apply([], allUrls);
  urls = mergedUrls.filter(function(elem, pos) {
      return mergedUrls.indexOf(elem) == pos;
  })
  
  return urls;
}

function checkSetCookie(domain) {
  if (domain) {
    //console.log(`Testing:${domain}`);
    https.get(`https://${domain}`, function(res) {
      //console.log(`RESPONSE RECEIVED FOR:${domain}:${res.statusCode}`);
      headers = res.headers;
      for (var header in headers) {
        needle = headers[header];
        if (needle[0]) {
          if (matches = needle[0].match(regEx)) {
            logResults(domain);
          }
        }
      };
    }).on('error', (e) => {
      //console.log(`Got error: ${e.message}`);
    });
  };
}

function checkDns(domain) {
  // apparently there's no way with Node's url library to extract just the naked domain...
  resolveAndReport(domainParser(domain).domainName);
  resolveAndReport(domainParser(domain).domain);
};

function resolveAndReport(domain) {
  dns.resolve(domain, 'NS', (err, addresses) => {
    //console.log(`looking up ${domain}`);
    //console.log('addresses:', addresses);
    if (addresses) {
      hits = 0;
      for (var i = 0; i < addresses.length; i++) {
        if (matches = addresses[i].match(regEx)) {
          hits++;
        }
      };
      if(hits > 0) {
        logResults(domain);
      }
    }
  });
};

function logResults(domain) {
  nakedDomain = domainParser(domain).domainName;
  if(affectedUrls.indexOf(nakedDomain) === -1) {
    console.log(`${nakedDomain}`);
    affectedUrls.push(nakedDomain);
  }
}
