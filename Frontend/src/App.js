// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'; // Главный CSS файл
import './colors.css'; // Импорт основных цветов
import './mobile.css'; // Импорт стилей для мобильнх
import Header from './components/Header';
import Main from './views/Main';
import Basket from './views/Basket';
import Footer from './components/Footer';
import ModalBox from './components/ModalBox';
import Login from './components/Login';
import Registration from './components/Registration';
import Upload from './components/Upload';
import ProfileModal from './components/ProfileModal';
import { handleChangePassword } from './components/changePassword';
import { handleChangeEmail } from './components/changeEmail';
import { CartProvider } from './components/CartContext';
import { RoleProvider } from './components/RoleContext';


function App() {
  const [page, setPage] = useState('Main');
  const [modalBox, setModalBox] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData.user);
    setModalBox(null);
  };

  const handleChangePasswordApp = async (newPassword) => {
    try {
      const response = await handleChangePassword(user.id, newPassword);
      console.log('Password changed successfully:', response);
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  const handleChangeEmailApp = async (newEmail) => {
    try {
      const response = await handleChangeEmail(user.id, newEmail);
      console.log('Email changed successfully:', response);
    } catch (error) {
      console.error('Error changing email:', error);
    }
  };

  const openProfileModal = () => {
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };
  
  const toggleNightMode = () => {
    setNightMode(!nightMode);
  };

  return (
    <CartProvider>
      <RoleProvider>
        <Router>
          <div className={nightMode ? 'night-mode' : 'App'}>
          <button className="button" onClick={toggleNightMode}>
            {nightMode ? 'Переключить дневной режим' : 'Переключить ночной режим'}
          </button>
            <Header
              setPage={setPage}
              setModalBox={setModalBox}
              isLoggedIn={isLoggedIn}
              user={user}
              openProfileModal={openProfileModal}
              offHandleLogout={handleLogout}
              onChangePassword={handleChangePasswordApp}
              onChangeEmail={handleChangeEmailApp}
            />
            {page === 'Main' && <Main />}
            {page === 'Basket' && <Basket />}
            {page === 'Upload' && <Upload />}
            {modalBox === 'Login' && (
              <ModalBox setModalBox={setModalBox}>
                <Login onLogin={handleLogin} />
              </ModalBox>
            )}
            {modalBox === 'Registration' && (
              <ModalBox setModalBox={setModalBox}>
                <Registration />
              </ModalBox>
            )}
            
            <Footer />
            {showProfileModal && (
              <ProfileModal
                user={user}
                onClose={closeProfileModal}
                onChangePassword={handleChangePasswordApp}
                onChangeEmail={handleChangeEmailApp}
              />
            )}
          </div>
        </Router>
      </RoleProvider>
    </CartProvider>
  );
};
export default App;
