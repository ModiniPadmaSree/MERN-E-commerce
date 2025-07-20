import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css'; // ✅ This line is required!

const Header = () => {
  const navigate = useNavigate();
   const [keyword, setKeyword] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    setUserInfo(null);
    setDropdownOpen(false);
    navigate('/login');
    window.location.reload();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
    const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };


  return (
    
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <Link to="/" className={styles['header-logo']}>
          NexMart
        </Link>
        <form onSubmit={searchHandler}>
      <input
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
    
        <nav className={styles['header-nav']}>
          <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
            <li>
             <a href="#contact" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
    Contact Us
  </a>
            </li>
             <li>
              <Link to="/cart">Cart</Link>
            </li>
            {userInfo ? (
              <li className={`${styles['header-dropdown']} ${dropdownOpen ? styles.open : ''}`}>
                <button onClick={toggleDropdown} className={styles['header-dropdown-toggle']}>
                  {userInfo.name}
                  <span style={{ marginLeft: '5px' }}>▼</span>
                </button>
                <div className={styles['header-dropdown-menu']}>
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
                  <Link to="/orders/me" onClick={() => setDropdownOpen(false)}>Orders</Link>
                  <button onClick={logoutHandler}>Logout</button>
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
