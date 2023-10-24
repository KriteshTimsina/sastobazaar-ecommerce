import React from 'react'
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
const Wishlist = () => {
    const [wishlist, setwishlist] = React.useState(JSON.parse(localStorage?.getItem("wishlist")) || []);
    function handleRemoval(id) {
        const updatedWishlist = wishlist.filter((item) => item.id !== id);
        setwishlist(updatedWishlist);
    }
    return (<>
        <div className="flex justify-around dark:text-darktext dark:bg-darkbg">
            <div className="min-h-screen pt-navtop md:flex md:flex-row md:justify-around md:items-start">
                <div className="flex flex-col items-center justify-center mx-2 md:items-start">
                    <h1 className="text-3xl font-semibold w-full text-center">Your Wishlist</h1><br />
                    <div className="flex items-center justify-between w-full mb-1">
                        {wishlist.length === 0 ? (<h2>Your Wishlist is empty.<br></br> Add Items from <Link to='/product' className='text-blue-500 hover:text-blue-700'>products</Link> page</h2>) :
                            <Card products={wishlist} onRemoveWishlist={handleRemoval} />}
                        {/* {products} */}
                        {/* < Card products={products} /> */}
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Wishlist