var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var os = require('os');
var pty = require('node-pty');
var Docker = require('dockerode');
var dockerHostIP = process.env.DOCKERHOST || "135.17.180.132"
//var dockerHostIP = "127.0.0.1"
var dockerHostPort = process.env.DOCKERPORT || 2375 
var image='centos';
//var i;
//var docker = new Docker({socketPath: '/var/run/docker.sock'});
  var ttyStream = {};
  var j = {};
  var k;
  var term;
var docker = new Docker({ host: dockerHostIP, port: dockerHostPort });

var terminals = {},
    logs = {},
    containers = {};


var pastemsg = {};
////////////////////////////////////////////////////////////////////////////////


var session = require("express-session");
var okta = require("@okta/okta-sdk-nodejs");
var ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;
//const { ExpressOIDC } = require('@okta/oidc-middleware');

var oktaClient = new okta.Client({
  orgUrl: 'https://dev-5367366.okta.com',
  token: '00nso-ov4zK5KD0ayOQeBwpX8m9rTEBUxZw12yf2D1'
});
const oidc = new ExpressOIDC({
  issuer: "https://dev-5367366.okta.com/oauth2/default",
  client_id: '0oah2rjy6c86lHCj65d5',
  client_secret: 'HCACe75CL-6AQ7DWE4wEEU2nDdLIfWp2wS2ErTl2',
  //redirect_uri: 'http://135.17.180.132:3000/users/callback',
  appBaseUrl: 'http://'+dockerHostIP+':'+ 3000,
  scope: "openid profile",
  routes: {
    login: {
      path: "/users/login"
    },
    callback: {
      path: "/users/callback",
      defaultRedirect: "/index.html"
    }
  }
});
//console.log('base url :'+oidc.appBaseUrl);
app.use(session({
  secret: 'lkjasdl3202309Jlkjhlksd0809823eklmlkmasxlkjlkqj',
  resave: true,
  saveUninitialized: false
}));

app.use(oidc.router);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use((req, res, next) => {
	//console.log ("Inside app.use after oidc router");
//                    res.cookie('cokkieName',i, { maxAge: 900000, httpOnly: true });
  //                            console.log('cookie have created successfully');
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
    //return res.status(401).render("unauthenticated");
	    res.redirect("/users/login");
  }

  next();
}

 function clearCookie (req, res) {
        console.log ("Cookie in Close" + req.cookies['cokkieNamecid']);
        res.clearCookie("cokkieNamecid");
        console.log ("Cookie in Close after clear" + req.cookies['cokkieNamecid']);
  res.sendFile(__dirname + '/linuxbasics.html');
 }
//////////////////////////////////////////////////////////////////////
//COOKIE PARSER

var cookieParser = require('cookie-parser');

app.use(cookieParser());


/////////////Rate Limiter /////////////////
const rateLimit = require('express-rate-limit');

const rateLimitMiddleware = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 2,
  message: 'You have exceeded your 1 requests per hour limit.',
  headers: true,
});

module.exports = rateLimitMiddleware;

//app.use(rateLimitMiddleware);


/////////////////////////////////////////////////////////////////////
app.use('/build', express.static(__dirname + '/../build'));

app.get('/logout1', oidc.forceLogoutAndRevoke(), (req, res) => {
 // Nothing here will execute, after the redirects the user will end up wherever the `routes.logoutCallback.path` specifies (default `/`)
});

app.get('/protected', oidc.ensureAuthenticated(), rateLimit(), (req, res) => {
   res.send ('Top Secret 123');
  // res.send ('user'); 
  //res.send (req.user.profile.firstName);

});

/*app.get('/test', (req, res) => {
  res.json({ profile: req.user ? req.user.profile : null });
});
*/

app.get('/test1', (req, res) => {
  if (req.userContext.userinfo) {
    res.send(`Hi ${req.userContext.userinfo.name}!`);
  } else {
    res.send('Please Sign In');
  }
});

app.get('/logout', (req, res) => {
  
  req.logout();
  //req.user=null;
  console.log("User loggedout" + req.userId);
	//res.redirect("/users/login");

});

app.get('/linuxbasics.html', function(req, res){
  res.sendFile(__dirname + '/linuxbasics.html');

});

app.get('/close', function(req, res){
clearCookie(req, res);
	res.sendFile(__dirname + '/linuxbasics.html');

});

app.get('/linuxcommands.html', function(req, res){
  res.sendFile(__dirname + '/linuxcommands.html');

});


app.get('/linuxpaste.html', function(req, res){
  res.sendFile(__dirname + '/linuxpaste.html');

});

app.get('/main.html', oidc.ensureAuthenticated(), function(req, res){
  res.sendFile(__dirname + '/main.html');

});

//app.get('/home.html', loginRequired, function(req, res){
app.get('/home.html', oidc.ensureAuthenticated(), (req, res) => {
//app.get('/home.html',  (req, res) => {
//app.get('/home.html', (req, res) => {
//	if (req.user == null) {
//		console.log ("Need to login");
    //return res.status(401).render("unauthenticated");
//		res.redirect ("/users/login");
  //  return res.status(401).render("unauthenticated");
  //} else {
try {
  res.sendFile(__dirname + '/home.html');

	image = req.query.image;
        console.log('IMAGE inside home ' + image);}
	catch (e)
	{
		//res.redirect("/users/login");
		res.send(e);
		  //res.sendFile(__dirname + '/main.html');
	}
 // }
});


