const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GET /auth/github/callback — GitHub redirects back here
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});
router.get('/login', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {})
// GET /auth/status — check if user is logged in
router.get('/status', (req, res) => {
    res.json(req.isAuthenticated() ? { user: req.user } : { user: null });
});

// GET /auth/logout — log out
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});