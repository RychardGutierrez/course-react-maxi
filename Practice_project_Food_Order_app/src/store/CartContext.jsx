import { createContext, useReducer } from 'react';
const initialState = {
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
};
const CartContext = createContext(initialState);

function cardReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingCartItem = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingCartItem > -1) {
      const existingItem = state.items[existingCartItem];
      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItem] = updateItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    if (existingCartItem.quantity === 1) {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    }

    const updatedItems = {
      ...existingCartItem,
      quantity: existingCartItem.quantity - 1,
    };
    return {
      ...state,
      items: [
        ...state.items.filter((item) => item.id !== action.id),
        updatedItems,
      ],
    };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }
}

export function CartContextProvier({ children }) {
  const [cart, dispatchCartAction] = useReducer(cardReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  }

  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
