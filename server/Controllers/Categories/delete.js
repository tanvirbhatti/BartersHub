import { ObjectId } from 'mongodb';
import Category from '../../models/categoriesSchema.js';

const deleteCategory = async (req, res) => {
    const userId = req.user.userId;
    if (!userId) {
        return res.status(401).json({ error: 'Token is not trusted. Please try logging in again.' });
    }

    const categoryId = req.body.categoryId;
    if (!categoryId) {
        return res.status(400).json({ error: 'Category Id cannot be Empty!' });
    }

    try {
        const foundCategory = await Category.findOne({ _id: new ObjectId(categoryId) });

        if (!foundCategory) {
            return res.status(404).json({ error: 'Category not found in database' });
        }

        const deletedCategory = await Category.deleteOne({  _id: new ObjectId(categoryId) });
        if (deletedCategory.deletedCount === 1) {
            return res.status(200).json({
                message: 'Category deleted successfully',
                category: foundCategory,
            });
        } else {
            return res.status(500).json({ error: 'Failed to delete category' });
        }
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default deleteCategory;
