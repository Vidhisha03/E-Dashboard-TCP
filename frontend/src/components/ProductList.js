import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch("http://localhost:5000/products", {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
    
            const result = await response.json();
            setProducts(result);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };
    
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/product/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
    
            if (response.ok) {
                getProducts();
            } else {
                setError("Failed to delete the product");
            }
        } catch (err) {
            setError('Failed to delete the product');
        }
    };
    
    const searchHandle = async (event) => {
        const key = event.target.value;
        setSearchQuery(key);
        setError(''); 
    
        if (key) {
            try {
                const response = await fetch(`http://localhost:5000/search/${key}`, {
                    headers: {
                        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                });
                const result = await response.json();
                setProducts(result.length ? result : []);
            } catch (err) {
                setError('Failed to fetch search results');
            }
        } else {
            getProducts(); 
        }
    };
    

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input
                className='search-product-box'
                type="text"
                placeholder='Search Product'
                value={searchQuery}
                onChange={searchHandle}
            />
            {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <>
                    <ul className="product-header">
                        <li>S.No</li>
                        <li>Name</li>
                        <li>Price</li>
                        <li>Category</li>
                        <li>Description</li>
                        <li>Brand</li>
                        <li>Operation</li>
                    </ul>
                    {products.length > 0 ? (
                        products.map((item, index) => (
                            <ul key={item._id} className="product-item">
                                <li>{index + 1}</li>
                                <li>{item.name}</li>
                                <li>{item.price}</li>
                                <li>{item.category}</li>
                                <li>{item.description}</li>
                                <li>{item.brand}</li>
                                <li>
                                    <button onClick={() => deleteProduct(item._id)}>Delete</button>
                                    <button>
                                        <Link to={`/update/${item._id}`} style={{ textDecoration: 'none', color: 'white' }}>Update</Link>
                                    </button>
                                </li>
                            </ul>
                        ))
                    ) : (
                        <h3>No Result Found</h3>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductList;

