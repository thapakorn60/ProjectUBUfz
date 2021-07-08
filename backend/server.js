const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./db')
const LoginModel = require('./userlog')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-orgin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,x-access-token');
    res.setHeader('Access-Control-Allow-Credential', true);
    next();
})
app.post('/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        LoginModel.create(req.body, (err, doc) => {
            if (err) res.json({ result: "failed" });
            res.json({

                result: "success",
                username: username,
                password: password
            });
        })
    })
    //=========================================================================
    // const express = require('express')
    // const bodyParser = require('body-parser')
    // const Pusher = require('pusher');

// // create a express application
// const app = express();

// // initialize pusher
// let pusher = new Pusher({
//     appId: 'PUSHER_APP_ID',
//     key: 'PUSHER_APP_KEY',
//     secret: 'PUSHER_APP_SECRET',
//     cluster: 'PUSHER_APP_CLUSTER',
//     encrypted: true
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// // to Allow CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
// });

// app.post('/create-post', (req, res) => {
//     // trigger a new post event via pusher
//     pusher.trigger('presence-channel', 'new-post', {
//         'username': req.body.username,
//         'content': req.body.content
//     })
//     res.json({ 'status': 200 });
// });

// let port = 3128;
// app.listen(port);
// console.log('listening');