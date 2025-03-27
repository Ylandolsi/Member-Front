import { useRef, useState } from 'react';

import './styles.scss';

const DropdownMenuDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropTrigger = useRef<HTMLButtonElement>(null);
  const dropdownMenu = useRef<HTMLDivElement>(null);

  const updateDropdownPosition = () => {
    if (!dropTrigger.current || !dropdownMenu.current) return;
    const triggerRect = dropTrigger.current.getBoundingClientRect();
    const windowScrollTop = window.scrollY;

    console.log(triggerRect);
    console.log(windowScrollTop);

    dropdownMenu.current.style.top = `${triggerRect.bottom + windowScrollTop + 5}px`;
    dropdownMenu.current.style.left = `${triggerRect.left}px`;

    dropdownMenu.current.style.display = isOpen ? 'block' : 'none';
  };

  const toggleMenu = () => {
    setIsOpen((prevVal) => !prevVal);
    updateDropdownPosition();
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
        UserName
      </button>
      <div ref={dropdownMenu} className="dropdown-menu">
        <div className="dropdown-item">My Posts </div>
        <div className="dropdown-item">Create Post </div>
        <div className="dropdown-item">Login Or Log Out </div>
      </div>
    </div>
  );
};

export default DropdownMenuDemo;
