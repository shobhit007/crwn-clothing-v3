import { CART_ACTION_TYPES } from "./cart.types";

// add cart items
export const addItem = (cartItems, productToAdd) => {
  const product = cartItems.find(
    (cartItem) => cartItem.product.code === productToAdd.code
  );

  if (!product) {
    return [...cartItems, { product: productToAdd, quantity: 1 }];
  }

  const updatedCartItems = cartItems.map((cartItem) =>
    cartItem.product.code === productToAdd.code
      ? { product: productToAdd, quantity: cartItem.quantity + 1 }
      : cartItem
  );

  return updatedCartItems;
};

//remove item from cart
const removeItem = (cartItems, productToRemove) => {
  const product = cartItems.find(
    (cartItem) => cartItem.product.code === productToRemove.code
  );

  if (product.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.product.code !== productToRemove.code
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.product.code === productToRemove.code
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const addItemToCart = (cartItems, product) => {
  const newCartItems = addItem(cartItems, product);

  return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems };
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeItem(cartItems, productToRemove);

  return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems };
};

export const clearItemFromCart = (cartItems, productToClear) => {
  const updatedCartItems = cartItems.filter(
    (cartItem) => cartItem.product.code !== productToClear.code
  );

  return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: updatedCartItems };
};

export const setIsCartOpen = () => ({ type: CART_ACTION_TYPES.IS_CART_OPEN });
