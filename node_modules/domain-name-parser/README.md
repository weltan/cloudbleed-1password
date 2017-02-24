node-domain-name-parser
=======================

A simple parser that breaks apart a domain name into its components

[![build status](https://secure.travis-ci.org/wankdanker/node-domain-name-parser.png)](http://travis-ci.org/wankdanker/node-domain-name-parser)

install
=======

npm

```bash
npm install domain-name-parser
```

usage
=====

```javascript
var parse = require('domain-name-parser')
  , d = parse('host.subdomain.domain.com')
  ;

console.log(
  d.tld            //"com" -- the first part on the right
  , d.sld          //"domain" -- the second part from the right
  , d.host         //"host" -- the left-most part
  , d.domainName   //"domain.com" -- always the commonly referred to part (sld + tld)
  , d.domain       //"subdomain.domain.com" -- everything except the host
  , d.level(3)     //"subdomain" -- specific domain level part, 1 based (tld is level 1)
);
```

api
===

* parse(name, opts);
   * name - string: the domain name you want to parse
   * opts.countryMerge - boolean, default false: if TLD is a country TLD (eg: uk, cn, ru) merge it with the next part and treat that as the TLD
* parse.defaults(opts);
   * opts - same as available to parse(). Used as the default for all calls to parse();

license
=======

MIT
