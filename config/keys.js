if (process.env.NODE_ENV === 'production') {
    // Return the prod keys
    module.exports = require('./prod');
} else {
    // Return the dev keys
    module.exports = require('./dev');
}
