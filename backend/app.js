const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
// const port = 3000;
const config = require("./config/database");
const cors = require("cors");
const path = require('path')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/database')
const multer = require('multer');
// Load config
dotenv.config({ path: './config/config.env' })


app.use(cors());
app.use("/images", express.static(path.join("images")));
// app.use(morgan('dev'));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});
// Passport config
require('./config/passport')(passport)
    // connectDB()
    // const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(
    methodOverride(function(req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            let method = req.body._method
            delete req.body._method
            return method
        }
    })
)

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)


// mddleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Set global var
app.use(function(req, res, next) {
        res.locals.user = req.user || null
        next()
    })
    // Static folder
app.use(express.static(path.join(__dirname, 'public')))




// connect db
mongoose.connect(
    config.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("connected db");
});
mongoose.connection.on("error", (err) => {
    console.log("can't connnect db");
});


// route
const routePost = require("./routes/posts");
const routeUser = require("./routes/users");
const routeJoin = require("./routes/joins");
const routeComment = require("./routes/comments");
const routeNotification = require("./routes/notifications");
const routeHistory = require("./routes/histories");


app.get("/", (req, res, next) => {
    res.send("What")
});

app.use('/auth', require('./routes/users'))
app.use("/post", routePost);
app.use("/user", routeUser);
app.use("/join", routeJoin);
app.use("/comment", routeComment);
app.use("/notification", routeNotification);
app.use("/history", routeHistory);


// app.listen(port, () => {
//     console.log('Server runing in: ' + port);
// });

const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)