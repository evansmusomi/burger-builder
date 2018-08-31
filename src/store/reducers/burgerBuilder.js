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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const moreIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      };
      const moreIngredients = updateObject(state.ingredients, moreIngredient);
      const addedState = {
        ingredients: moreIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
      return updateObject(state, addedState);
    case actionTypes.REMOVE_INGREDIENT:
      const lessIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      };
      const lessIngredients = updateObject(state.ingredients, lessIngredient);
      const subtractedState = {
        ingredients: lessIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
      return updateObject(state, subtractedState);
    case actionTypes.SET_INGREDIENTS:
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
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
