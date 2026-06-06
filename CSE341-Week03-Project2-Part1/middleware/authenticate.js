const isAuthenticated = (req, res, next) => {
    console.log('Checking authentication status:', req.isAuthenticated());
    if (req.user) {
        console.log('User session found for:', req.user.username || req.user.displayName || 'Unknown User');
    } else {
        console.log('No user session found.');
    }
    
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not Authenticated' });
    }
    next();
};

module.exports = { isAuthenticated };