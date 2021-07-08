var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/appuser', { useNewUrlParser: true })
mongoose.connection.on(
    'connected',
    function() {
        console.log('connected');
    });

mongoose.connection.on(
    'error',
    function() {
        console.log('error');
    });

// process.on('SIGINT', function() {
//     mongoose.connection.close(function() {
//         console.log('discon');
//         process.exit(0);
//     });
// });