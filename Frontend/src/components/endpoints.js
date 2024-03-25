//endpoint.js
//const backendBaseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:9001';
//const backendBaseUrl = `${process.env.REACT_APP_BACKEND_URL}`;
//const apiUrl = `${backendBaseUrl}/api`;
const apiUrl = '/api';
console.log(process.env.REACT_APP_BACKEND_URL)

export const loginUrl = `${apiUrl}/login`;
export const reginUrl = `${apiUrl}/registration`;
export const productUrl = `${apiUrl}`; //карточки товаров
export const ordersUrl = `${apiUrl}/orders`;
export const changePasswordUrl = `${apiUrl}/change-password`;
export const changeEmailUrl = `${apiUrl}/change-email`; 
