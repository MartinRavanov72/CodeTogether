import { AUTH, START_LOADING, LOGOUT, SAVE_CODE } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: false, currentUser: {}, loading: false, errors: undefined }, action) => {
  switch (action.type) {
    case AUTH:
      if (!action.error) {
        localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      }

      return { ...state, currentUser: action.data?.result, loading: false, errors: action.error };
    case LOGOUT:
      localStorage.clear();
      return { ...state, currentUser: {}, loading: false, errors: undefined };
    case START_LOADING:
      return { ...state, isLoading: true };
    case SAVE_CODE:
      return { ...state, currentUser: action.payload.user };
    default:
      return state;
  }
};

