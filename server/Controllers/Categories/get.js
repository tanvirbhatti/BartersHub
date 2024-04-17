import Category from '../../models/categoriesSchema.js'

const getCategories = async (req, res) => {
    const userId = req.user.userId;
    if (!userId) {
        return res.status(401).json({ error: 'Token is not trusted. Please try logging in again.' });
    } else {
        try {
            const categories = await Category.find().exec();
            return res.status(200).json({
               categories
            })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ "Error occurred in database": error });
        }
    }
}

export default getCategories;
