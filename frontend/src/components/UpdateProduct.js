import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setDescription(result.description);
        setBrand(result.brand);
    }

    const updateProduct = async () => {
        setLoading(true);
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category, description, brand }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        setLoading(false);
        if (result) {
            setSuccess("Product updated successfully!");
            navigate('/');
        } else {
            setError("Something went wrong, please try again.");
        }
    }

    return (
        <div className='product'>
            <h1>Update Product</h1>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <input 
                className="inputBox" 
                type="text" 
                placeholder="Enter Product Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                className="inputBox" 
                type="number" 
                placeholder="Enter Product Price" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
            />
            <input 
                className="inputBox" 
                type="text" 
                placeholder="Enter Product Category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
            />
            <input 
                className="inputBox"
                type="text" 
                placeholder="Enter Product Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
            />
            <input 
                className="inputBox" 
                type="text" 
                placeholder="Enter Product Brand" 
                value={brand} 
                onChange={(e) => setBrand(e.target.value)} 
            />
            <button 
                onClick={updateProduct} 
                type='button' 
                className="appButton"
                disabled={loading}
            >
                {loading ? 'Updating...' : 'Update Product'}
            </button>
        </div>
    );
};

export default UpdateProduct;
