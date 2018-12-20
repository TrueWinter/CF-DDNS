# CF-DDNS

This will allow you to use CloudFlare as DDNS allowing you to access a server at your home even if you have a dynamic IP address (like most people).

**Please note: While this was tested as much as possible, I was not able to fully test it. This is due to me moving houses and the new house having a static IP address with ISP managed internet facing equipment.**

## Configuration

The configuration file looks like this:

```
/* eslint-disable */
var config = {
	"APIURL": "https://api.cloudflare.com/client/v4/", // API URL
	"zone": "c51a--ZONE ID--675259", // Your ZONE ID
	"APIKey": "70--API KEY--629a8fe", // API key
	"email": "n--ACCOUNT EMAIL-.com", // Account email
	"name": "ddns.website.com", // Domain to update
	"ttl": 120, // TTL
	"proxied": true, // Proxied or not (orange cloud: true, grey cloud: false)
	"updateInterval": 900000 // The time (in ms) between sending an update request
};

module.exports = config;
```

It should be easy enough to understand; just paste the zone ID and API key where it should be and set everything else.

## Usage

All you need to do is to run the `index.js` file with Node.js. You can run this with PM2 so it runs in the background and restarts if it crashes.

## License

Copyright 2018 NdT3Development (Nicholis du Toit)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
