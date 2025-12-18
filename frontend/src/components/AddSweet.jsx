import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddSweet = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/sweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, category, price: Number(price), quantity: Number(quantity) }),
      });

      if (response.ok) {
        setMessage('Sweet added successfully!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        const data = await response.json();
        setMessage(data.message || 'Failed');
      }
    } catch (err) {
      setMessage('Error adding sweet');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Sweet (Admin)</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Sweet Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Category (e.g., Gulab Jamun)" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input type="number" placeholder="Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        {message && <p className={message.includes('success') ? 'success' : 'error'}>{message}</p>}
        <button type="submit">Add Sweet</button>
      </form>
    </div>
  );
};

export default AddSweet;