var test = require('tape')
	, parse = require('./')
	; 

test('basic test', function (t) {
	var d = parse('stoner.steve.weedcopter.com');
	t.equal(d.tld, 'com');
	t.equal(d.sld, 'weedcopter');
	t.equal(d.domain, 'steve.weedcopter.com');
	t.equal(d.domainName, 'weedcopter.com');
	t.equal(d.host, 'stoner');
	t.equal(d.level(3), 'steve');
	t.equal(d.level(), 4);
	t.end();
});
test('something.io test', function (t) {
	var d = parse('something.io');
	t.equal(d.tld, 'io');
	t.equal(d.sld, 'something');
	t.equal(d.domain, 'io');
	t.equal(d.domainName, 'something.io');
	t.equal(d.host, 'something');
	t.equal(d.level(3), null);
	t.equal(d.level(), 2);
	t.end();
});
test('country-tlds', function(t) {
  var d = parse('stoner.steve.weedcopter.co.uk', { countryMerge : true });
  t.equal(d.tld, 'co.uk');
  t.equal(d.sld, 'weedcopter');
  t.equal(d.domain, 'steve.weedcopter.co.uk');
  t.equal(d.domainName, 'weedcopter.co.uk');
  t.equal(d.host, 'stoner');
  t.equal(d.level(3), 'steve');
  t.equal(d.level(), 4);
  t.end();
});
test('.co url', function(t) {
  var d = parse('stoner.steve.weedcopter.co', { countryMerge : true });
  t.equal(d.tld, 'co');
  t.equal(d.sld, 'weedcopter');
  t.equal(d.domain, 'steve.weedcopter.co');
  t.equal(d.domainName, 'weedcopter.co');
  t.equal(d.host, 'stoner');
  t.equal(d.level(3), 'steve');
  t.equal(d.level(), 4);
  t.end();
});
test('com.co url', function(t) {
  var d = parse('stoner.steve.weedcopter.com.co', { countryMerge : true });
  t.equal(d.tld, 'com.co');
  t.equal(d.sld, 'weedcopter');
  t.equal(d.domain, 'steve.weedcopter.com.co');
  t.equal(d.domainName, 'weedcopter.com.co');
  t.equal(d.host, 'stoner');
  t.equal(d.level(3), 'steve');
  t.equal(d.level(), 4);
  t.end();
});
test('org.co url', function(t) {
  var d = parse('stoner.steve.weedcopter.org.co', { countryMerge : true });
  t.equal(d.tld, 'org.co');
  t.equal(d.sld, 'weedcopter');
  t.equal(d.domain, 'steve.weedcopter.org.co');
  t.equal(d.domainName, 'weedcopter.org.co');
  t.equal(d.host, 'stoner');
  t.equal(d.level(3), 'steve');
  t.equal(d.level(), 4);
  t.end();
});
test('nom.co url', function(t) {
  var d = parse('stoner.steve.weedcopter.nom.co', { countryMerge : true });
  t.equal(d.tld, 'nom.co');
  t.equal(d.sld, 'weedcopter');
  t.equal(d.domain, 'steve.weedcopter.nom.co');
  t.equal(d.domainName, 'weedcopter.nom.co');
  t.equal(d.host, 'stoner');
  t.equal(d.level(3), 'steve');
  t.equal(d.level(), 4);
  t.end();
});
test('net.co url', function(t) {
  var d = parse('stoner.steve.weedcopter.net.co', { countryMerge : true });
  t.equal(d.tld, 'net.co');
  t.equal(d.sld, 'weedcopter');
  t.equal(d.domain, 'steve.weedcopter.net.co');
  t.equal(d.domainName, 'weedcopter.net.co');
  t.equal(d.host, 'stoner');
  t.equal(d.level(3), 'steve');
  t.equal(d.level(), 4);
  t.end();
});
test('net.co url using defaults', function(t) {
  parse.defaults({ countryMerge : true });
  var d = parse('stoner.steve.weedcopter.net.co');
  t.equal(d.tld, 'net.co');
  t.equal(d.sld, 'weedcopter');
  t.equal(d.domain, 'steve.weedcopter.net.co');
  t.equal(d.domainName, 'weedcopter.net.co');
  t.equal(d.host, 'stoner');
  t.equal(d.level(3), 'steve');
  t.equal(d.level(), 4);
  t.end();
});
test('no error on country', function(t) {
  var d = parse(undefined);
  t.equal(d.tld, null);
  t.end(); // it didn't error :)
});
