const mongoose = require('mongoose')
module.exports = {
        database: 'mongodb://localhost/UBUfz',
        secretOrKey: 'ubufriendszone',
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
    // GOOGLE_CLIENT_SECRET = YFoOSmm0kMQpLn-Rm2FFJ7WC

// const connectDB = async() => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//         })

//         console.log(`MongoDB Connected: ${conn.connection.host}`)
//     } catch (err) {
//         console.error(err)
//         process.exit(1)
//     }
// }

// module.exports = connectDB