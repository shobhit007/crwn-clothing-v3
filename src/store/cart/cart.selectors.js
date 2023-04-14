import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cartReducer;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector(
  [selectCartReducer],
  ({ cartItems }) =>
    cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartReducer],
  ({ cartItems }) =>
    cartItems.reduce((total, cartItem) => {
      const cartItemTotal =
        cartItem.quantity * cartItem.product.whitePrice.price;
      return total + cartItemTotal;
    }, 0)
);
