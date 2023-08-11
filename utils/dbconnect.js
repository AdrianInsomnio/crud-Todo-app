const mongoose = require('mongoose');

export default async function dbConnect(){
    await mongoose.connect(process.env.DB_MONGOURL_LOCAL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}
