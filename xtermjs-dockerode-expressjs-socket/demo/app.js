var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var os = require('os');
var pty = require('node-pty');
var Docker = require('dockerode');
var dockerHostIP = "135.17.180.132"
//var dockerHostIP = "127.0.0.1"
var dockerHostPort = 2375 
var image='centos';
//var docker = new Docker({socketPath: '/var/run/docker.sock'});
  var ttyStream;
  var term;
var docker = new Docker({ host: dockerHostIP, port: dockerHostPort });

var terminals = {},
    logs = {},
    containers = {};

app.use('/build', express.static(__dirname + '/../build'));

app.get('/linuxbasics.html', function(req, res){
  res.sendFile(__dirname + '/linuxbasics.html');

});

app.get('/linuxcommands.html', function(req, res){
  res.sendFile(__dirname + '/linuxcommands.html');

});

app.get('/home.html', function(req, res){
  res.sendFile(__dirname + '/home.html');

	image = req.query.image;
        console.log('IMAGE inside home ' + image);

});


app.get('/paste', function(req, res){
  //res.sendFile(__dirname + '/home.html');

        msg = req.query.msg;
	        if (ttyStream != null)
	try {
        console.log('Message to paste' + msg);

	        if (ttyStream != null)
     ttyStream.write(msg + '\n');} catch (e) { console.log(e); }
//	term.focus();
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');

 image = req.query.image;
	console.log('IMAGE IS ' + image);
});

app.get('/index.html', function(req, res){
  res.sendFile(__dirname + '/index.html');

// image = req.query.image;
        console.log('IMAGE insied index ' + image);
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
        cols: cols || 40,
        rows: rows || 24,
        cwd: process.env.PWD,
        env: process.env
      }); //@@
console.log('IMAGE IS ' + image);
//console.log('IMAGE IS ' + req.query.image);
//console.log('IMAGE IS ' + req.body.image);
   try { docker.createContainer({
    Cmd: '/bin/sh',
    Image: image,
    // Image: 'node',
    'AttachStdin': true,
    'Privileged': true,
    'AttachStdout': true,
    'AttachStderr': true,
    'Tty': true,
    'OpenStdin': true,
     //ExposedPorts: {'3000/tcp': {} },
     //PortBindings: {'3000/tcp': [{ 'HostPort': '3020/tcp' }] ,}
  }, function (err, container) {
    console.log('attaching to container ' + container.id);
    return container.attach({
      stream: true,
      stdin: true,
      stdout: true
    }, function (err, ttyStream) {
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
  });} catch (e) { console.log(e); }
});

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
  ttyStream = containers[req.params.pid].tty;
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
    //ttyStream.write('ls \n');
  });
  ws.on('close', function () {
    ttyStream.end();
	  ttyStream=null;
    container.remove({ force: true }, function() {
      return console.log('container ' + container.id + ' removed');
    });

    // Clean things up
    delete containers[container.id];
    delete logs[container.id];
    //term.writeln("Your Boxlab environment has expired due to inactivity. Please refresh to get a new environment. Happy Labbing!");
  });
});

app.use(function(err, req, res, next) {
    // Maybe log the error for later reference?
    // If this is development, maybe show the stack here in this response?
    res.status(err.status || 500);
    res.send({
        'message': err.message
    });
});

process.on('unhandledRejection', (error, promise) => {
  console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
  console.log(' The error was: ', error );
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
