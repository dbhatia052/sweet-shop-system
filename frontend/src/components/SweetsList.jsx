import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SweetsList = () => {
  const [sweets, setSweets] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(payload.role === 'ADMIN');
      } catch (e) { /* ignore */ }
    }

    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/sweets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setSweets(data);
    } catch (err) {
      setMessage('Please login again');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/sweets/${id}/purchase`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setMessage('🍬 Purchased successfully!');
        fetchSweets();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      setMessage('Out of stock or error');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <p className="text-center" style={{fontSize: '24px'}}>Loading sweets...</p>;

  return (
    <div>
      <div style={{textAlign: 'center', marginBottom: '30px'}}>
        <h1 style={{fontSize: '36px', color: '#4CAF50'}}>🍭 Our Delicious Sweets</h1>
        {isAdmin && <Link to="/add-sweet"><button className="add-button">+ Add New Sweet</button></Link>}
        {message && <p className="success" style={{fontSize: '20px'}}>{message}</p>}
      </div>

      <div className="sweets-grid">
        {sweets.map((sweet) => (
          <div key={sweet.id} className="sweet-card">
            <h3>{sweet.name}</h3>
            <p><strong>Category:</strong> {sweet.category}</p>
            <p><strong>Price:</strong> ₹{sweet.price}</p>
            <p><strong>Available:</strong> {sweet.quantity > 0 ? sweet.quantity : 'Out of Stock'}</p>
            <button
              className="buy-button"
              onClick={() => handlePurchase(sweet.id)}
              disabled={sweet.quantity === 0}
            >
              {sweet.quantity === 0 ? 'Sold Out' : 'Buy Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SweetsList;