import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5
};

const addIngredient = (state, action) => {
  const moreIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const moreIngredients = updateObject(state.ingredients, moreIngredient);
  const addedState = {
    ingredients: moreIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  };
  return updateObject(state, addedState);
};

const removeIngredient = (state, action) => {
  const lessIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const lessIngredients = updateObject(state.ingredients, lessIngredient);
  const subtractedState = {
    ingredients: lessIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
  };
  return updateObject(state, subtractedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false
  });
};

const fetchIngredientsFailed = state => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);
    default:
      return state;
  }
};

export default reducer;
