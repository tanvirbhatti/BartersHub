import User from '../../models/useSchema.js';
import Product from '../../models/productSchema.js'
import { ObjectId } from 'mongodb';
import FeaturedProduct from '../../models/featuredProductSchema.js';

export async function userProfile(req, res) {
    try {
      const id = req.params.id; 
      const user = await User.findOne({ email: id });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User profile fetched successfully', user });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

export async function getUserListings(req, res) {
    try {
        
        const userId = req.user.userId;

        if (!userId) {
            return res.status(403).json({ error: 'No user ID found. Authentication may have failed.' });
        }

        const listings = await Product.find({  'user': new ObjectId(userId) }).exec();
        
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
      const listingId = req.params.id;  
      const listingObjectId = new ObjectId(listingId);
      const userId = req.user.userId;

      if (!listingId) {
          return res.status(400).json({ error: 'Listing ID is required.' });
      }

      const listing = await Product.findOne({ _id: listingObjectId });
      if (!listing) {
          return res.status(404).json({ error: 'Listing not found.' });
      }
      if (listing.user.toString()===new ObjectId(userId).toString()) {
        await Product.deleteOne({ _id: listingObjectId });
        await FeaturedProduct.deleteOne({productId:listingObjectId})
        return res.status(200).json({ message: 'Listing deleted successfully.' });
      }
      else{
        return res.status(403).json({ error: 'You are not authorized to delete this listing.' });
      }
  } catch (error) {
      console.error('Error deleting the listing:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateListing(req, res) {
  try {
      const listingId = req.body._id;
      const userId = req.user.userId;
      const listingUpdates = req.body;
      console.log(listingId, "listing ID")
      console.log('Update Data:', listingUpdates);

      const listingObjectId = new ObjectId(listingId);
      // console.log(listingObjectId)

      const existingListing = await Product.findOne({ _id: listingObjectId });
      if (!existingListing) {
          return res.status(404).json({ error: 'Listing not found.' });
      }
      if (existingListing.user._id.toString() !== new ObjectId(userId)) {
          return res.status(403).json({ error: 'You are not authorized to update this listing.' });
      }

      await Product.updateOne(
          { _id: listingObjectId },
          { $set: { ...listingUpdates, _id: listingObjectId, userId: existingListing.user } }
      );

      res.status(200).json({ message: 'Listing updated successfully.' });
  } catch (error) {
      console.error('Error updating the listing:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}


// Disable a user by updating their status
export async function disableUser(req, res) {
  try {
    const userId = req.user.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Token is not trusted. Please try logging in again.' });
      } else {
        const userToUpdateId = req.params.userId;
        if (!userToUpdateId) {
          return res.status(400).json({ error: 'User ID is required' });
        } else {
          const result = await User.updateOne(
            { _id: new ObjectId(userToUpdateId) },
            { $set: { disabled: true } }
          );
          if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'User disabled successfully' });
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        }
    }
  } catch (error) {
    console.error('Error disabling user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Enable a user by updating their status
export async function enableUser(req, res) {
  try {
    const userId = req.user.userId;
    // Verify and decode the token
      if (!userId) {
        return res.status(401).json({ error: 'Token is not trusted. Please try logging in again.' });
      } else {
        const userToUpdateId = req.params.userId;
        if (!userToUpdateId) {
          return res.status(400).json({ error: 'User ID is required' });
        } else {
          const result = await User.updateOne(
            { _id: new ObjectId(userToUpdateId) },
            { $set: { disabled: false } }
          );
          if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'User enabled successfully' });
          } else {
            res.status(404).json({ error: 'User not found',
          result });
          }
        }
      }
    
  } catch (error) {
    console.error('Error disabling user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Permanently delete a user
export async function deleteUser(req, res) {
  try {
    const userId = req.user.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Token is not trusted. Please try logging in again.' });
      } else {
        const userToDeleteId = req.params.userId;
        if (!userToDeleteId) {
          return res.status(400).json({ error: 'User ID is required' });
        } else {
          const result = await User.deleteOne({ _id: new ObjectId(userToDeleteId) });
          if (result.deletedCount === 1) {
            res.status(200).json({ message: 'User deleted successfully' });
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        }
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function fetchAllUsers(req, res) {
  try {
      const users = await User.find().exec();
      res.status(200).json({ message: 'All users fetched successfully', users });
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}