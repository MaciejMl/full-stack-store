import { API_URL } from '../config';

//selectors
export const getProd = (state) => state.products;
export const getProdById = ({ products }, prodId) => {
  return products.find((product) => product.id === prodId);
};

//Actions
const createActionName = (actionName) => `app/products/${actionName}`;
const UPDATE_PROD = createActionName('UPDATE_PROD');
const REMOVE_PROD = createActionName('REMOVE_PROD');
const ADD_PROD = createActionName('ADD_PROD');
// const SEARCH_AD = createActionName('SEARCH_AD');
const EDIT_PROD = createActionName('EDIT_PROD');

//action creators
export const updateProd = (payload) => ({ type: UPDATE_PROD, payload });
export const removeProd = (payload) => ({ type: REMOVE_PROD, payload });
export const addProd = (payload) => ({ type: ADD_PROD, payload });
// export const searchAdd = (payload) => ({ type: SEARCH_AD, payload });
export const editProd = (payload) => ({ type: EDIT_PROD, payload });

export const fetchProd = () => {
  return (dispatch) => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((prod) => {
        dispatch(updateProd(prod));
      });
  };
};

export const removeAdRequest = (prodId) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
    };

    return fetch(`${API_URL}/api/products/${prodId}`, options)
      .then(() => {
        dispatch(removeProd(prodId));
      })
      .catch((error) => {
        console.error('Error removing product:', error);
      });
  };
};

const productsReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_PROD:
      return [...action.payload];
    case REMOVE_PROD:
      return statePart.filter((prod) => prod.id !== action.prodId);
    case ADD_PROD:
      return [...statePart, action.payload];
    // case SEARCH_AD:
    //   return [...action.payload];
    case EDIT_PROD:
      return statePart.map((prod) =>
        prod.id === action.payload.id ? action.payload : prod,
      );
    default:
      return statePart;
  }
};

export default productsReducer;
