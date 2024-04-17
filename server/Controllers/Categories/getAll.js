import Category from '../../models/categoriesSchema.js'

const getAllCategories = async (req, res) => {
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

export default getAllCategories;
