var express = require('express');
var session = require('express-session');
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('lodash');
require('dotenv').config();

var data = JSON.parse(fs.readFileSync('./test.json'));

var users = JSON.parse(fs.readFileSync('./users.json')).users;

var app = express();
var sessionParser = session({
    secret: 'digitalwand',
    resave: true,
    saveUninitialized: true
})
app.use(sessionParser);

var groups = ['first group', 'second group', 'third group'];
var USERS_WS_COUNT = 15; //количество рандомных пользователей, которые будут приходить через WS

var makeRandomUser = function() {
    function makeString() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    function getRandomGroup() {
        return groups[Math.floor(Math.random()*groups.length)];
    }

    return {
        id: Math.floor(Math.random()*1000),
        name: makeString(),
        description: makeString(),
        group: getRandomGroup()
    }
}

var WebSocketServer = require('ws').Server;

var usersInterval = function(ws) {
    var i = 0;
    var interval = setInterval(function() {
        try {
            if (i === USERS_WS_COUNT) {
                clearInterval(interval);
            } else {
                ws.send(JSON.stringify({
                    type: 'newUser',
                    payload: makeRandomUser()
                }));
                i++;
            }
        } catch (e) {
            console.error(e);
        }
    }, 5000);
}

if (+process.env.API_VERSION > 2) {
    var wss = new WebSocketServer({
        port: 40510,
        verifyClient: (info, done) => {
            console.log('Parsing session from request...');
            sessionParser(info.req, {}, () => {
                if (info.req.session.userId) {
                    console.log('Session is parsed!');
                    done(info.req.session.userId);
                } else {
                    console.log('Session not found')
                    done(false);
                }
            });
        },
        app
    });

    wss.on('connection', function (ws, req) {
        ws.on('open', function() {
            console.log('opened: ', req.session.id)
        })
        ws.on('message', function (message) {
            console.log('received: %s', message);

            if (message === 'getLiveDataUsers') {
                usersInterval(ws);
            }
        })
    })
}

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(bodyParser.json());



var checkUser = function(login, password) {
    return _.find(users, function (o) {
        return o.password == password && o.login == login;
    });;
}

var getUserById = function(id) {
    return _.find(users, function(o) {
        return o.id == id;
    });
}

var getUserByLogin = function(login) {
    return _.find(users, function(o) {
        return o.login == login;
    });
}

var editUser = function(id, data) {
    users.colorsArray = _.forEach(users.colorsArray, function(value) {
        if (value.id == id ){
            value = data;
        }
    })
}

app.get('/users', function(req, res) {
    if (+process.env.API_VERSION > 1) {
      if (req.session.id) {
        res.send(data);
      } else {
        res.sendStatus(401)
      }
    } else {
      res.send(data);
    }
});

app.post('/login', function(req, res) {
    if (!req.body.login || !req.body.password) {
        res.sendStatus(401);
    } else {
        var user = checkUser(req.body.login, req.body.password);
        if (user) {
            req.session.login = user.login;
            req.session.role = user.role;
            req.session.userId = user.id;
            res.sendStatus(200);
        } else {
            res.sendStatus(404)
        }
    }
});

app.post('/logout', function(req, res) {
    req.session.destroy();
    res.sendStatus(200);
});

app.get('/currentUser', function(req, res) {
    if (+process.env.API_VERSION > 1) {
        if (req.session.id && req.session.userId) {
            res.send(getUserById(req.session.userId))
        } else {
            res.sendStatus(401);
        }
    } else {
       res.send(getUserByLogin(req.query.login));
    }
});

app.put('/editUser', function(req,res) {
    if (req.query.id) {
        editUser(id, req.body);
        console.log(users);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

app.listen(8888, function() {
    console.log('server runned on 8888 port');
});
