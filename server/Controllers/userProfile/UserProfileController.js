import { connectToDb } from '../../db.js';
import { ObjectId } from 'mongodb';

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



export async function getUserListings(req, res) {
    try {
        const db = await connectToDb();
        
        const userId = req.user.userId;

        if (!userId) {
            return res.status(403).json({ error: 'No user ID found. Authentication may have failed.' });
        }

        const listings = await db.collection('products').find({ userId }).toArray();

        if (!listings.length) {
            return res.status(404).json({ error: 'No listings found for this user' });
        }

        res.status(200).json({ message: 'User listings fetched successfully', listings });
    } catch (error) {
        console.error('Error fetching user listings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteListing(req, res) {
  try {
      const db = await connectToDb();
      const listingId = req.params.id;  
      const listingObjectId = new ObjectId(listingId);
      const userId = req.user.userId;

      if (!listingId) {
          return res.status(400).json({ error: 'Listing ID is required.' });
      }

      const listing = await db.collection('products').findOne({ _id: listingObjectId });
      if (!listing) {
          return res.status(404).json({ error: 'Listing not found.' });
      }

      if (listing.userId !== userId) {
          return res.status(403).json({ error: 'You are not authorized to delete this listing.' });
      }

      await db.collection('products').deleteOne({ _id: listingObjectId });
      res.status(200).json({ message: 'Listing deleted successfully.' });
  } catch (error) {
      console.error('Error deleting the listing:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateListing(req, res) {
  try {
      const db = await connectToDb();
      const listingId = req.params.id;
      const userId = req.user.userId;
      const listingUpdates = req.body;
      console.log(listingId)
      console.log('Update Data:', req.body);

      const listingObjectId = new ObjectId(listingId);

      const existingListing = await db.collection('products').findOne({ _id: listingObjectId });
      if (!existingListing) {
          return res.status(404).json({ error: 'Listing not found.' });
      }

      if (existingListing.userId.toString() !== userId) {
          return res.status(403).json({ error: 'You are not authorized to update this listing.' });
      }

      await db.collection('products').updateOne(
          { _id: listingObjectId },
          { $set: { ...listingUpdates, _id: listingObjectId, userId: existingListing.userId } }
      );

      res.status(200).json({ message: 'Listing updated successfully.' });
  } catch (error) {
      console.error('Error updating the listing:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

