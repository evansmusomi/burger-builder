import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BUY_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionTypes.BUY_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.BUY_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.BUY_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
