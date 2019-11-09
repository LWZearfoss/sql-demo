var express = require('express');
var SSH2Promise = require('ssh2-promise');
var parse = require('csv-parse/lib/sync');

const ip = '';
const user = '';
const key = '';

var app = express();
app.set('view engine', 'pug');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'SQL'
	});
});

app.post('/', function(req, res){
	var sshconfig = {
		host: ip,
		username: user,
		privateKey: require('fs').readFileSync(key)
	};
	var ssh = new SSH2Promise(sshconfig);
	var query = req.body.query;
	var ssh = new SSH2Promise(sshconfig);
	ssh.exec('echo \' set echo off; \n set colsep ,; \n set pagesize 50000; \n set trimspool on; \n set trimout on; \n set feedback off; \n set underline off; \n set headsep off; \n set linesize 9999; \n ' + query + ' \' | sqlplus -S user101/pass101').then((data) => {
		res.send(parse(data, {skip_empty_lines: true, trim: true}))});
});

const server = app.listen(7000, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});
