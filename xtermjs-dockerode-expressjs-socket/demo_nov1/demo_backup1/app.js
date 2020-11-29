var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');

/////////////////////

var session = require("express-session");
var okta = require("@okta/okta-sdk-nodejs");
var ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;


//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

const dashboardRouter = require("./routes/dashboard");
const publicRouter = require("./routes/public");
const usersRouter = require("./routes/users");
const linuxcmdRouter = require("./routes/linuxcmd");
const terminalRouter = require("./routes/terminal");
//
var router = express.Router();
//
///////////////////////

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


////////////////////////////////////////////

var oktaClient = new okta.Client({
  orgUrl: 'https://dev-5367366.okta.com',
  token: '00nso-ov4zK5KD0ayOQeBwpX8m9rTEBUxZw12yf2D1'
});
const oidc = new ExpressOIDC({
  issuer: "https://dev-5367366.okta.com/oauth2/default",
  client_id: '0oah2rjy6c86lHCj65d5',
  client_secret: 'HCACe75CL-6AQ7DWE4wEEU2nDdLIfWp2wS2ErTl2',
  redirect_uri: 'http://135.17.180.132:3097/users/callback',
  scope: "openid profile",
  routes: {
    login: {
      path: "/users/login"
    },
    callback: {
      path: "/users/callback",
      defaultRedirect: "/dashboard"
    }
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/////

app.param('image', function (request, response, next, image) {
  // ... Perform database query and
  // ... Store the user object from the database in the req object
  req.image = image;
          console.log('IMAGE inside param ' + image);
  return next();
});

/////


app.use(logger('dev'));
app.use(express.json());
//app.use(json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'lkjasdl3202309Jlkjhlksd0809823eklmlkmasxlkjlkqj',
  resave: true,
  saveUninitialized: false
}));

app.use(oidc.router);

app.use((req, res, next) => {
  if (!req.userinfo) {
    return next();
  }

  oktaClient.getUser(req.userinfo.sub)
    .then(user => {
      req.user = user;
      res.locals.user = user;
      next();
    }).catch(err => {
      next(err);
    });
});

function loginRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).render("unauthenticated");
  }

  next();
}

//app.use('/', publicRouter);
//
app.use('/', router);
//
app.use('/dashboard', loginRequired, dashboardRouter);
app.use('/users', usersRouter);
app.use('/linuxcmd', linuxcmdRouter);
app.use('/terminal', loginRequired, terminalRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

///////////////////////////////////////////////


app.use('/build', express.static(__dirname + '/../build'));

router.get('/linuxbasics.html', function(req, res){
  res.sendFile(__dirname + '/linuxbasics.html');

});

router.get('/linuxcommands.html', function(req, res){
  res.sendFile(__dirname + '/linuxcommands.html');

});

router.get('/home.html', function(req, res){
  res.sendFile(__dirname + '/home.html');

	//image = req.image;
	image = req.query.image;
        console.log('IMAGE inside home ' + image);

});


router.get('/paste', function(req, res){
  //res.sendFile(__dirname + '/home.html');

        msg = req.query.msg;
	        if (ttyStream != null)
	try {
        console.log('Message to paste' + msg);

	        if (ttyStream != null)
     ttyStream.write(msg + '\n');} catch (e) { console.log(e); }
//	term.focus();
});

router.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');

 image = req.query.image;
	console.log('IMAGE IS ' + image);
});

router.get('/index.html', function(req, res){
  res.sendFile(__dirname + '/index.html');

 image = req.query.image;
        console.log('IMAGE insied index ' + image);
});


router.get('/linuxcommands.html', function(req, res){
  res.sendFile(__dirname + '/linuxcommands.html');

// image = req.query.image;
        console.log('IMAGE insied index ' + image);
});


//guru

//router.get('/',function(req,res){
//  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
// });


router.get('/style.css', function(req, res){
  res.sendFile(__dirname + '/style.css');
});

router.get('/dist/bundle.js', function(req, res){
  res.sendFile(__dirname + '/dist/bundle.js');
});

router.get('/dist/bundle.js.map', function(req, res){
  res.sendFile(__dirname + '/dist/bundle.js.map');
});

router.post('/terminals', function (req, res) {
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

router.post('/terminals/:pid/size', function (req, res) {
  var pid = parseInt(req.params.pid),
      cols = parseInt(req.query.cols),
      rows = parseInt(req.query.rows),
      term = terminals[pid];

  term.resize(cols, rows);
  console.log('Resized terminal ' + pid + ' to ' + cols + ' cols and ' + rows + ' rows.');
  res.end();
});

app.use(function (req, res, next) {
    req.ws = ws;
    return next();
});


  router.ws('/terminals/:pid', function (ws, req) {
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


var port = process.env.PORT || 3097,
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
