const express = require('express');
const passport = require('passport');
const router = express.Router();


// GET /auth/github — starts the GitHub authentication
/**
 * @swagger
 * /auth/github:
 *   get:
 *     tags: [Auth]
 *     summary: Initiate GitHub OAuth login
 *     responses:
 *       302:
 *         description: Redirect to GitHub
 */
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GET /auth/login — alias for /auth/github
/**
 * @swagger
 * /auth/login:
 *   get:
 *     tags: [Auth]
 *     summary: Alias for GitHub OAuth login
 *     responses:
 *       302:
 *         description: Redirect to GitHub
 */
router.get('/login', (req, res) => {
    res.redirect('/auth/github');
});

// GET /auth/github/callback — GitHub redirects back here
/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     tags: [Auth]
 *     summary: GitHub OAuth callback
 *     responses:
 *       302:
 *         description: Redirect to home page
 */
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

// GET /auth/status — check if user is logged in
/**
 * @swagger
 * /auth/status:
 *   get:
 *     tags: [Auth]
 *     summary: Get current authentication status
 *     responses:
 *       200:
 *         description: Authentication status and user data
 */
router.get('/status', (req, res) => {
    res.json(req.isAuthenticated() ? { user: req.user } : { user: null });
});

// GET /auth/logout — log out
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags: [Auth]
 *     summary: Log out the current user
 *     responses:
 *       302:
 *         description: Redirect to home page
 */
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

module.exports = router;
