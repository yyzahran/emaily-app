if (process.env.NODE_ENV === 'production') {
    // Return the prod keys
    module.exports = require('./prod');
} else {
    // Retrun the dev keys
    module.exports = require('./dev');
}

// dev mongo password: jExnystjf5Fbixu2
// prod mongo password: 0Wa1wlus32rIAGcC
// mongodb+srv://youssefzahran:0Wa1wlus32rIAGcC@cluster0.mqwqz1l.mongodb.net/emailyprod?retryWrites=true&w=majority&appName=Cluster0
