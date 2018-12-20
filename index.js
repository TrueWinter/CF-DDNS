var request = require('request');
var config = require('./config.js');

var APIURL = config.APIURL;

console.log('Running');

function getIPCheck() {
	request.get('https://api.ipify.org/?format=json', function (err, response, body) {
		if (err) return console.error(err);
		var ip = JSON.parse(body).ip;
		check(ip);
	});
}

function getIPUpdate(dID) {
	request.get('https://api.ipify.org/?format=json', function (err, response, body) {
		if (err) return console.error(err);
		var ip = JSON.parse(body).ip;
		update(ip, dID);
	});
}

getIPCheck();

function check (cIP) {
	request({ url: `${APIURL}zones/${config.zone}/dns_records?type=A`, headers: { 'X-AUTH-KEY': config.APIKey, 'X-AUTH-EMAIL': config.email }}, function (err, response, body) {
		if (err) return console.error(err);
		if (!JSON.parse(body).success) return console.error('Something went wrong...');
		var data = JSON.parse(body);
		if (data.result.some((record) => record.name === config.name)) {
			console.log('Record exists for the name given. Will edit this record');
			var domainID = data.result.filter((r) => r.name === config.name)[0].id;
			console.log(`Domain ID: ${domainID}`);
			getIPUpdate(domainID);
			setInterval(function () {
				getIPUpdate(domainID);
			}, config.updateInterval);
		} else {
			console.log('Record for this name does not exist yet. Will create a record and use this');
			request.post({ url: `${APIURL}zones/${config.zone}/dns_records`, headers: { 'X-AUTH-KEY': config.APIKey, 'X-AUTH-EMAIL': config.email }, body: `{ "type": "A", "name":"${config.name}", "content":"${cIP}", "ttl":${config.ttl}, "proxied":${config.proxied} }`}, function (err, response, body) {
				if (err) return console.error(err);
				console.log(`Added. Response: \n${body}`);
				if (!JSON.parse(body).success) return console.error('Something went wrong...');
				var domainID = JSON.parse(body).result.id;
				console.log(`Domain ID: ${domainID}`);
				//getIPUpdate(domainID);
				setInterval(function () {
					getIPUpdate(domainID);
				}, config.updateInterval);
			});
		}
	});
}

function update(cIP, dID) {
	request.put({ url: `${APIURL}zones/${config.zone}/dns_records/${dID}`, headers: { 'X-AUTH-KEY': config.APIKey, 'X-AUTH-EMAIL': config.email }, body: `{ "type": "A", "name":"${config.name}", "content":"${cIP}", "ttl":${config.ttl}, "proxied":${config.proxied} }` }, function (error, response, body) {
		if (error) return console.error(error);
		if (!JSON.parse(body).success) {
			return console.error(`Something went wrong...\nResponse:\n${body}`);
		}
		console.log(`Updated. Result: ${body}`);
	});
}

// GET zones/:zone_identifier/dns_records
