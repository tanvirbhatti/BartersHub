import { connectToDb } from '../../db.js';

export async function userProfile(req, res) {
    try {
      const db = await connectToDb();
      const id = req.params.id; 
      const user = await db.collection('users').findOne({ email: id });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User profile fetched successfully', user });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  export async function getAllUsers(req, res) {
    try {
      const db = await connectToDb();
      const users = await db.collection('users').find().toArray();
      res.status(200).json({ message: 'All users fetched successfully', users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }