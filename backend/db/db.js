const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
   
        await mongoose.connect("mongodb+srv://vigneshgovindu02:b1PQxsUOmsm0KYQX@cluster0.x6cu2yl.mongodb.net/?retryWrites=true&w=majority")
        console.log('Db Connected')
    } catch (error) {
        console.log('DB Connection Error');
    }
}

module.exports = {db}
