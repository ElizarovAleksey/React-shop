import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import { CartContext } from './CartContext';
import { useRole } from './RoleContext';

function Header({ setPage, setModalBox, isLoggedIn, user, openProfileModal, offHandleLogout }) {
  const { cartItemCount } = useContext(CartContext);
 const [count, setCount] = useState(cartItemCount);
  const { userRole, logout } = useRole();

  useEffect(() => {
    setCount(cartItemCount);
      if (!isLoggedIn) {
      logout();
    } 
  }, [cartItemCount, isLoggedIn, logout]);

  const handleProfileClick = () => {
    openProfileModal();
  };

  const handleLogout = () => {
    offHandleLogout();
  };

  return (
    <div className="Header">
      <ul>
        <li onClick={() => setPage('Main')}>Главная</li>
        {userRole === 'admin' && (
          <>
            <li onClick={() => setPage('Basket')}>Корзина ({cartItemCount})</li>
            <li onClick={() => setPage('Upload')}>Загрузка</li>
          </>
        )}
        {userRole === 'user' && (
          <li onClick={() => setPage('Basket')}>Корзина ({cartItemCount})</li>
        )}
        {isLoggedIn ? (
          <>
            <li onClick={openProfileModal}>Профиль</li>
            <li onClick={offHandleLogout}>Выход</li> {/* Показываем кнопку "Выход" для авторизованных пользователей */}
          </>
        ) : (
          <>
            <li onClick={() => setModalBox('Login')}>Вход</li>
            <li onClick={() => setModalBox('Registration')}>Регистрация</li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;