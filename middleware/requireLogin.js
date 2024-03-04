module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must login' });
    }

    // next passes the request to the next middleware in the chain (if there's a user)
    next();
};
