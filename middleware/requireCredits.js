module.exports = (req, res, next) => {
    if (!req.user.credits) {
        return res.status(402).send({ error: "You don't have enough credits" });
    }

    next();
};
