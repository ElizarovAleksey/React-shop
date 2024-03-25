import { ordersUrl } from './endpoints';
export async function placeOrder(orderData) {
    console.log('Отправление данных  на сервер ', orderData);
  try {

    const response = await fetch(`${ordersUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to place order');
    }

    return true;
  } catch (error) {
    console.error('Error placing order:', error);
    throw new Error('Ошибка при оформлении заказа. Попробуйте еще раз.');
  }
}