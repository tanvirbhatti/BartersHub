import mongoose from 'mongoose';

const mongoURI = process.env.CONNECTION_STRING || 'mongodb+srv://admin:admin@cluster0.g4lqotk.mongodb.net/BartersHub';

mongoose.connect(mongoURI)

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to Mongoose');
})

db.on('error',(error)=>{
    console.error('MongoDB connection error:',error);
})

db.on('disconnected',()=>{
    console.log('Disconnected from MongoDB');
})

export default db;