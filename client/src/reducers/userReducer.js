import { FETCH_USER, AUTH, START_LOADING, LOGOUT } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, users: [] }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    case START_LOADING:
      return { ...state, isLoading: true };
    case FETCH_USER:
      return { ...state, user: action.payload.user};
    default:
      return state;
  }
};

