import User from '../../models/useSchema.js';
import Product from '../../models/productSchema.js'
import { ObjectId } from 'mongodb';
import FeaturedProduct from '../../models/featuredProductSchema.js';
import Testimonial from '../../models/testimonialSchema.js';

export async function userProfile(req, res) {
  try {
    const id = req.params.id;
console.log(id,"user id")
    const user = await User.findOne({ _id:new ObjectId(id) });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User profile fetched successfully", user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateListing(req, res) {
  try {
    const listingId = req.body._id;
    const userId = req.user.userId;
    const listingUpdates = req.body;
    console.log(listingId, "listing ID");
    console.log("Update Data:", listingUpdates);

    const listingObjectId = new ObjectId(listingId);
    // console.log(listingObjectId)

    const existingListing = await Product.findOne({ _id: listingObjectId });
    if (!existingListing) {
      return res.status(404).json({ error: "Listing not found." });
    }
    if (existingListing.user._id.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this listing." });
    }

    await Product.updateOne(
      { _id: listingObjectId },
      {
        $set: {
          ...listingUpdates,
          _id: listingObjectId,
          userId: existingListing.user,
        },
      }
    );

    res.status(200).json({ message: "Listing updated successfully." });
  } catch (error) {
    console.error("Error updating the listing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Update user profile
export async function updateUserProfile(req, res) {
  const { firstName, lastName, email } = req.body;
  const userId = req.user.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;

    // Log the update data and user ID
    console.log("Updating user with ID:", userId);
    console.log("Data to update:", updateData);

    const result = await User.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );

    // Log the result of the update
    console.log("Update result:", result);

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "User not found or no new data to update" });
    }

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid User ID format" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getUserListings(req, res) {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res
        .status(403)
        .json({ error: "No user ID found. Authentication may have failed." });
    }

    const listings = await Product.find({ user: new ObjectId(userId) }).exec();

    if (!listings.length) {
      return res.status(404).json({ error: "No listings found for this user" });
    }

    res
      .status(200)
      .json({ message: "User listings fetched successfully", listings });
  } catch (error) {
    console.error("Error fetching user listings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteListing(req, res) {
  try {
    const listingId = req.params.id;
    const listingObjectId = new ObjectId(listingId);
    const userId = req.user.userId;

    if (!listingId) {
      return res.status(400).json({ error: "Listing ID is required." });
    }

    const listing = await Product.findOne({ _id: listingObjectId });
    if (!listing) {
      return res.status(404).json({ error: "Listing not found." });
    }
    if (listing.user.toString() === new ObjectId(userId).toString()) {
      await Product.deleteOne({ _id: listingObjectId });
      await FeaturedProduct.deleteOne({ productId: listingObjectId });
      return res.status(200).json({ message: "Listing deleted successfully." });
    } else {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this listing." });
    }
  } catch (error) {
    console.error("Error deleting the listing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Disable a user by updating their status
export async function disableUser(req, res) {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ error: "Token is not trusted. Please try logging in again." });
    } else {
      const userToUpdateId = req.params.userId;
      if (!userToUpdateId) {
        return res.status(400).json({ error: "User ID is required" });
      } else {
        const result = await User.updateOne(
          { _id: new ObjectId(userToUpdateId) },
          { $set: { disabled: true } }
        );
        if (result.modifiedCount === 1) {
          res.status(200).json({ message: "User disabled successfully" });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      }
    }
  } catch (error) {
    console.error("Error disabling user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Enable a user by updating their status
export async function enableUser(req, res) {
  try {
    const userId = req.user.userId;
    // Verify and decode the token
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Token is not trusted. Please try logging in again." });
    } else {
      const userToUpdateId = req.params.userId;
      if (!userToUpdateId) {
        return res.status(400).json({ error: "User ID is required" });
      } else {
        const result = await User.updateOne(
          { _id: new ObjectId(userToUpdateId) },
          { $set: { disabled: false } }
        );
        if (result.modifiedCount === 1) {
          res.status(200).json({ message: "User enabled successfully" });
        } else {
          res.status(404).json({ error: "User not found", result });
        }
      }
    }
  } catch (error) {
    console.error("Error disabling user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Permanently delete a user
export async function deleteUser(req, res) {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ error: "Token is not trusted. Please try logging in again." });
    } else {
      const userToDeleteId = req.params.userId;
      if (!userToDeleteId) {
        return res.status(400).json({ error: "User ID is required" });
      } else {
        const result = await User.deleteOne({
          _id: new ObjectId(userToDeleteId),
        });
        if (result.deletedCount === 1) {
          res.status(200).json({ message: "User deleted successfully" });
        } else {
          
          const foundUser = await User.findById({_id:new ObjectId(userToDeleteId)})
          if(foundUser){
            const result = await User.deleteOne({ _id: new ObjectId(userToDeleteId) });
            const foundProducts = await Product.find({user:new ObjectId(userToDeleteId)}).exec();
            const foundTestimonials = await Testimonial.find({user: new ObjectId(userToDeleteId)}).exec();
            if(foundTestimonials.length>0){
              const foundTestimonials = await Testimonial.deleteMany({user:new ObjectId(userToDeleteId)})
            }
            else{
              return res.json({error:`can not find any testimonials with the listed ${userToDeleteId}`})
            }
            if(foundProducts.length>0){
              const deletedProduct = await Product.deleteMany({user:new ObjectId(userToDeleteId)})
            }
            else{
              return res.json({error:`can not find any products with the listed ${userToDeleteId}`})
            }
            if (result.deletedCount === 1) {
              res.status(200).json({ message: 'User deleted successfully' });
            } else {
              res.status(404).json({ error: 'issue in deleting user' });
            }
          }
          else{
            res.status(400).json
          }
        }
      }
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function fetchAllUsers(req, res) {
  try {
    const users = await User.find().exec();
    res.status(200).json({ message: "All users fetched successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
