import { use, useRef, useState } from 'react';

import './styles.scss';
import { useAuth } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropTrigger = useRef<HTMLButtonElement>(null);
  const dropdownMenu = useRef<HTMLDivElement | null>(null);

  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  console.log(user);
  console.log('islogged', isLoggedIn);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
    setIsOpen(false);
  };

  const updateDropdownPosition = () => {
    if (!dropTrigger.current || !dropdownMenu.current) return;
    const triggerRect = dropTrigger.current.getBoundingClientRect();
    const windowScrollTop = window.scrollY;

    console.log(triggerRect.bottom);
    console.log(windowScrollTop);

    dropdownMenu.current.style.top = `${triggerRect.bottom + 5}px`;
    dropdownMenu.current.style.left = `${triggerRect.left}px`;
  };

  const toggleMenu = () => {
    setIsOpen((prevVal) => !prevVal);
    updateDropdownPosition();
    if (dropdownMenu.current) {
      dropdownMenu.current.style.display = isOpen ? 'block' : 'none';
    }
  };

  window.addEventListener('resize', () => {
    if (isOpen) {
      updateDropdownPosition();
    }
  });

  window.addEventListener('scroll', () => {
    if (isOpen) {
      updateDropdownPosition();
    }
  });

  return (
    <div className="dropdown">
      <button
        ref={dropTrigger}
        className="dropdown-trigger"
        onClick={toggleMenu}
      >
        {isLoggedIn ? user || 'User' : 'Guest'}
      </button>
      <div ref={dropdownMenu} className="dropdown-menu">
        {isLoggedIn ? (
          <>
            <div className="dropdown-item" onClick={() => navigate('/myposts')}>
              My Posts
            </div>
            <div
              className="dropdown-item"
              onClick={() => navigate('/create-post')}
            >
              Create Post
            </div>
          </>
        ) : null}
        <div className="dropdown-item" onClick={handleLoginLogout}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
