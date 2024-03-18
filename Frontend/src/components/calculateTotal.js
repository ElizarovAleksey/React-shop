
export function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price, 0);
  }