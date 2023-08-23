import { API_URL } from '../config';

//selectors
export const getUser = (state) => state.users;

//Actions
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

//action creators
// export const logIn = (payload) => ({ type: LOG_IN, payload });

export const logIn = (payload) => (dispatch) => {
  const options = {
    method: 'GET',
    credentials: 'include',
  };

  fetch(`${API_URL}/api/users`, options)
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        dispatch({ type: LOG_IN, payload });
      }
    })
    .catch((error) => {
      console.log('User is not logged in', error);
    });
};

export const logOut = () => ({ type: LOG_OUT });

const usersReducer = (statePart = null, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return null;
    default:
      return statePart;
  }
};

export default usersReducer;
