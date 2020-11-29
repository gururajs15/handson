var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var os = require('os');
var pty = require('node-pty');
var Docker = require('dockerode');
var image='centos';
var docker = new Docker({socketPath: '/var/run/docker.sock'});

var terminals = {},
    logs = {},
    containers = {};

app.use('/build', express.static(__dirname + '/../build'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');

 image = req.query.image;
	console.log('IMAGE IS ' + image);
});

app.get('/style.css', function(req, res){
  res.sendFile(__dirname + '/style.css');
});

app.get('/dist/bundle.js', function(req, res){
  res.sendFile(__dirname + '/dist/bundle.js');
});

app.get('/dist/bundle.js.map', function(req, res){
  res.sendFile(__dirname + '/dist/bundle.js.map');
});

app.post('/terminals', function (req, res) {
  var cols = parseInt(req.query.cols),
      rows = parseInt(req.query.rows),
      //image = req.params.image,
      term = pty.spawn(process.platform === 'win32' ? 'cmd.exe' : 'bash', [], {
        name: 'xterm-color',
        cols: cols || 80,
        rows: rows || 24,
        cwd: process.env.PWD,
        env: process.env
      }); //@@
console.log('IMAGE IS ' + image);
//console.log('IMAGE IS ' + req.query.image);
//console.log('IMAGE IS ' + req.body.image);
//try {
  docker.createContainer({
    Cmd: '/bin/sh',
    Image: image,
    // Image: 'node',
    'AttachStdin': true,
    'AttachStdout': true,
    'AttachStderr': true,
    'Tty': true,
    'OpenStdin': true,
     //ExposedPorts: {'3000/tcp': {} },
     //PortBindings: {'3000/tcp': [{ 'HostPort': '3020/tcp' }] ,}
  }, function (err, container) {
    //try { 
	  console.log('attaching to container ' + container.id);//} 
//	  catch (e) { console.log(e); } 
    return container.attach({
      stream: true,
      stdin: true,
      stdout: true
    }) }, function (err, ttyStream) {
      // docker start [container]
      container.start(function(err, data) {
        console.log('Created container with id: ' + container.id);
        containers[container.id] = {
          tty: ttyStream,
          container: container
        };
        logs[container.id] = '';
        ttyStream.on('data', data => {
          console.log('[data]', data);
          logs[container.id] += data;
        });

        res.send(container.id.toString());
        res.end();
      });
    });
  }); 
 
//});

app.post('/terminals/:pid/size', function (req, res) {
  var pid = parseInt(req.params.pid),
      cols = parseInt(req.query.cols),
      rows = parseInt(req.query.rows),
      term = terminals[pid];

  term.resize(cols, rows);
  console.log('Resized terminal ' + pid + ' to ' + cols + ' cols and ' + rows + ' rows.');
  res.end();
});

app.ws('/terminals/:pid', function (ws, req) {
  var container = containers[req.params.pid].container;
  var ttyStream = containers[req.params.pid].tty;
  console.log('Connected to container ' + container.id);
  ws.send(logs[container.id]);

  ttyStream.on('data', function(data) {
    console.log('[data]', data);
    try {
      ws.send(data.toString('utf8'));
    } catch (ex) {
      // The WebSocket is not open, ignore
    }
  });
  ws.on('message', function(msg) {
    console.log('[message]', msg);
    ttyStream.write(msg);
  });
  ws.on('close', function () {
    ttyStream.end();
    container.remove({ force: true }, function() {
      return console.log('container ' + container.id + ' removed');
    });

    // Clean things up
    delete containers[container.id];
    delete logs[container.id];
  });
});

var port = process.env.PORT || 3000,
    host = os.platform() === 'win32' ? '127.0.0.1' : '0.0.0.0';

/* process.once('SIGINT', () => {
                    container.stop(function (err, data) {
 container.remove({ force: true }, function() {
      return console.log('container ' + container.id + ' removed');
		    });
                });
                });
*/
console.log('App listening to http://' + host + ':' + port);
app.listen(port, host);
