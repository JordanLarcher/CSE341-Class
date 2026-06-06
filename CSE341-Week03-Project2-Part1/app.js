const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const errorHandler = require('./middleware/errorHandler');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const app = express();

app.use(cors());

// Trust proxy for Render (needed for secure cookies)
app.set('trust proxy', 1);

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));


// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/vulnerabilities', require('./routes/vulnerabilities'));
app.use('/api/programs', require('./routes/programs'));
app.use('/auth', require('./routes/auth'));

app.get('/login', (req, res) => {
    res.redirect('/auth/github');
});

app.get('/', (req, res) => {
    res.json(req.isAuthenticated() ? { message: `Logged in as ${req.user.displayName || req.user.username}` } : { message: "Logged out" });
});


// For 404 Not Found errors -----
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);

module.exports = app;
