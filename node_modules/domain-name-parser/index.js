var countries = require('./country-codes.json');
var defaults;

module.exports = function (str, opts) {
  return new DomainName(str, opts);
};

module.exports.defaults = function (opts) {
  defaults = opts;
};

var COLOMBIAN_DOMAINS = [
  'COM',
  'ORG',
  'NET',
  'NOM'
]

function isCountryMatch(first, second) {
  var result = false;
  if (first != 'CO' && countries.indexOf(first) >= 0)
    result = true;
  else if ('CO' == first && ~COLOMBIAN_DOMAINS.indexOf(second))
    result = true;
  return result;
}

function DomainName(str, opts) {
  opts = opts || defaults || {};
  this.tokenized = (str || "").split(/\./gi).reverse();
  var first = (this.tokenized[0] || '').toUpperCase();
  var second = (this.tokenized[1] || '').toUpperCase();
  if (opts.countryMerge && isCountryMatch(first, second)) {
    var country = this.tokenized.shift();
    this.tokenized[0] = [this.tokenized[0], country].join('.');
  }
}

DomainName.prototype = {
  get tld() {
    return this.tokenized[0] || null;
  }
  , get sld() {
    return this.tokenized[1] || null;
  }
  , get domainName() {
    return [this.sld, this.tld].join('.');
  }
  , get domain() {
    var tmp = [].concat(this.tokenized);
    tmp.pop();

    return tmp.reverse().join('.');
  }
  , get host() {
    return this.tokenized[this.tokenized.length - 1 ];
  }
  , level : function (index) {
    if (!index) {
      return this.tokenized.length;
    }

    return this.tokenized[index - 1] || null;
  }
  , toString : function () {
    return [].concat(this.tokenized).reverse().join('.');
  }
};

