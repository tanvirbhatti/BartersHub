import Productcard from "../../UI/Cards/Productcard.jsx";
import "./Product_listing.css"

const products = [
    {
        id: 1,
        imageUrl: 'https://scontent.fyzd1-2.fna.fbcdn.net/v/t39.30808-6/426363056_318321994502750_6901872494291580893_n.jpg?stp=dst-jpg_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=6b907e&_nc_ohc=frhweBZ7HPsAX-dDq9M&_nc_ht=scontent.fyzd1-2.fna&oh=00_AfDTVQ2J7WRc-Jy9qMjHFBCsN9QZKMEf9gYak8kuNddmxw&oe=65C99ECC',
        price: '$1800.00',
        description: '2 BHK house for rent',
        location: 'waterloo'
    },
    {
        id: 2,
        imageUrl: 'https://scontent.fyzd1-2.fna.fbcdn.net/v/t39.30808-6/426363056_318321994502750_6901872494291580893_n.jpg?stp=dst-jpg_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=6b907e&_nc_ohc=frhweBZ7HPsAX-dDq9M&_nc_ht=scontent.fyzd1-2.fna&oh=00_AfDTVQ2J7WRc-Jy9qMjHFBCsN9QZKMEf9gYak8kuNddmxw&oe=65C99ECC',
        price: '$1800.00',
        description: '2 BHK house for rent',
        location: 'waterloo'
    },
    {
        id: 3,
        imageUrl: 'https://scontent.fyzd1-2.fna.fbcdn.net/v/t39.30808-6/426363056_318321994502750_6901872494291580893_n.jpg?stp=dst-jpg_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=6b907e&_nc_ohc=frhweBZ7HPsAX-dDq9M&_nc_ht=scontent.fyzd1-2.fna&oh=00_AfDTVQ2J7WRc-Jy9qMjHFBCsN9QZKMEf9gYak8kuNddmxw&oe=65C99ECC',
        price: '$1800.00',
        description: '2 BHK house for rent',
        location: 'waterloo'
    },
    {
        id: 4,
        imageUrl: 'https://scontent.fyzd1-2.fna.fbcdn.net/v/t39.30808-6/426363056_318321994502750_6901872494291580893_n.jpg?stp=dst-jpg_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=6b907e&_nc_ohc=frhweBZ7HPsAX-dDq9M&_nc_ht=scontent.fyzd1-2.fna&oh=00_AfDTVQ2J7WRc-Jy9qMjHFBCsN9QZKMEf9gYak8kuNddmxw&oe=65C99ECC',
        price: '$1800.00',
        description: '2 BHK house for rent',
        location: 'waterloo'
    },
    {
        id: 5,
        imageUrl: 'https://scontent.fyzd1-2.fna.fbcdn.net/v/t39.30808-6/426363056_318321994502750_6901872494291580893_n.jpg?stp=dst-jpg_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=6b907e&_nc_ohc=frhweBZ7HPsAX-dDq9M&_nc_ht=scontent.fyzd1-2.fna&oh=00_AfDTVQ2J7WRc-Jy9qMjHFBCsN9QZKMEf9gYak8kuNddmxw&oe=65C99ECC',
        price: '$1800.00',
        description: '2 BHK house for rent',
        location: 'waterloo'
    },
    {
        id: 6,
        imageUrl: 'https://scontent.fyzd1-2.fna.fbcdn.net/v/t39.30808-6/426363056_318321994502750_6901872494291580893_n.jpg?stp=dst-jpg_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=6b907e&_nc_ohc=frhweBZ7HPsAX-dDq9M&_nc_ht=scontent.fyzd1-2.fna&oh=00_AfDTVQ2J7WRc-Jy9qMjHFBCsN9QZKMEf9gYak8kuNddmxw&oe=65C99ECC',
        price: '$1800.00',
        description: '2 BHK house for rent',
        location: 'waterloo'
    },
    {
        id: 7,
        imageUrl: 'https://scontent.fyzd1-2.fna.fbcdn.net/v/t39.30808-6/426363056_318321994502750_6901872494291580893_n.jpg?stp=dst-jpg_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=6b907e&_nc_ohc=frhweBZ7HPsAX-dDq9M&_nc_ht=scontent.fyzd1-2.fna&oh=00_AfDTVQ2J7WRc-Jy9qMjHFBCsN9QZKMEf9gYak8kuNddmxw&oe=65C99ECC',
        price: '$1800.00',
        description: '2 BHK house for rent',
        location: 'waterloo'
    },
    {
        id: 8,
        imageUrl: 'https://scontent.fyzd1-2.fna.fbcdn.net/v/t39.30808-6/426363056_318321994502750_6901872494291580893_n.jpg?stp=dst-jpg_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=6b907e&_nc_ohc=frhweBZ7HPsAX-dDq9M&_nc_ht=scontent.fyzd1-2.fna&oh=00_AfDTVQ2J7WRc-Jy9qMjHFBCsN9QZKMEf9gYak8kuNddmxw&oe=65C99ECC',
        price: '$1800.00',
        description: '2 BHK house for rent',
        location: 'waterloo'
    },
];

const Product_Listing = () => {
    return (
        <div className="marketplace">
            <header className="Posting_section">
                <div className="Posting_section_div">
                    <h1>List your product and get it sold Today! with Barters Hub</h1>
                    <p>Your one-stop marketplace for seamless transactions</p>
                </div>
            </header>

            <div className="container">
                <section className="marketplace-header">
                    <button className="menu-button">Filters</button>
                    <select className="location-filter">
                        <option value="kitchener">Kitchener</option>
                    </select>
                </section>

                <section className="products">
                    {products.map(product => (
                        <Productcard key={product.id} product={product} />
                    ))}
                </section>
            </div>
        </div>
    );
}

export default Product_Listing;