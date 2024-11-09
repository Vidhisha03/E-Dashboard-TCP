import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Use navigate for redirection

    const addProduct = async () => {
        setLoading(true);
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'POST',
            body: JSON.stringify({ name, price, category, description, brand }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        setLoading(false);

        if (result) {
            setSuccessMessage("Product added successfully!");
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            setError("Something went wrong, please try again.");
        }
    };

    return (
        <div className='product'>
            <h1>Add Product</h1>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
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
                onClick={addProduct}
                type='button'
                className="appButton"
                disabled={loading}
            >
                {loading ? 'Adding...' : 'Add Product'}
            </button>
        </div>
    );
};

export default AddProduct;