app.get('/terminal.html', /* oidc.ensureAuthenticated() ,*/ (req, res) => {

	try {
  res.sendFile(__dirname + '/terminal.html');

    //    image = req.query.image;
        console.log('IMAGE inside terminal ' + image);
        console.log('user inside terminal ' + req.user);}
        catch (e)
        {
                //res.redirect("/users/login");
                res.send(e);
                  //res.sendFile(__dirname + '/main.html');
        }
 // }
});



app.get('/paste', function(req, res){
  //res.sendFile(__dirname + '/home.html');
        k = req.cookies['cokkieNamecid'];
        pastemsg[k] = req.query.msg;
	//req.query.image = k;
//	console.log ('req.image' + req.query.image);
	console.log ('#######COOKIE#######' + req.cookies['cokkieNamecid']);
        

//        pastemsg[k] = "test123";
	        //if (ttyStream != null)
	try {
        console.log('Message to paste' + pastemsg[k]+ req.query.msg+' j is '+ j[k] +'k is'+k);

	        if (ttyStream != null)
     ttyStream[k].write(req.query.msg + '\n'); 
	          res.sendFile(__dirname + '/linuxcommands.html');
	} catch (e) { console.log(e); }
		     // ws.send(msg.toString('utf8')); } catch (e) { console.log(e); }
//	term.focus();
//	  res.sendFile(__dirname + '/linuxcommands.html');
}

);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');

 image = req.query.image;
	console.log('IMAGE IS ' + image);
});

app.get('/index.html', function(req, res){
  res.sendFile(__dirname + '/Arsha/index.html');

// image = req.query.image;
        console.log('IMAGE insied index ' + image);
});

app.get('/header.html', function(req, res){
  res.sendFile(__dirname + '/Arsha/header.html');

// image = req.query.image;
        console.log('IMAGE insied index ' + image);
});

app.get("/assets/*",function(req,res){
  res.sendfile('/root/boxokta/handson/xtermjs-dockerode-expressjs-socket/demo/Arsha/' + req.path);
	        //console.log('Path wildcard ' + path);
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
if (req.cookies['cokkieNamecid'] == null)
	{
   try { docker.createContainer({
    Cmd: '/bin/sh',
    Image: image,
    // Image: 'node',
    'AttachStdin': true,
    'Privileged': true,
    'AttachStdout': true,
    'AttachStderr': true,
    //'Tty': true,
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
	      try {
                 res.cookie('cokkieNamecid',container.id, { maxAge: 900000, httpOnly: true });
                              console.log('cookie ********************created successfully');}
catch (ex) {
console.log (ex);
}
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
	  try {
                 res.cookie('cokkieNamecid',container.id, { maxAge: 900000, httpOnly: true });
                              console.log('cookie ********************created successfully');}
catch (ex) {
console.log (ex);
}

  });} catch (e) { console.log(e); }
}
else {
	res.send('\n\nMultiple Sessions opened. \n Please close any open terminal sessions and try in a new window.\n\n');
}

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
  var i = req.params.pid;
//	        req.query.image = i;i
//	           res.cookie('cokkieName',i, { maxAge: 900000, httpOnly: true });

/*app.use(session({
image : 'yourSecret',
resave : false,
saveUninitialized : false,
}));
*/
  var container = containers[req.params.pid].container;
  k = container.id;
  j[k] = req.params.pid;
 console.log ('i is ' + i);
 console.log ('j[k] is ' + j[k]);
//  var container = containers[req.params.pid].container;
  ttyStream[req.params.pid] = containers[req.params.pid].tty;
  console.log('Connected to container ' + container.id);
  ws.send(logs[container.id]);

  ttyStream[i].on('data', function(data) {
    console.log('Inside tty.on [data]', data);
    try {
      ws.send(data.toString('utf8'));
    } catch (ex) {
      // The WebSocket is not open, ignore
    }
  });
  ws.on('message', function(msg) {
    console.log('inside ws.on [message] tty.write', msg +'i is: '+ i);
        if (i != null)
	  if (ttyStream[i] != null) {
    ttyStream[i].write(msg);
    //ttyStream[i].write(pastemsg + '\r\n');
//		  pastemsg='';
//      ttyStream[i].write(pastemsg[i] + '\r\n');
//	console.log('at tty paste i is :' + i + 'K is' + k);
  //      pastemsg [i]='';
	  }
    //ttyStream.write('ls \n');
  });
  //  ttyStream[i].write('ls \n');
  //  ttyStream[i].write(pastemsg[k] + '\r\n');
//	console.log('at tty paste i is :' + i + 'K is' + k);
  ws.on('close', function (req, res) {
  if (i != null)
  if (ttyStream[i] != null)
    ttyStream[i].end();
	  ttyStream[i]=null;
    container.remove({ force: true }, function() {
      return console.log('container ' + container.id + ' removed');
    });

    // Clean things up
    delete containers[container.id];
    delete logs[container.id];
    //term.writeln("Your Boxlab environment has expired due to inactivity. Please refresh to get a new environment. Happy Labbing!");
  try {
  //               res.cookie('cokkieNamecid',null, { maxAge: 90, httpOnly: true });
	  //res.clearCookie("cokkieNamecid");
	  //clearCookie(req, res);
	 res.redirect ("/close");
                              console.log('cookie ********************Deleted successfully');}
catch (ex) {
console.log (ex);
}

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

console.log('base url :'+oidc.appBaseUrl);
app.listen(port, host);
