import Product from '../../models/productSchema.js'

export const getSearchResults = async (req, res) =>{
    try {
        const searchTerm = req.query.searchQuery;
        const searchResults = await Product.find({ $text: { $search: searchTerm } });
        res.json(searchResults);
      } catch (error) { 
        console.error('Error searching:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}