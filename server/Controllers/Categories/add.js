import Category from '../../models/categoriesSchema.js'

const addCategory = async (req, res) => {
    const userId = req.user.userId;
    if (!userId) {
        return res.status(401).json({ error: 'Token is not trusted. Please try logging in again.' });
    } else {
        const categoryName = req.body.categoryName;
        if (!categoryName) {
            return res.status(401).json({ error: 'Category Name cannot be Empty!' });
        }
        try {
            const addedCategory = await Category.create({ category: categoryName });
            return res.status(200).json({
                message: "Category added successfully",
                category: addedCategory,
            })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ "Error occurred in database": error });
        }
    }
}

export default addCategory;
