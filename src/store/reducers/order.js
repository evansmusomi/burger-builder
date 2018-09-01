import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const buyInit = state => {
  return updateObject(state, { purchased: false });
};

const buyBurgerStart = state => {
  return updateObject(state, { loading: true });
};

const buyBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const buyBurgerFail = state => {
  return updateObject(state, { loading: false });
};

const fetchOrdersStart = state => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    orders: action.orders
  });
};

const fetchOrdersFail = state => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BUY_INIT:
      return buyInit(state);
    case actionTypes.BUY_BURGER_START:
      return buyBurgerStart(state);
    case actionTypes.BUY_BURGER_SUCCESS:
      return buyBurgerSuccess(state, action);
    case actionTypes.BUY_BURGER_FAIL:
      return buyBurgerFail(state);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state);
    default:
      return state;
  }
};

export default reducer;
