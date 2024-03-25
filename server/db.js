import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://admin:admin@cluster0.g4lqotk.mongodb.net/BartersHub';

let db;

export const connectToDb = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url)
      .then(client => {
        db = client.db();
        console.log('Connected to MongoDB');
        resolve(db);
      })
      .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        reject(err);
      });
  });
};

export const getDb = () => {
  return db;
};

