import React from 'react';
import './Header.css';
import UserBox from './UserBox';
import Upload from './Upload';


function Header({setPage, setModalBox}) {
  return (
    <div className="Header">
        <ul>
            <li onClick={() => setPage('Main') }>Главная</li>
            <li onClick={() => setPage('Basket') }>Корзина</li>
            <li onClick={() => setPage('Upload') }>Загрузка</li>
        </ul> 
        <UserBox setModalBox={setModalBox} />

    </div>
  );
}

export default Header;
