export const initialState = {
  basket: [],
  user: null,
  deliveryAddress: null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      const existingItemIndex = state.basket.findIndex(
        (item) => item.id === action.item.id
      );
      const existingItem = state.basket[existingItemIndex];
      let updatedItems;
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + action.item.quantity,
        };
        updatedItems = [...state.basket];
        updatedItems[existingItemIndex] = updatedItem;
      } else updatedItems = state.basket.concat(action.item);
      return {
        ...state,
        basket: updatedItems,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const existingCartItemIndex = state.basket.findIndex(
        (item) => item.id === action.id
      );
      const existingCartItem = state.basket[existingCartItemIndex];
      let updatedCartItems;
      if (existingCartItem.quantity === 1) {
        updatedCartItems = state.basket.filter((item) => item.id !== action.id);
      } else {
        const updatedCartItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        updatedCartItems = [...state.basket];
        updatedCartItems[existingCartItemIndex] = updatedCartItem;
      }

      return {
        ...state,
        basket: updatedCartItems,
      };

    case "FILTER_FROM_BASKET":
      const updatedBasketItems = state.basket.filter(
        (item) => item.id !== action.id
      );

      return {
        ...state,
        basket: updatedBasketItems,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "SET_DELIVERY_ADDRESS":
      return {
        ...state,
        deliveryAddress: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
