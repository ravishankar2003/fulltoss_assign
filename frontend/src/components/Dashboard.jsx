import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Settings from './Settings';
import ProductCard from './ProductCard';
import Cart from './Cart';

const Dashboard = () => {
  const [currentuser, setCurrentUser] = useState(null);
  const [sett, isSett] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const bg = {
    RCB: 'https://cdn.shopify.com/s/files/1/0278/4565/6649/files/WhatsApp_Image_2023-09-29_at_02.44.40.webp?v=1695936868',
    MI: 'https://static.cricketaddictor.com/images/2024/MumbaIindis101-1.webp?q=80&width=1024&height=538',
    CSK: 'https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2024-03/Chennai%20Super%20Kings%20IPL%202024%20032524%2016x9.jpg?h=141926d6&itok=jypnbWUA',
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('fulltossaccesstoken');
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/auth/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          navigate('/login');
        } else {
          setCurrentUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('fulltossaccesstoken');
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/user/getproducts`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        });
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('fulltossaccesstoken');
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/user/getcart`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        });
        const data = await res.json();
        setCart(data.products);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCurrentUser();
    fetchProducts();
    fetchCart();
  }, [navigate]);

  const handleAddToCart = async (productId) => {
    try {
      const product = products.find((p) => p.id === productId);
      const token = localStorage.getItem('fulltossaccesstoken');
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/user/addtocart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(product),
      });
      const data = await res.json();
      setCart(data.products);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const product = cart.find((p) => p.id === productId);
      const token = localStorage.getItem('fulltossaccesstoken');
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/user/deletefromcart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(product),
      });
      const data = await res.json();
      setCart(data.products);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!currentuser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <Navbar
        setCurrentUser={setCurrentUser}
        currentuser={currentuser}
        isSett={isSett}
        sett={sett}
        setShowCart={setShowCart}
        showCart={showCart}
      />
      {showCart && !sett ? (
        <Cart
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      ) : sett ? (
        <Settings
          setCurrentUser={setCurrentUser}
          currentuser={currentuser}
          isSett={isSett}
        />
      ) : (
        <div className="flex h-screen flex-col items-center ">
          <div
            className="flex justify-center items-center h-3/5 rounded-3xl mt-2 text-white text-3xl font-bold w-4/5"
            style={{
              backgroundImage: `url(${bg[currentuser.ipl || 'RCB']})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            Welcome to {currentuser.ipl || 'RCB'} Fan Store!
          </div>
          <div className="grid grid-cols-3 gap-6 p-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                inCart={(cart.find((p) => p.id === product.id) && true) || false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
